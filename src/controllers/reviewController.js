import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

export const createReview = async (req, res) => {
  try {
    // @To_Do añadir validación de datos

    const { mood, content, isAnonymous } = req.body;

    const newReview = new Review({
      id_user: req.user.id_user,
      id_team: req.user.id_team,
      mood,
      content,
      is_anonymous: isAnonymous,
    });

    let createdReview = await newReview.save();

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Review creada correctamente",
      review: createdReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al crear la review",
      error: error,
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: {
        id_user: req.user.id_user,
      },
      order: [["created_at", "DESC"]],
    });

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Lista de reviews",
      reviews: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the reviews",
    });
  }
};

export const getTeamReviews = async (req, res) => {
  try {
    const id_team = req.user.id_team;

    if (!id_team) {
      return res.status(400).json({
        code: -1,
        message: "No se encontró un equipo asociado al gerente",
      });
    }

    const reviews = await Review.findAll({
      where: { id_team },
      include: [
        {
          model: User,
          attributes: ["name", "surname"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    res.status(200).json({
      code: 1,
      message: "Reseñas del equipo obtenidas correctamente",
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al obtener las reseñas del equipo",
      error,
    });
  }
};
