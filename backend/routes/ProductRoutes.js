import {
  getProducts,
  getProductsById,
} from "../Controllers/ProductControllers";
const router = express.Router();

// @desc   gets all the products data
// @access public
// @api    GET /api/products/
router.get("/", getProducts);

// @desc   get a product by the id given in the params
// @access public
// @api    GET /api/products/:id
router.get("/:id", getProductsById);

export default router;
