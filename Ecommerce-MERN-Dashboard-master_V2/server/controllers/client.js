import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

// Get all products with their stats
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return { ...product._doc, stat };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

//create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, rating, supply } = req.body;

    // Validate input data - removed stock check since it's not in your schema
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      rating: rating || 0, // default value
      supply: supply || 0, // default value
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
      stack: error.stack, // for more detailed debugging
    });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

// Get all customers (users with role "user")
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching customers", error: error.message });
  }
};

// Get transactions with pagination, sorting, and search
export const getTransactions = async (req, res) => {
  try {
    const { sort = null, search = "" } = req.query;

    // Format sorting
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // Fetch all transactions matching the search criteria
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    }).sort(sortFormatted);

    // Get total count of transactions matching the search
    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    });

    res.status(200).json({ transactions, total });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { userId, cost, products } = req.body;

    // Validate required fields
    if (!userId || !cost || !products) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTransaction = new Transaction({ userId, cost, products });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating transaction", error: error.message });
  }
};

// Get geography data (user locations)
export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      acc[countryISO3] = (acc[countryISO3] || 0) + 1;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => ({ id: country, value: count })
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching geography data", error: error.message });
  }
};
// Compare this snippet from client/src/state/api.js:
//         }),
