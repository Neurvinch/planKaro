import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
    cityId: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    cost: number;
    duration?: string;
    type: string; // sightseeing, food, adventure, etc.
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ActivitySchema: Schema = new Schema(
    {
        cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
        name: { type: String, required: true },
        description: { type: String },
        cost: { type: Number, default: 0 },
        duration: { type: String },
        type: { type: String, required: true },
        images: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
