const express = require("express");
const router = express.Router();
const {
  Review,
  Mood,
  User,
  Team,
  ReviewLike,
  sequelize,
} = require("../models");
const auth = require("../middleware/auth");
const { Op } = require("sequelize");

// Get team reviews
router.get("/team/:teamId", auth, async (req, res) => {
  try {
    const { teamId } = req.params;
    const { mood, startDate, endDate, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Verifify team
    const team = await Team.findOne({
      where: {
        id_team: teamId,
        [Op.or]: [
          { manager_id: req.user.id_user },
          { "$TeamMembers.user_id$": req.user.id_user },
        ],
      },
      include: ["TeamMembers"],
    });

    if (!team) {
      return res
        .status(403)
        .json({ message: "No tienes acceso a este equipo" });
    }

    // generates query
    const where = { team_id: teamId };
    if (mood) where.mood_type = mood;
    if (startDate && endDate) {
      where.created_at = {
        [Op.between]: [startDate, endDate],
      };
    }

    // get reviews with author info and likes count
    const { rows: reviews, count } = await Review.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["name", "surname"],
          required: false,
        },
        {
          model: User,
          as: "likedBy",
          attributes: ["id_user"],
          through: { attributes: [] },
        },
      ],
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset,
      distinct: true,
    });

    // process reviews to answer format
    const processedReviews = reviews.map((review) => ({
      id: review.id,
      mood_id: review.mood_id,
      content: review.content,
      is_anonymous: review.is_anonymous,
      mood_type: review.mood_type,
      created_at: review.created_at,
      likes_count: review.likedBy.length,
      is_flagged: review.is_flagged,
      author: review.is_anonymous
        ? null
        : {
            name: review.author?.name,
            surname: review.author?.surname,
          },
      liked_by_current_user: review.likedBy.some(
        (user) => user.id_user === req.user.id_user
      ),
    }));

    res.json({
      reviews: processedReviews,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ message: "Error al obtener reviews" });
  }
});

// Create review
router.post("/", auth, async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { mood_id, content, is_anonymous, mood_type } = req.body;

    const mood = await Mood.findByPk(mood_id, { transaction: t });
    if (!mood) {
      await t.rollback();
      return res.status(404).json({ message: "Mood no encontrado" });
    }

    const review = await Review.create(
      {
        mood_id,
        content,
        is_anonymous,
        mood_type,
        user_id: req.user.id_user,
        team_id: mood.team_id,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      id: review.id,
      mood_id: review.mood_id,
      content: review.content,
      is_anonymous: review.is_anonymous,
      mood_type: review.mood_type,
      created_at: review.created_at,
      likes_count: 0,
      is_flagged: false,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error al crear review" });
  }
});

// Like/Unlike review
router.post("/:reviewId/like", auth, async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const review = await Review.findByPk(req.params.reviewId, {
      include: [
        {
          model: User,
          as: "likedBy",
          attributes: ["id_user"],
          through: { attributes: [] },
        },
      ],
      transaction: t,
    });

    if (!review) {
      await t.rollback();
      return res.status(404).json({ message: "Review no encontrada" });
    }

    const hasLiked = review.likedBy.some(
      (user) => user.id_user === req.user.id_user
    );

    if (hasLiked) {
      await ReviewLike.destroy({
        where: {
          review_id: review.id,
          user_id: req.user.id_user,
        },
        transaction: t,
      });
    } else {
      await ReviewLike.create(
        {
          review_id: review.id,
          user_id: req.user.id_user,
        },
        { transaction: t }
      );
    }

    await t.commit();

    // get number of total likes
    const likesCount = await ReviewLike.count({
      where: { review_id: review.id },
    });

    res.json({
      id: review.id,
      likes_count: likesCount,
      liked_by_current_user: !hasLiked,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error liking review:", error);
    res.status(500).json({ message: "Error al dar like" });
  }
});

// Flag review
router.post("/:reviewId/flag", auth, async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const review = await Review.findByPk(req.params.reviewId, {
      transaction: t,
    });
    if (!review) {
      await t.rollback();
      return res.status(404).json({ message: "Review no encontrada" });
    }

    await review.update({ is_flagged: true }, { transaction: t });
    await t.commit();

    res.json({
      id: review.id,
      is_flagged: true,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error flagging review:", error);
    res.status(500).json({ message: "Error al marcar review" });
  }
});

module.exports = router;
