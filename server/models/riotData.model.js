import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { Date, Mixed, String } = Schema.Types;

const RiotDataSchema = new Schema({
    type: {
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
    }
});

const RiotData = mongoose.model('riotData', RiotDataSchema);

export default RiotData;