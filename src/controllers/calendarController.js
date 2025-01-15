import Review from "../models/reviewModel.js";

export const getReviewEntries = async (req, res) => {
  try {
    const id_user = req.user.id_user;

    const reviews = await Review.findAll({
      where: { id_user },
      attributes: ["created_at", "mood", "content"],
      order: [["created_at", "ASC"]],
    });

    // Transformar los datos para el calendario
    const calendarData = reviews.map((review) => ({
      date: review.created_at,
      moodColor: getColorForMood(review.mood),
      content: review.content,
      mood: review.mood,
    }));

    res.status(200).json({
      code: 1,
      message: "Datos del calendario obtenidos correctamente",
      calendarData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al obtener los datos del calendario",
      error,
    });
  }
};

// Función para determinar el color según el estado de ánimo
const getColorForMood = (mood) => {
  const moodColors = {
    5: "bg-emerald-500",
    4: "bg-green-500",
    3: "bg-yellow-500",
    2: "bg-orange-500",
    1: "bg-red-500",
  };
  return moodColors[mood] || "bg-gray-500";
};
