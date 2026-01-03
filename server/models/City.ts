import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
    name: string;
    country: string;
    region?: string;
    costIndex: number;
    popularity: number;
    description?: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

const CitySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        country: { type: String, required: true },
        region: { type: String },
        costIndex: { type: Number, default: 1 }, // 1-5 scale
        popularity: { type: Number, default: 0 },
        description: { type: String },
        images: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.model<ICity>('City', CitySchema);
