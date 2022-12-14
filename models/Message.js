const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Please add name"],
        unique: true,
        trim: true,
        maxlength: [30, "Name can not be more than 30 characters"],
      },
    lastname: {
        type: String,
        required: [true, "Please add name"],
        unique: true,
        trim: true,
        maxlength: [30, "lastname can not be more than 30 characters"],
      },
    compagny: {
        type: String,
        unique: true,
        trim: true,
        maxlength: [30, "Compagny can not be more than 50 characters"],
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
    message: {
      type: String,
      maxlength: [5000, "Message can not be more than 5000 characters"],
    },
    status: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
          "not read",
          "read",
          "Archived",
          
        ],
        default: "not read"
      },
   
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Message", MessageSchema);
