import mongoose from "mongoose";

const conditions=["good", "fair", "poor"],
const equipSchema = new mongoose.Schema({
  name: {
    type: String,
  },
quantity: {
        type:Number,
        },
  condition: {
      enum: conditions,
    },
    roomNumber:{
    type:mongoose.Schema.Types.ObjectId;
    ref:"ClassRoom"
    }
});
const Equipment=new mongoose.model("Equipment",equipSchema);

export{Equipment}