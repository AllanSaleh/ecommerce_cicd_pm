import { useCart } from "../context/cart-context";
import { Product } from "../types/types";

const styles = {
  productCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
  },
  productImage: {
    width: "100px",
    height: "100px",
  },
};
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  const addToCartWithAlert = (product) => {
    addToCart(product);
    alert("Item added to cart");
  };
  
  return (
    <div style={styles.productCard}>
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <img
        src={product.image}
        alt={product.title}
        style={styles.productImage}
      />
      <button onClick={() => addToCartWithAlert(product)}>Add to Cart</button>
    </div>
  );
};
export default ProductCard;
