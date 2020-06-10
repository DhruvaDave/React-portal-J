const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
    // _id: mongoose.Schema.ObjectId,
    title: String,
    discription: String,
    // timing: Date,
    
    },
    { timestamps: true }
);

jobSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model("job_struct",jobSchema)