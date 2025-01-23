import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useOrders } from "../hooks/useOrders";
import { useDeleteOrder } from "../hooks/useOrders";

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    textAlign: "left",
  },
  link: {
    textDecoration: "none",
    color: "blue",
  },
};

const Orders = () => {
  const { user } = useAuth();
  const { data: orders } = useOrders(user?.uid);
  const { mutate: deleteOrder } = useDeleteOrder();
  return (
    <div style={styles.container as React.CSSProperties}>
      <h1>Orders</h1>
      <table style={styles.table as React.CSSProperties}>
        <thead>
          <tr>
            <th style={styles.th as React.CSSProperties}>Order ID</th>
            <th style={styles.th as React.CSSProperties}>Total</th>
            <th style={styles.th as React.CSSProperties}>Created At</th>
            <th style={styles.th as React.CSSProperties}>View</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <td style={styles.td as React.CSSProperties}>{order.id}</td>
              <td style={styles.td as React.CSSProperties}>{order.total}</td>
              <td style={styles.td as React.CSSProperties}>
                {new Date(order.createdAt.seconds * 1000).toLocaleString()}
              </td>
              <td style={styles.td as React.CSSProperties}>
                <Link to={`/orders/${order.id}`} style={styles.link}>
                  View
                </Link>
              </td>
              <td style={styles.td as React.CSSProperties}>
                <button onClick={() => deleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
