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
    },
    status: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
          "To do",
          "Done",
          "Archived",
          "Fail",
        ],
        default: "To do"
      },
      urgent: {
        type: Boolean,
        default: false,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Request", RequestSchema);
