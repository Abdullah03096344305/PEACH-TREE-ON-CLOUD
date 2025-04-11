import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import Header from "components/Header";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "state/api";
import { Edit, Delete } from "@mui/icons-material";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <IconButton onClick={() => onEdit(_id)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(_id)}>
          <Delete />
        </IconButton>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>ID: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales: {stat.yearSalesTotal}</Typography>
          <Typography>
            Yearly Units Sold: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    supply: "",
    rating: "",
  });

  const handleOpen = () => {
    setEditMode(false);
    setCurrentProduct({
      _id: "",
      name: "",
      description: "",
      price: "",
      category: "",
      supply: "",
      rating: "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (editMode) {
      await updateProduct({ id: currentProduct._id, ...currentProduct });
    } else {
      await addProduct(currentProduct);
    }
    handleClose();
  };

  const handleEdit = (id) => {
    const productToEdit = data.find((product) => product._id === id);
    setCurrentProduct(productToEdit);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <Box display="flex" justifyContent="flex-end" mb="1rem">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create New
        </Button>
      </Box>

      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}

      {/* Modal for Creating/Editing Product */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            {editMode ? "Edit Product" : "Add New Product"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            name="name"
            value={currentProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={currentProduct.description}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={currentProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            name="category"
            value={currentProduct.category}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Supply"
            name="supply"
            type="number"
            value={currentProduct.supply}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Rating"
            name="rating"
            type="number"
            value={currentProduct.rating}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            {editMode ? "Update" : "Submit"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Products;
