import Team from "../models/teamModel.js";

export const getTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.user.id_team);
    if (!team) {
      return res.status(401).json({
        code: -70,
        message: "Equipo no válido",
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Team Detail",
      team: team,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the USER",
    });
  }
};

