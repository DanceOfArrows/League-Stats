import mongoose from "mongoose";

const Schema = mongoose.Schema;
const { Date, Mixed, Number } = Schema.Types;

const MatchSchema = new Schema({
  matchId: {
    required: true,
    type: Number,
    unique: true,
  },
  data: {
    required: true,
    type: Mixed,
  },
});

const MatchData = mongoose.model("match", MatchSchema);

export default MatchData;
