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
    mood_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Moods",
        key: "id",
      },
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

Team.hasMany(Review, { foreignKey: "team_id" });
Review.belongsTo(Team, { foreignKey: "team_id" });

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

// Tabla para los likes
const ReviewLike = sequelize.define(
  "ReviewLike",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    review_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Review,
        key: "id",
      },
    },
    user_id: {
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
Review.belongsToMany(User, {
  through: ReviewLike,
  foreignKey: "review_id",
  otherKey: "user_id",
  as: "likedBy",
});

User.belongsToMany(Review, {
  through: ReviewLike,
  foreignKey: "user_id",
  otherKey: "review_id",
  as: "likedReviews",
});

export default Review;
