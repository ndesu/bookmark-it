"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/loginForm";
import styles from "../page.module.css"
import { useAuth } from "../context/AuthUserContext";

export default function Login() {
    const { authUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(authUser) router.push('/')
    }, [authUser])

  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}