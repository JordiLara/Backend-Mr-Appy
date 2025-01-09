import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Team from "./teamModel.js";
import User from "./userModel.js";

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
    team_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Team,
        key: "id_team",
      },
    },
    emoji: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

Team.hasMany(Review, { foreignKey: "team_id" });
Review.belongsTo(Team, { foreignKey: "team_id" });

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

export default Review;
