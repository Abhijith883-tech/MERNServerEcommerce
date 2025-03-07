const express = require("express");
const userController=require('../controllers/userController')
const menController=require('../controllers/menController')
const router = new express.Router();

router.post('/register',userController.registerController)


router.post('/login',userController.loginController)

router.post("/add", userController.addToCart); // Add to cart route


router.get("/cart/:userId", userController.getCart); 


router.post('/admin/men/add',menController.addMenProduct)


router.get('/admin/men',menController.showMen)

router.delete("/admin/men/:id",menController.deleteMenProduct);


router.put("/admin/men/:id", menController.editMenProduct); // API for updating


module.exports=router