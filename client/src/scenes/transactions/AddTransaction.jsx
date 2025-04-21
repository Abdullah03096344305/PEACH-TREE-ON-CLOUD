import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useAddTransactionMutation } from "state/api";
import Header from "components/Header";

const AddTransaction = () => {
    const theme = useTheme();
    const [addTransaction, { isLoading }] = useAddTransactionMutation();
    const [formData, setFormData] = useState({
        userId: "",
        cost: "",
        products: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTransaction({
                userId: formData.userId,
                cost: parseFloat(formData.cost),
                products: formData.products.split(',').map(id => id.trim())
            }).unwrap();
            alert("Transaction added successfully!");
            setFormData({ userId: "", cost: "", products: "" });
        } catch (error) {
            alert("Error adding transaction: " + (error.data?.message || error.message));
        }
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="ADD TRANSACTION" subtitle="Create a new transaction record" />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    mt: "1rem",
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <Box display="flex" flexDirection="column" gap="1.5rem">
                    <TextField
                        required
                        fullWidth
                        variant="filled"
                        name="userId"
                        label="User ID"
                        value={formData.userId}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        required
                        fullWidth
                        variant="filled"
                        name="cost"
                        label="Cost"
                        type="number"
                        value={formData.cost}
                        onChange={handleChange}
                        inputProps={{ step: "0.01" }}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        required
                        fullWidth
                        variant="filled"
                        name="products"
                        label="Product IDs (comma separated)"
                        value={formData.products}
                        onChange={handleChange}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <Box mt="2rem">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isLoading}
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                        >
                            {isLoading ? "Adding..." : "Add Transaction"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddTransaction;