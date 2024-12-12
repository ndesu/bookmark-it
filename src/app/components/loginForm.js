"use client"
import styles from "../page.module.css";
import { useCallback } from "react";
import { useAuth } from "../context/AuthUserContext";

export default function LoginForm() {
    const { signInWithEmailAndPassword, authUser } = useAuth();
    console.log({ authUser })
    const loginSubmit = useCallback(
        (e) => {
            e.preventDefault()
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            return signInWithEmailAndPassword(email, password);
        }, [signInWithEmailAndPassword]
    )

    return (
        <div className={styles.container}>
        <div className={styles.loginForm}>
            <h2>Login Here!</h2>
            <form className={styles.form} onSubmit={(e) => loginSubmit(e)}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" />

            <button type="submit">Login User</button>
            </form>
        </div>
        </div>
  );
}
