const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  outcomes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Outcome",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
