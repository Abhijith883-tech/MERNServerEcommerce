const express = require("express");
const userController=require('../controllers/userController')
const menController=require('../controllers/menController')
const router = new express.Router();

router.post('/register',userController.registerController)


router.post('/login',userController.loginController)

router.post("/add", userController.addToCart); // Add to cart route


router.get("/cart/:userId", userController.getCart); 


router.post('/admin/men/add',menController.addMenProduct)
router.post('/admin/women/add',menController.addMenProduct)
router.post('/admin/kid/add',menController.addMenProduct)
router.post('/admin/special/add',menController.addSpecialProduct)



router.get('/admin/men',menController.showMen)
router.get('/admin/women',menController.showWomen)
router.get('/admin/kid',menController.showKid)
router.get('/admin/special',menController.showSpecial)

router.delete("/admin/men/:id",menController.deleteMenProduct);


router.put("/admin/men/:id", menController.editMenProduct); // API for updating

router.delete('/empty-cart/:userId', userController.emptyCart);

// router.delete("/cart/:userId/:productId", userController.removeFromCart);
// router.delete("/cart/:userId/:productId", userController.removeFromCart);

router.delete("/cart/:userId/product/:productId",userController. removeFromCart);

// router.get("/search", userController.searchProducts);

module.exports=router