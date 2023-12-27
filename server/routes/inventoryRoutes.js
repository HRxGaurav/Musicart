import express from "express";
import inventoryController from "../controllers/inventoryController.js";
import checkAuthUser from "../middlewares/auth-middleware.js";

const router = express.Router();
router.use(express.json());

//Unprotected routes
router.post('/add_inventory', inventoryController.addInventory);
router.post('/get_filtered_inventory', inventoryController.getFilteredInventory);
router.get('/get_product_by_id/:id', inventoryController.getProductById);


//Protected routes
router.post('/add_to_cart', checkAuthUser, inventoryController.addToCart);
router.post('/clear_cart', checkAuthUser, inventoryController.clearCart);
router.get('/get_cart', checkAuthUser, inventoryController.getCart);
router.put('/update_cart_quantity', checkAuthUser, inventoryController.updateCartQuantity);



export default router;