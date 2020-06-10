const express = require('express');
const router = express.Router();

const Job = require('../models/got.model');


router.post("/job/create",(req,res) => {
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const job = new Job({
        title: req.body.title,
        discription: req.body.discription,
        // timing: req.body.timing,
    });
    job
        .save(job)
        .then(result => {
            res.send(result);
        })
        .catch(err =>{
        });
});

router.get("/job/findAll",(req,res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Job.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies."
      });
    });
});


router.get("/job/:id",(req,res) => {
  const id = req.params.id;

  Job.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Job with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Job with id=" + id });
    });
});


router.put("/job/update/:id",(req,res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Job.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Job with id=${id}. Maybe Job was not found!`
        });
      } else res.send({ message: "Job was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Job with id=" + id
      });
    });
});


// router.delete("/project/delete/:id",(req,res) => {
//   const id = req.params.id;

//   Job.findByIdAndRemove(id)
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
//         });
//       } else {
//         res.send({
//           message: "Job was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Job with id=" + id
//       });
//     });
// });

// router.delete("/project/deleteAll",(req,res) => {
//   Job.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Movies were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all movies."
//       });
//     });
// });



exports.readTask = (req, body) => {
    Task.findById(req.params.taskid, (err, task) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(task);
    });
  };


module.exports = router;