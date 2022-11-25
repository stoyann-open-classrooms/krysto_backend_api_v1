const mongoose = require("mongoose");
const slugify = require("slugify");

const Recyclable_productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    plastic_type: {
        type: mongoose.Schema.ObjectId,
        ref: 'Plastic_type',
        required: true
    },
    own: {
      type: Boolean,
      default: false,
    },
    compagny: {
      type: Boolean,
      default: false,
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add description"],
      maxlength: [1000, "Name can not be more than 500 characters"],
    },
    recyclingNote: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    partner: {
      type: mongoose.Schema.ObjectId,
      ref: "Partner",
    },

  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// create Partner slug from the name
Recyclable_productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Recyclable_product", Recyclable_productSchema);
