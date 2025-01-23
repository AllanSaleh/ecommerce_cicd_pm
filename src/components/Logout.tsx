import { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";      
import { useAuth } from "../context/auth";

const Logout = () => {
    const { setUser } = useAuth();
    useEffect(() => {
        signOut(auth);
        setUser(null);
    }, []);
    return <div>Logout</div>;
};

export default Logout;
