"use client"
import styles from "../page.module.css"
import { useCallback } from "react";
import { useAuth } from "../context/AuthUserContext";
import { useDatabase } from "../context/DatabaseContext";

export default function CreateUserForm() {
    const { createUserWithEmailAndPassword, authUser } = useAuth();
    const { addUser } = useDatabase();

    console.log({ authUser })
    const createUserSubmit = useCallback(
        async (e) => {
            e.preventDefault()
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const name = e.currentTarget.name.value;

            const userCredential = await createUserWithEmailAndPassword(email, password);
            const user = userCredential.user

            await addUser({uid: user.uid, Email: email, Name: name})
        }, [createUserWithEmailAndPassword]
    )

    return (
      <div className={styles.container}>
        <div className={styles.createUserForm}>
          <h2>Create A New Account !</h2>
          <form className={styles.form} onSubmit={(e) => createUserSubmit(e)}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
  
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
  
            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    );
  }