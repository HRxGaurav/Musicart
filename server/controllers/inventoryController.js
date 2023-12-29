import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Inventory from "../models/inventory.js";
import User from "../models/user.js";
dotenv.config();

const addInventory = async (req, res) => {
  try {

    const { name, fullname, price, company, colour, type, about_item, images } = req.body;

    // Create a new Inventory instance
    const newInventoryItem = new Inventory({ name, fullname, price, company, colour, type, about_item, images });

    // Save the new inventory item to the database
    const savedInventoryItem = await newInventoryItem.save();

    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFilteredInventory = async (req, res) => {
  try {
    const {
      fullname,
      priceRange,
      type,
      colour,
      company,
      sortBy
    } = req.body;

    // Build the filter object based on query parameters
    const filter = {};

    if (fullname) {
      filter.fullname = { $regex: new RegExp(fullname, 'i') };
    }

    if ([priceRange, type, colour, company].includes('featured')) {
      filter.featured = true;
    } else {
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-');
        filter.price = {};
        if (minPrice) {
          filter.price.$gte = parseFloat(minPrice);
        }
        if (maxPrice) {
          filter.price.$lte = parseFloat(maxPrice);
        }
      }

      if (type) {
        filter.type = type;
      }

      if (colour) {
        filter.colour = colour;
      }

      if (company) {
        filter.company = company;
      }
    }

    // If sortBy is provided, apply sorting
    let sortQuery = {};
    switch (sortBy) {
      case 'featured':
        sortQuery = { featured: -1 };
        break;
      case 'priceLowestFirst':
        sortQuery = { price: 1 };
        break;
      case 'priceHighestFirst':
        sortQuery = { price: -1 };
        break;
      case 'nameAtoZ':
        sortQuery = { fullname: 1 };
        break;
      case 'nameZtoA':
        sortQuery = { fullname: -1 };
        break;
      default:
        // If sortBy is not recognized, default to sorting by featured
        sortQuery = { featured: -1 };
        break;
    }

    // Fetch items with or without sorting based on sortBy condition
    let inventoryItems;
    if (Object.keys(sortQuery).length > 0) {
      if (sortBy === 'nameAtoZ' || sortBy === 'nameZtoA') {
        // If sorting by name, set sortQuery for ascending or descending order
        sortQuery = { fullname: sortBy === 'nameAtoZ' ? 1 : -1 };
        const collation = { locale: 'en', strength: 2 };
        inventoryItems = await Inventory.find(filter).collation(collation).sort(sortQuery);
      } else {
        // If not sorting by name, use the regular sortQuery for fetching items
        inventoryItems = await Inventory.find(filter).sort(sortQuery);
      }
    } else {
      inventoryItems = await Inventory.find(filter);
    }

    res.status(200).json({ message: 'success', inventoryItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const addToCart = async (req, res) => {
  const token = req.header('Authorization');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userID;
    const { productId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is already in the user's cart
    const cartItem = user.cart.find(item => item.product.toString() === productId);

    if (cartItem) {
      // If the product is already in the cart
      if (cartItem.quantity >= 8) {
        // Return an error if the maximum limit is reached
        return res.status(400).json({ error: "Maximum limit reached for this product" });
      } else {
        // Increment the quantity if not at the maximum limit
        cartItem.quantity += 1;
      }
    } else {
      // If the product is not in the cart, add a new cart item
      user.cart.push({ product: productId, quantity: 1 });
    }

    // Save the updated user with the new cart information
    await user.save();

    res.status(200).json({ message: "Added to cart successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const clearCart = async (req, res) => {
  const token = req.header('Authorization');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = decoded.userID;
    // Find the user and update the cart to an empty array
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { cart: [] },
      { new: true }
    );

    res.json({ message: 'Cart cleared successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Inventory.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json({ message: 'success', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getCart = async (req, res) => {
  const token = req.header('Authorization');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userID;
    // const userId = "65865cacaba2687acbb4dea3";

    // Find the user by ID and populate the product details
    const user = await User.findById(userId).populate('cart.product');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract relevant details from the populated user.cart array
    const cartDetails = user.cart.map(item => {
      const { _id, name, price, company, colour, type, about_item, images, featured } = item.product;
      return {
        _id: item._id,
        product: {
          _id,
          name,
          price,
          company,
          colour,
          type,
          about_item,
          images,
          featured
        },
        quantity: item.quantity
      };
    });

    res.status(200).json({ message: "Cart details retrieved successfully", cart: cartDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCartQuantity = async (req, res) => {
  const { productId, newQuantity } = req.body;
  const token = req.header('Authorization');

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userID;
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the cart item with the given product ID
    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

    if (cartItemIndex === -1) {
      return res.status(404).json({ error: "Product not found in the user's cart" });
    }

    // Update the quantity of the found cart item
    user.cart[cartItemIndex].quantity = newQuantity;

    // Save the updated user with the new cart information
    await user.save();

    res.status(200).json({ message: "Cart quantity updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { addInventory, getFilteredInventory, addToCart, clearCart, getProductById, getCart, updateCartQuantity };
