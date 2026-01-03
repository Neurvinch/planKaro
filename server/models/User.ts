import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    photo?: string;
    languagePreference: string;
    savedDestinations: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        photo: { type: String },
        languagePreference: { type: String, default: 'en' },
        savedDestinations: [{ type: Schema.Types.ObjectId, ref: 'City' }],
    },
    { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
