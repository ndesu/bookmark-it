"use client"
import { useEffect, useState } from "react"
import { useDatabase } from "../context/DatabaseContext"
import styles from "../page.module.css"

export default function ViewUserCard({user}) {
    const [books, setBooks] = useState(null)
    const [listToggle, setListToggle] = useState(false)
    const {fetchBooksByUserEmail} = useDatabase();

    const cardClick = () => {
        setListToggle(!listToggle)
    }

    useEffect(() => {
        const getUserBooks = async () => {
            const userBooks = await fetchBooksByUserEmail(user.Email)
            userBooks.sort((a,b) => a.Ranking - b.Ranking)
            setBooks(userBooks)
        }

        getUserBooks();
    }, [user.Email, fetchBooksByUserEmail])

    return(
        <div className={styles.cardContainer} onClick={cardClick}>
            <h1>{user.Name}</h1>
            {books?.length == 1 ? <p>1 book ranked!</p> : <p>{books?.length} books ranked!</p>}
            {listToggle && books.length > 0 && (
                <ul className={styles.bookRankings}>
                {books.map((book, index) => (
                    <li key={index}>
                    {book.Ranking}. {book.Title}
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}