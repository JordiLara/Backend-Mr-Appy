import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Team from "./teamModel.js";

const TeamMember = sequelize.define(
  "TeamMember",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    team_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Team,
        key: "id_team",
      },
    },
    role: {
      type: DataTypes.ENUM("manager", "member"),
      allowNull: false,
    },
    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

Team.hasMany(TeamMember, { foreignKey: "team_id" });
TeamMember.belongsTo(Team, { foreignKey: "team_id" });

export default TeamMember;
