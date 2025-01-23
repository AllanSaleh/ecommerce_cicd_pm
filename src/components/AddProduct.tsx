import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { CreateProductInput } from "../types/types";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
    },
};

const initialProduct: CreateProductInput = {
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
};

const AddProduct = () => {
    const navigate = useNavigate();
    const { createProduct, isCreating } = useProducts();
    const [newProduct, setNewProduct] = useState<CreateProductInput>(initialProduct);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            navigate("/products");
        } catch (error) {
            console.error("Failed to create product:", error);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value,
        }));
    };

    return (
        <div style={styles.container}>
            <h2>Add New Product</h2>
            <ProductForm
                product={newProduct}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                onCancel={() => navigate("/products")}
                isLoading={isCreating}
                submitButtonText="Add Product"
                loadingButtonText="Adding..."
            />
        </div>
    );
};

export default AddProduct; 