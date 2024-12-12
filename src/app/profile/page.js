"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthUserContext";
import { useDatabase } from "../context/DatabaseContext";
import styles from "../page.module.css"

export default function Profile() {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [formPosition, setFormPosition] = useState(null);
    const [newBook, setNewBook] = useState({ title: "", genre: "", comments: "" });

    const { authUser } = useAuth();
    const router = useRouter();
    const { fetchUserByEmail, fetchBooksByUserEmail, addBook, updateBookRankings } = useDatabase();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleAddBook = async (index) => {
        let newRanking;

        if (index === -1) {
            newRanking = 1;
        } else {
            const bookToAddAfter = books[index] || { Ranking: 0 };
            newRanking = bookToAddAfter.Ranking + 1;
        }

        const addedBook = await addBook({
            Title: newBook.title,
            Genre: newBook.genre,
            Comments: newBook.comments,
            Ranking: newRanking,
            userEmail: authUser.email,
        });

        const updatedBooks = books.map((book) => {
            if (book.Ranking >= newRanking) {
                return { ...book, Ranking: book.Ranking + 1 };
            }
            return book;
        });

        if (index === -1) {
            updatedBooks.unshift(addedBook);
        } else {
            updatedBooks.splice(index + 1, 0, addedBook);
        }

        await updateBookRankings(updatedBooks.filter((book) => book.Ranking > newRanking));

        setBooks(updatedBooks);
        setFormVisible(false);
        setNewBook({ 
            title: "", 
            genre: "", 
            comments: "" 
        });
    };

    useEffect(() => {
        if (!authUser) router.push("/login");

        const getUser = async () => {
            const thisUser = await fetchUserByEmail(authUser.email);
            setUser(thisUser);
        };

        const getUserBooks = async () => {
            const userBooks = await fetchBooksByUserEmail(authUser.email);
            userBooks.sort((a, b) => a.Ranking - b.Ranking);
            setBooks(userBooks);
        };

        getUser();
        getUserBooks();
    }, [authUser, fetchUserByEmail, fetchBooksByUserEmail]);

    return (
        <div className={styles.profileContainer}>
            <h1>Hello {user?.Name}!</h1>
            <div className={styles.numberBooks}>
                {books.length === 1 ? (
                    <p>You have 1 book ranked</p>
                ) : (
                    <p>You have {books.length} books ranked</p>
                )}
            </div>
            <div className={styles.list}>
                <>
                    {books.length > 0 && (
                        <button className={styles.addButton} onClick={() => { setFormVisible(true); setFormPosition(-1); }}>
                            Add A Book!
                        </button>
                    )}
                </>

                {books.length > 0 ? (
                    books.map((book, index) => (
                        <>
                        <div className={styles.bookListing} key={index}>
                            <p className={styles.bookTitle}>{book.Ranking}. {book.Title}</p>
                            <p>Genre: {book.Genre}</p>
                            <p>Comments: {book.Comments}</p>
                        </div>
                        <button className={styles.addButton} onClick={() => { setFormVisible(true); setFormPosition(index); }}>Add A Book!</button>
                        </>
                    ))
                ) : (
                    <button className={styles.addButton} onClick={() => { setFormVisible(true); setFormPosition(-1); }}>Add Your First Book!</button>
                )}

                {formVisible && (
                    <div className={styles.addBookFormContainer}>
                        <h2>Add A New Book</h2>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddBook(formPosition);
                            }}
                        >
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Genre:
                                <input
                                    type="text"
                                    name="genre"
                                    value={newBook.genre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Comments:
                                <textarea
                                    name="comments"
                                    value={newBook.comments}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
            
        </div>
    );
}
