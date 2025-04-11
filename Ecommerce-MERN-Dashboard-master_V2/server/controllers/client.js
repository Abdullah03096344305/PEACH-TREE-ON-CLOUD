//import Product from "../models/Product.js";
//import ProductStat from "../models/ProductStat.js";
//import User from "../models/User.js";
//import Transaction from "../models/Transaction.js";
//import getCountryIso3 from "country-iso-2-to-3";

//// Get all products with their stats
//export const getProducts = async (req, res) => {
//    try {
//        const products = await Product.find();
//        const productsWithStats = await Promise.all(
//            products.map(async (product) => {
//                const stat = await ProductStat.find({ productId: product._id });
//                return { ...product._doc, stat };
//            })
//        );
//        res.status(200).json(productsWithStats);
//    } catch (error) {
//        res.status(404).json({ message: error.message });
//    }
//};
//// Create a new product
//export const createProduct = async (req, res) => {
//    try {
//        const { name, price, description, category, rating, supply } =
//            req.body;

//        // Validate input data
//        if (!name || !price || !category || stock == null) {
//            return res.status(400).json({ message: "Missing required fields" });
//        }

//        const createProduct = new Product({
//            name,
//            price,
//            description,
//            category,
//            rating,
//            supply,
//        });
//        await createProduct.save();
//        res.status(201).json(createProduct);
//    } catch (error) {
//        res
//            .status(500)
//            .json({ message: "Error creating product", error: error.message });
//    }
//};

//// Update a product by ID
//export const updateProduct = async (req, res) => {
//    try {
//        const { id } = req.params;
//        const updatedProductData = req.body;

//        const updatedProduct = await Product.findByIdAndUpdate(
//            id,
//            updatedProductData,
//            { new: true }
//        );

//        if (!updatedProduct) {
//            return res.status(404).json({ message: "Product not found" });
//        }

//        res.status(200).json(updatedProduct);
//    } catch (error) {
//        res
//            .status(500)
//            .json({ message: "Error updating product", error: error.message });
//    }
//};

//// Delete a product by ID
//export const deleteProduct = async (req, res) => {
//    try {
//        const { id } = req.params;
//        const deletedProduct = await Product.findByIdAndDelete(id);

//        if (!deletedProduct) {
//            return res.status(404).json({ message: "Product not found" });
//        }

//        res.status(200).json({ message: "Product deleted successfully" });
//    } catch (error) {
//        res
//            .status(500)
//            .json({ message: "Error deleting product", error: error.message });
//    }
//};
//// Get all customers (users with role "user")
//export const getCustomers = async (req, res) => {
//    try {
//        const customers = await User.find({ role: "user" }).select("-password");
//        res.status(200).json(customers);
//    } catch (error) {
//        res.status(404).json({ message: error.message });
//    }
//};

//// Get transactions with pagination, sorting, and search
//export const getTransactions = async (req, res) => {
//    try {
//        const { sort = null, search = "" } = req.query;

//        // Format sorting
//        const generateSort = () => {
//            const sortParsed = JSON.parse(sort);
//            const sortFormatted = {
//                [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
//            };
//            return sortFormatted;
//        };
//        const sortFormatted = Boolean(sort) ? generateSort() : {};

//        // Fetch all transactions matching the search criteria
//        const transactions = await Transaction.find({
//            $or: [
//                { cost: { $regex: new RegExp(search, "i") } },
//                { userId: { $regex: new RegExp(search, "i") } },
//            ],
//        }).sort(sortFormatted);

//        // Get total count of transactions matching the search
//        const total = await Transaction.countDocuments({
//            $or: [
//                { cost: { $regex: new RegExp(search, "i") } },
//                { userId: { $regex: new RegExp(search, "i") } },
//            ],
//        });

//        res.status(200).json({ transactions, total });
//    } catch (error) {
//        res.status(404).json({ message: error.message });
//    }
//};

//// Create a new transaction
//export const createTransaction = async (req, res) => {
//    try {
//        const { userId, cost, products } = req.body;

//        // Validate required fields
//        if (!userId || !cost || !products) {
//            return res.status(400).json({ message: "Missing required fields" });
//        }

//        const newTransaction = new Transaction({ userId, cost, products });
//        await newTransaction.save();
//        res.status(201).json(newTransaction);
//    } catch (error) {
//        res.status(400).json({ message: error.message });
//    }
//};

//// Get geography data (user locations)
//export const getGeography = async (req, res) => {
//    try {
//        const users = await User.find();
//        const mappedLocations = users.reduce((acc, { country }) => {
//            const countryISO3 = getCountryIso3(country);
//            acc[countryISO3] = (acc[countryISO3] || 0) + 1;
//            return acc;
//        }, {});

//        const formattedLocations = Object.entries(mappedLocations).map(
//            ([country, count]) => ({ id: country, value: count })
//        );

//        res.status(200).json(formattedLocations);
//    } catch (error) {
//        res.status(404).json({ message: error.message });
//    }
//};
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
import mongoose from "mongoose";

