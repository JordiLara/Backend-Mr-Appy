import User from "../models/userModel.js";
import fs from "fs";
//https://www.bezkoder.com/node-js-express-file-upload/

export const getTeam = async (req, res) => {
  try {
    const team_data = {
      id_team: req.team.id_team,
      id_user_manager: req.team.id_manager,
      company_name: req.team.company_name,
      team_name: req.team.team_name,
      created_at: req.user.created_at,
      updated_at: req.user.updated_at,
    };

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Team Detail",
      team: team_data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "An error occurred while obtaining the USER",
    });
  }
};

