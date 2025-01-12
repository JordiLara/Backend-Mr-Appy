import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Team from "./teamModel.js";
import User from "./userModel.js";

const Review = sequelize.define(
  "Review",
  {
    id_review: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
    id_team: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Team,
        key: "id_team",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_anonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mood: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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

Team.hasMany(Review, { foreignKey: "id_team" });
Review.belongsTo(Team, { foreignKey: "id_team" });

User.hasMany(Review, { foreignKey: "id_user" });
Review.belongsTo(User, { foreignKey: "id_user" });

export default Review;
