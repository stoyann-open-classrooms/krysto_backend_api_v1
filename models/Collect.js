const mongoose = require("mongoose");


const CollectSchema = new mongoose.Schema(
  {
    remarque: {
      type: String,
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
        ref: 'Request',
    },
    partner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Partner',
        required: true
    },
    plastic_type: {
        type: mongoose.Schema.ObjectId,
        ref: 'Plastic_type',
        required: true
    }
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);




// Static method to get avg of course tuitions
CollectSchema.statics.getAverageCost = async function(partnerId) {
  console.log('calculating the average cost...'.blue);
  const obj = await this.aggregate([
    {
      $match: { partner : partnerId }
    },
    {
      $group: {
        _id: '$partner',
        recycled: { $avg: '$weight_KG' }
      }
    }
  ]);
  console.log(obj);

  try {
    await this.model('Partner').findByIdAndUpdate(partnerId, {
      recycled: obj[0].recycled
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
CollectSchema.post('save', function() {
  this.constructor.getAverageCost(this.partner);
});

// Call getAverageCost before remove
CollectSchema.pre('remove', function() {
  this.constructor.getAverageCost(this.partner);
});





module.exports = mongoose.model("Collect", CollectSchema);
