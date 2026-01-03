import mongoose, { Schema, Document } from 'mongoose';

interface IActivityReference {
    activityId: mongoose.Types.ObjectId;
    time?: string;
    notes?: string;
    costOverride?: number;
}

interface IStop {
    cityId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    activities: IActivityReference[];
}

export interface ITrip extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    coverPhoto?: string;
    budget: {
        total: number;
        transport: number;
        accommodation: number;
        activities: number;
        meals: number;
    };
    stops: IStop[];
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TripSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        description: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        coverPhoto: { type: String },
        budget: {
            total: { type: Number, default: 0 },
            transport: { type: Number, default: 0 },
            accommodation: { type: Number, default: 0 },
            activities: { type: Number, default: 0 },
            meals: { type: Number, default: 0 },
        },
        stops: [
            {
                cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
                startDate: { type: Date, required: true },
                endDate: { type: Date, required: true },
                activities: [
                    {
                        activityId: { type: Schema.Types.ObjectId, ref: 'Activity' },
                        time: { type: String },
                        notes: { type: String },
                        costOverride: { type: Number },
                    },
                ],
            },
        ],
        isPublic: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<ITrip>('Trip', TripSchema);
