import mongoose from "mongoose";
const blockSchema = new mongoose.Schema({
  blockNumber: {
    type: Number,
    required: true,
  },
  classRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
    },
  ],
});
const BlockNumber = new mongoose.model("BlockNumber", blockSchema);
export { BlockNumber };
