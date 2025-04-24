import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

const studentSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: { type: String, unique: true },
    enrollmentnumber: { type: String, unique: true },
    password: String,
    isApproved: { type: Boolean, default: false },
    additionalDetails: {
        address: String,
        phone: String,
        // add more as needed
    }
},
    { timestamps: true }
);

// studentSchema.pre('save', function (next) {
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// })
// studentSchema.methods.comparePassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }
export const Student = mongoose.model('Student', studentSchema);