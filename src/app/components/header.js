"use client"
import Link from "next/link";
import styles from "../page.module.css"
import { useAuth } from "../context/AuthUserContext";

export default function Header() {
    const { signOut, authUser } = useAuth();

    return (
        <header className={styles.headerWrapper}>
        <nav>
            <h1>Bookmark It!</h1>
            <ul>
            {authUser && (
                <>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/profile">My Profile</Link>
                </li>
                <li>
                    <a className={styles.logout} onClick={signOut}>
                    Log Out
                    </a>
                </li>
                </>
            )}
            {!authUser && (
                <>
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/create">Create User</Link>
                </li>
                </>
            )}
            </ul>
        </nav>
        </header>
  );
}