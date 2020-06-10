const mongoose = require('mongoose');

// mongoose.model('battles_test', 
// new Schema({ url: String, text: String, id: Number}), 
// 'battles_test');

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
// module.exports = mongoose.model("movie_struct",jobSchema)

// mongo "mongodb+srv://cluster0-e8e2r.mongodb.net/test"  --username dhruva
// mongo "mongodb+srv://cluster0-e8e2r.mongodb.net/test"  --username dhruva