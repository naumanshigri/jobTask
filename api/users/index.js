const express = require("express");
const router = express.Router();


const controller = require("./controller")


router.post("/records", controller.createUserRecords); // Generate User Records ( from file)

router.post("/create", controller.newUser); // Create New User

router.get("/list", controller.userList); // Get list

router.get("/list/:email", controller.userDetail); // Get user detail by email

router.put("/update", controller.userUpdate); // Get user detail by email

router.get("/sort", controller.userSort); // Sort by User id

router.delete("/remove/:email", controller.userRemove); // Sort by User id


module.exports = router;