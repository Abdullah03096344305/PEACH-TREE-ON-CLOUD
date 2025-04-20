import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        userId: String,
        cost: String,
        products: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product", // Reference to the Product model (if applicable)
                },
                quantity: Number, // Quantity of the product
            },
        ],
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;