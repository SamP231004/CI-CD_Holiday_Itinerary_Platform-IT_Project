import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);
export default User;