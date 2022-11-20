const mongoose = require("mongoose");


const CollectSchema = new mongoose.Schema(
  {
    remarque: {
      type: String,
      required: [true, "Please add description"],
      maxlength: [1000, "Name can not be more than 1000 characters"],
    },

    weight_KG: Number,
    colors: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Bleu foncé",
        "Bleu clair",
        "Blanc",
        "Transparant",
        "Violet",
        "Vert",
        "Jaune",
        "Noir",
        "orange",
        "Mix",
        "Autres",
      ],
    },

    washed: {
      type: Boolean,
      default: false,
    },
    request: {
        type: mongoose.Schema.ObjectId,
        ref: 'Request'
    },
    partner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Partner',
        required: true
    },
    plastic_type: {
        type: mongoose.Schema.ObjectId,
        ref: 'Plastic_types',
        required: true
    }
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Collect", CollectSchema);
