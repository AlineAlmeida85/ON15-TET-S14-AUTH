const express = require("express"); 
const router = express.Router(); 

const controller = require("../controllers/lanchesController")

router.get("/all", controller.getAll);

router.post("/create", controller.createLanche);

router.put("/update/:id", controller.updateLanche);

router.delete("/delete/:id", controller.deleteLanche);

module.exports = router;