/* ALL EXISTING CONTROLLERS REMAIN UNCHANGED */
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
        res.status(404).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, rating, supply } =
            req.body;

        if (!name || !price || !category || supply == null) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const createProduct = new Product({
            name,
            price,
            description,
            category,
            rating,
            supply,
        });
        await createProduct.save();
        res.status(201).json(createProduct);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error creating product", error: error.message });
    }
};

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

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const { sort = null, search = "" } = req.query;

        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
            };
            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
            ],
        }).sort(sortFormatted);

        const total = await Transaction.countDocuments({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
            ],
        });

        res.status(200).json({ transactions, total });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

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
        res.status(404).json({ message: error.message });
    }
};

/* NEW CONTROLLER ONLY - Add Transaction */
//export const createTransaction = async (req, res) => {
//    try {
//        console.log("Raw request body:", req.body);

//        const { userId, cost, products } = req.body;

//        // Convert products to array if needed
//        let productsArray;
//        if (Array.isArray(products)) {
//            productsArray = products;
//        } else if (typeof products === 'string') {
//            productsArray = products.split(',').map(id => id.trim());
//        } else {
//            productsArray = [products].filter(Boolean);
//        }

//        console.log("Processed products:", productsArray);

//        // Validate required fields
//        if (!userId || cost === undefined || productsArray.length === 0) {
//            return res.status(400).json({
//                message: "Missing required fields",
//                details: {
//                    userId: !!userId,
//                    cost: cost !== undefined,
//                    products: productsArray.length > 0
//                }
//            });
//        }

//        // Validate MongoDB IDs
//        const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
//        if (!isValidId(userId)) {
//            return res.status(400).json({
//                message: "Invalid User ID format"
//            });
//        }

//        // Check if user exists
//        const userExists = await User.exists({ _id: userId });
//        if (!userExists) {
//            return res.status(404).json({
//                message: "User not found",
//                suggestion: "Verify with GET /api/client/customers"
//            });
//        }

//        // Check if products exist
//        const invalidProducts = [];
//        await Promise.all(productsArray.map(async (productId) => {
//            if (!isValidId(productId)) {
//                invalidProducts.push(productId);
//                return;
//            }
//            const exists = await Product.exists({ _id: productId });
//            if (!exists) invalidProducts.push(productId);
//        }));

//        if (invalidProducts.length > 0) {
//            return res.status(400).json({
//                message: "Invalid product IDs",
//                invalidProducts,
//                validExample: "63701d24f03239e06900012a"
//            });
//        }

//        // Create transaction
//        const newTransaction = new Transaction({
//            userId,
//            cost: Number(cost),
//            products: productsArray
//        });

//        const savedTransaction = await newTransaction.save();

//        res.status(201).json({
//            success: true,
//            transaction: {
//                ...savedTransaction.toObject(),
//                cost: savedTransaction.cost.toString() // Match your format
//            }
//        });
export const createTransaction = async (req, res) => {
    try {
        console.log("Raw request body:", req.body);

        const { userId, cost, products } = req.body;

        // Convert products to array if needed
        let productsArray;
        if (Array.isArray(products)) {
            productsArray = products;
        } else if (typeof products === 'string') {
            productsArray = products.split(',').map(id => id.trim());
        } else {
            productsArray = [products].filter(Boolean);
        }

        console.log("Processed products:", productsArray);

        // Validate required fields
        if (!userId || cost === undefined || productsArray.length === 0) {
            return res.status(400).json({
                message: "Missing required fields",
                details: {
                    userId: !!userId,
                    cost: cost !== undefined,
                    products: productsArray.length > 0
                }
            });
        }

        // Validate MongoDB IDs
        const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
        if (!isValidId(userId)) {
            return res.status(400).json({
                message: "Invalid User ID format"
            });
        }

        // Check if user exists
        const userExists = await User.exists({ _id: userId });
        if (!userExists) {
            return res.status(404).json({
                message: "User not found",
                suggestion: "Verify with GET /api/client/customers"
            });
        }

        // Check if products exist
        const invalidProducts = [];
        await Promise.all(productsArray.map(async (productId) => {
            if (!isValidId(productId)) {
                invalidProducts.push(productId);
                return;
            }
            const exists = await Product.exists({ _id: productId });
            if (!exists) invalidProducts.push(productId);
        }));

        if (invalidProducts.length > 0) {
            return res.status(400).json({
                message: "Invalid product IDs",
                invalidProducts,
                validExample: "63701d24f03239e06900012a"
            });
        }

        //Cast product IDs to ObjectId
        const castedProductIds = productsArray.map(id => new mongoose.Types.ObjectId(id));

        // Create transaction
        const newTransaction = new Transaction({
            userId: new mongoose.Types.ObjectId(userId),
            cost: Number(cost),
            products: castedProductIds
        });

        const savedTransaction = await newTransaction.save();

        res.status(201).json({
            success: true,
            transaction: {
                ...savedTransaction.toObject(),
                cost: savedTransaction.cost.toString()
            }
        });

    } catch (error) {
        console.error("Complete error stack:", error);
        res.status(500).json({
            success: false,
            message: "Transaction creation failed",
            errorType: error.name,
            errorMessage: error.message,
            expectedFormat: {
                userId: "Valid MongoDB ObjectId (24 chars)",
                cost: "Number or numeric string",
                products: "Array or comma-separated string of product IDs"
            }
        });
    }
};