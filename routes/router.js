const express = require("express");
const userController=require('../controllers/userController')
const menController=require('../controllers/menController')
const paymentController = require("../controllers/paymentController");
const router = new express.Router();

router.post('/register',userController.registerController)


router.post('/login',userController.loginController)

router.post("/add", userController.addToCart); // Add to cart route

router.post("/specail", userController.addToCartSpecial); // Add to cart route


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

router.delete("/cart/:userId/product/:productId",userController. removeFromCart);

// router.get('/brand/:brand',menController.getMenProductsByBrand)

router.get('/nike',menController.NikeBrand)

router.get('/levi',menController.LeviBrand)

router.get('/zara',menController.ZaraBrand)

router.get('/asos',menController.AsosBrand)

router.get('/prida',menController.PridaBrand)

router.get("/count/men", menController.getMenDressesCount);

router.get("/count/women", menController.getWomenDressesCount);

router.get("/count/kid", menController.getKidDressesCount);

router.get("/count/user", userController.getUserCount);

router.post("/create-checkout-session", paymentController.createCheckoutSession);

router.delete("/clear-cart", userController.clearCart); 

router.get('/logout', userController.logout);

module.exports=router