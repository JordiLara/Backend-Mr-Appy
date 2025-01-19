import Review from "../models/reviewModel.js";
import { Op } from "sequelize";

export const getUserStats = async (req, res) => {
  try {
    const id_user = req.user.id_user;

    // 1. Estado de ánimo promedio
    const avgMoodResult = await Review.findAll({
      where: { id_user },
      attributes: [
        [
          Review.sequelize.fn("AVG", Review.sequelize.col("mood")),
          "averageMood",
        ],
      ],
    });
    const averageMood = parseFloat(avgMoodResult[0].get("averageMood")) || 0;

    // 2. Racha actual de días buenos (mood >= 4)
    const reviews = await Review.findAll({
      where: { id_user },
      attributes: ["created_at", "mood"],
      order: [["created_at", "DESC"]],
    });

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const review of reviews) {
      const reviewDate = new Date(review.created_at);
      reviewDate.setHours(0, 0, 0, 0);

      if (review.mood >= 4 && today.getTime() === reviewDate.getTime()) {
        currentStreak++;
        today.setDate(today.getDate() - 1);
      } else {
        break; // Fin de la racha
      }
    }

    // 3. Distribución de estados de ánimo
    const moodDistributionResult = await Review.findAll({
      where: { id_user },
      attributes: ["mood", [Review.sequelize.fn("COUNT", "*"), "count"]],
      group: ["mood"],
    });

    const totalReviews = reviews.length;
    const moodDistribution = moodDistributionResult.reduce((acc, moodData) => {
      const mood = moodData.mood;
      const count = parseInt(moodData.get("count"), 10);
      acc[mood] = ((count / totalReviews) * 100).toFixed(2);
      return acc;
    }, {});

    // 4. Entradas de ánimo mensuales
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlyEntries = await Review.count({
      where: {
        id_user,
        created_at: {
          [Op.gte]: startOfMonth,
        },
      },
    });

    res.status(200).json({
      averageMood,
      currentStreak,
      moodDistribution,
      monthlyEntries,
    });
  } catch (error) {
    console.error("Error al obtener las estadísticas del usuario:", error);
    res.status(500).json({
      message: "Error al obtener las estadísticas del usuario",
      error,
    });
  }
};
