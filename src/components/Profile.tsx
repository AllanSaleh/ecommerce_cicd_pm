import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { updateProfile, deleteUser } from "firebase/auth";
import styles from "./auth-styles";
const Profile = () => {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [status, setStatus] = useState("");
    const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateProfile(user, {
            displayName: displayName,
            email: email,
        })
            .then(() => {
                setStatus("Profile updated successfully");
            })
            .catch((error) => {
                setStatus(error.message);
            });
    };

    const handleDeleteAccount = async () => {
        try {
            if (!user) {
                setStatus("User not found");
                return;
            }
            await deleteUser(user);
            setStatus("Account deleted successfully");
        } catch (error) {
            setStatus(error.message);
        }
    };

    return (
        <div style={styles.form}>
            <h1>Profile</h1>
            {/* Add delete account button */}

            <form onSubmit={handleUpdateProfile}>
                <input
                    style={styles.input}
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    style={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <button style={styles.button} type="submit">
                    Update Profile
                </button>
                {status && <p style={styles.success}>{status}</p>}
                <div>
                    <button
                        onClick={handleDeleteAccount}
                        style={styles.deleteAccountButton}
                    >
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
