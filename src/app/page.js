"use client"
import styles from "./page.module.css";
import { useAuth } from "./context/AuthUserContext";
import { useDatabase } from "./context/DatabaseContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ViewUserCard from "./components/viewUserCard";

export default function Home() {
  const { authUser } = useAuth();
  const { users } = useDatabase();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) router.push("/login")
  }, [authUser])

  return (
    <div className={styles.homeContainer}>
      {users.map((user, index) => (
        <ViewUserCard key={index} user={user} />
      ))}
    </div>
  );
}
