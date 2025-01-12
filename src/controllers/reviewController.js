import Review from "../models/reviewModel.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = Review.findAll({
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
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mood, content, isAnonymous } = req.body;

    const newReview = new Review({
      id_user: req.user.id_user,
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
