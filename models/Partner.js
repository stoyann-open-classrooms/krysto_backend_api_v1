const mongoose = require("mongoose");
const slugify = require("slugify");
const PartnerSchema = new mongoose.Schema(
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
      maxlength: [500, "Name can not be more than 500 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    type: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Association",
        "Revendeur",
        "Fournisseur Plastique",
        "Institution",
        "Collecte de déchets",
        "Entreprise economie circulaire",
        "Entreprise engagée dans le recyclage",
        "Autres",
      ],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// create Partner slug from the name
PartnerSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Partner", PartnerSchema);
