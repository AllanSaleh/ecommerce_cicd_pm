import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";
import styles from "./auth-styles";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: displayName,
                });
                console.log(userCredential);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div style={styles.form}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                {error && <p style={styles.error}>{error}</p>}
                <fieldset style={styles.fieldset}>
                    <legend style={styles.legend}>Register</legend>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Register</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;
