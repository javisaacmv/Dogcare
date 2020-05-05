const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  veterinary: {
    type: String,
  },
  tempHome: {
    type: String,
  },
  defHome: {
    type: String,
  },
  mainInjury: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Dog", dogSchema);
