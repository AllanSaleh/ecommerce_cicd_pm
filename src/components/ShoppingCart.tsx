import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart-context';
import { useCreateOrder } from '../hooks/useOrders';
import { Order } from '../types/types';

const styles = {
  cartItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  },
  cartItemImage: {
    width: '100px',
    height: '100px',
  },
};

const ShoppingCart = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const { user } = useAuth();

  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }

  const { mutate: createOrder } = useCreateOrder();

  const navigate = useNavigate();
  const handleCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      return;
    }
    const order: Order = {
      userId: user.uid,
      products: cartItems,
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    createOrder(order);
    clearCart();
    alert('Checkout Successful!');
    navigate('/orders');
  };

  return (
    <div>
      <h1>Current Shopping Cart:</h1>
      <button onClick={clearCart}>Clear Cart</button>
      {cartItems.map((item) => (
        <div key={item.id} style={styles.cartItem}>
          <h3>{item.title}</h3>
          <img src={item.image} alt={item.title} style={styles.cartItemImage} />
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div>
        <h4>Total: ${total}</h4>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};
export default ShoppingCart;
