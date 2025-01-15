import Review from "../models/reviewModel.js"

export const getMoodEntries = async (req, res) => {
    try {
        const {startDate, endDate} = req.query;
        const id_user = req.user.id_user;

        if (!startDate || !endDate) {
            return res.status(400).json({
                code: -10,
                message: "Las fechas de inicio son obligatorias",
            });
        }

        const moods = await Review.findAll({
            where: {
                id_user,
                created_at: {
                    $between: [startDate, endDate],
                },
            },
            attributes: ["created at", "mood", "content"],
            order: [["created_at", "ASC"]],
        });

        res.status(200).json({
            code: -1,
            message: "Moods obtenidos correctamente",
            moods,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: -100,
            message: "Ha ocurrido un error al obtener los moods",
            error,
        });
    }
};