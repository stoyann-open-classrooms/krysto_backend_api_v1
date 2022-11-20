const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add description"],
      maxlength: [1000, "Name can not be more than 500 characters"],
    },
    price: Number,
    weight_GR: Number,
    stock: Number,
    colors: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Mother Earth",
        "Sky blue",
        "Purple Nebula",
        "Dark matter",
        "Solar Flare",
        "Galaxy Zero",
        "Jupiter Storm",
      ],
    },
    category: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Construction",
        "Mode",
        "décoration interieur",
        "Objet du quotidient",
        "Autres",
      ],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// create Partner slug from the name
ArticleSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Article", ArticleSchema);
