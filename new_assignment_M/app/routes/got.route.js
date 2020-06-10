module.exports = app => {
    const jobs = require("../routes/search.js");
  
    var router = require("express").Router();
  
    router.post("/", jobs.create);

    app.use('/api/jobs', router);
  };