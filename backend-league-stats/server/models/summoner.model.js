import mongoose from "mongoose";

const Schema = mongoose.Schema;
const { Date, Mixed, String } = Schema.Types;

const SummonerSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  data: {
    required: true,
    type: Mixed,
  },
  lastUpdated: {
    required: true,
    type: Date,
  },
});

const SummonerData = mongoose.model("summoner", SummonerSchema);

export default SummonerData;
