import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const Team = sequelize.define(
  "Team",
  {
    id_team: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user_manager: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    team_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Activar createdAt y updatedAt
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

export default Team;
