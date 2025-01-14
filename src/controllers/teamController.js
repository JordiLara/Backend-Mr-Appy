import Team from "../models/teamModel.js";
import User from "../models/userModel.js";

export const getTeam = async (req, res) => {
  try {
    const { id_team } = req.params;
    let team = null;
    if (id_team) {
      team = await Team.findByPk(id_team);
    } else {
      team = await Team.findByPk(req.user.id_team);
    }
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

export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await User.findAll({
      where: {
        id_team: req.user.id_team,
      },
      order: [["name", "ASC"]],
    });
    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Team Members",
      users: teamMembers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the USER",
    });
  }
};
