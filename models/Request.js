const mongoose = require("mongoose");


const RequestSchema = new mongoose.Schema(
  {
    remarque: {
      type: String,
      maxlength: [5000, "Remmarque can not be more than 5000 characters"],
    },
    partner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Partner',
        require: true
    }
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Request", RequestSchema);
