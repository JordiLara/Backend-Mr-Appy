import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Team from "./teamModel.js";
import User from "./userModel.js";

const Mood = sequelize.define(
  "Mood",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    id_mood: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Moods",
        key: "id",
      },
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
    mood_type: {
      type: DataTypes.ENUM("amazing", "good", "neutral", "down", "rough"),
      allowNull: false,
    },
    likes_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    is_flagged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

Team.hasMany(Mood, { foreignKey: "id_team" });
Mood.belongsTo(Team, { foreignKey: "id_team" });

User.hasMany(Mood, { foreignKey: "id_user" });
Mood.belongsTo(User, { foreignKey: "id_user" });

// Tabla para los likes
const ReviewLike = sequelize.define(
  "ReviewLike",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    id_review: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Review,
        key: "id",
      },
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
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

// Relación muchos a muchos para los likes
Mood.belongsToMany(User, {
  through: ReviewLike,
  foreignKey: "id_review",
  otherKey: "id_user",
  as: "likedBy",
});

User.belongsToMany(Mood, {
  through: ReviewLike,
  foreignKey: "id_user",
  otherKey: "id_review",
  as: "likedReviews",
});

export default Mood;
