const jobRouter = require("express").Router();
const { createJob, getAllJobs, getJobById } = require("../controllers/jobs");

jobRouter.post("/createJob", createJob);
jobRouter.get("/getAllJobs", getAllJobs);
jobRouter.get("/getJobById/:jobId", getJobById);

module.exports = jobRouter;
