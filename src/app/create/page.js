"use client";
import { useAuth } from "../context/AuthUserContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateUserForm from "../components/createUserForm";
import styles from "../page.module.css"

export default function CreateUser() {
    const { authUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(authUser) router.push('/')
    }, [authUser])

    return (
        <div className={styles.container}>
            <CreateUserForm />
        </div> 

    )
}