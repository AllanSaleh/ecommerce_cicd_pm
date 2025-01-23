import { useParams } from "react-router-dom";
import { useGetOrder } from "../hooks/useOrders";
import { Product } from "../types/types";

const OrderView = () => {
  const { orderId } = useParams();
  const { data: order } = useGetOrder(orderId as string);
  console.log(order);
  return (
    <div style={styles.orderView}>
      <h1>Order View</h1>
      <p>Order ID: {order?.id}</p>
      <p>Total: {order?.total}</p>
      <p>Products:</p>
      {order?.products.map((product) => (
        <OrderItem key={product.id} product={product} />
      ))}
      <p>
        Created At: {new Date(order?.createdAt.seconds * 1000).toLocaleString()}
      </p>
    </div>
  );
};

const OrderItem = ({ product }: { product: Product }) => {
  return (
    <div style={styles.orderItem}>
      <p>Title: {product.title}</p>
      <p>Price: {product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
};
export default OrderView;

const styles = {
  orderView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
  },
  orderItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
  },
};
