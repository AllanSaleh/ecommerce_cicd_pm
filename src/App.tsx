import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/auth";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import { CartProvider } from "./context/cart-context";
import Orders from "./components/Orders";
import OrderView from "./components/OrderView";
const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CartProvider>
                    <AuthProvider>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<ShoppingCart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/products" element={<ProductList />} />
                            <Route
                                path="/products/new"
                                element={<AddProduct />}
                            />
                            <Route
                                path="/products/edit/:id"
                                element={<EditProduct />}
                            />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/orders/:orderId" element={<OrderView />} />
                        </Routes>
                    </AuthProvider>
                </CartProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};
export default App;
