const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },

    mobile: {
        type: Number,
        required: true,
        match: [/^[6-9]\d{9}$/, "please fill a valid mobile Number"],
        unique: true
    },
    collegeId: {
        type: ObjectId,
        ref: "college",
        match: [/^[a-zA-Z]{24,24}$/, "Please fill Id with valid length"],


    },
    isDeleted: {
        type: Boolean,
        default: false
    },

},
    { timeStamps: true })

module.exports = mongoose.model('intern', internSchema)