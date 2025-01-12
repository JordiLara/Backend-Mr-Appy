import Review from "../models/reviewModel.js";

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
