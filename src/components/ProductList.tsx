import { useCart } from "../context/cart-context";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types/types";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  productList: {
    display: "flex",
    flexDirection: "row" as const,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  product: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "1rem",
    margin: "1rem",
  },

  productImage: {
    width: "100px",
    height: "100px",
  },

  productTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },

  productDescription: {
    fontSize: "1rem",
    color: "#666",
  },

  productPrice: {
    fontSize: "1rem",
    fontWeight: "bold",
  },

  productCategory: {
    fontSize: "1rem",
    color: "#666",
  },

  productActions: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "space-between",
  },
};

const ProductList = () => {
  const { products, isLoading, deleteProduct, isDeleting } = useProducts();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const addToCartWithAlert = (product) => {
    addToCart(product);
    alert("Item added to cart");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("products: ", products);

  return (
    <div style={styles.container as React.CSSProperties}>
      <h2>Products List</h2>
      <button onClick={() => navigate("/products/new")}>Add New Product</button>

      <div style={styles.productList as React.CSSProperties}>
        {products?.map((product: Product) => (
          <div key={product.id} style={styles.product}>
            <img
              src={product.image}
              alt={product.title}
              style={styles.productImage}
            />
            <h3 style={styles.productTitle}>{product.title}</h3>
            <p style={styles.productDescription}>{product.description}</p>
            <p style={styles.productPrice}>${product.price}</p>
            <p style={styles.productCategory}>Category: {product.category}</p>
            <div style={styles.productActions}>
              <button onClick={() => addToCartWithAlert(product)}>
                Add to Cart
              </button>
              <button onClick={() => navigate(`/products/edit/${product.id}`)}>
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id!)}
                disabled={isDeleting}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
