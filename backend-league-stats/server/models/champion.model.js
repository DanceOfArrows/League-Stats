import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { Number, String } = Schema.Types;

const ChampionSchema = new Schema({
    championId: {
        required: true,
        type: Number,
        unique: true,
    },
    championName: {
        required: true,
        type: String,
        unique: true,
    },
    displayName: {
        required: true,
        type: String,
        unique: true,
    },
});

const Champion = mongoose.model('champion', ChampionSchema);

export default Champion;