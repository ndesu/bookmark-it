"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../lib/firebase";

const db = getFirestore(firebaseApp);

const databaseContext = createContext({
  users: [],
  books: [],
  fetchBooksByUserEmail: async () => [],
  fetchUserByEmail: async () => [],
  addBook: async () => {},
  addUser: async () => {},
  updateBookRankings: async () => {},
});

export function DatabaseProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    setUsers(usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchUserByEmail = async (email) => {
    const usersQuery = query(collection(db, "users"), where("Email", "==", email));
    const usersSnapshot = await getDocs(usersQuery);
    if (!usersSnapshot.empty) {
      return usersSnapshot.docs[0].data();
    } else {
      return null;
    }
  }

  const addUser = async (user) => {
    const usersCollection = collection(db, "users");
    const newUserRef = await addDoc(usersCollection, user);
    return { id: newUserRef.id, ...user }
  }

  const fetchBooks = async () => {
    const booksCollection = collection(db, "books");
    const booksSnapshot = await getDocs(booksCollection);
    setBooks(booksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchBooksByUserEmail = async (email) => {
    const booksQuery = query(collection(db, "books"), where("userEmail", "==", email));
    const booksSnapshot = await getDocs(booksQuery);
    return booksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const addBook = async (book) => {
    const booksCollection = collection(db, "books");
    const newBookRef = await addDoc(booksCollection, book);
    return { id: newBookRef.id, ...book };
  };

  const updateBookRankings = async (updatedBooks) => {
    const updatePromises = updatedBooks.map((book) => {
      const bookDocRef = doc(db, "books", book.id);
      return updateDoc(bookDocRef, { Ranking: book.Ranking });
    });
    await Promise.all(updatePromises);
  };

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  return (
    <databaseContext.Provider
      value={{
        users,
        books,
        fetchBooksByUserEmail,
        fetchUserByEmail,
        addBook,
        addUser,
        updateBookRankings
      }}
    >
      {children}
    </databaseContext.Provider>
  );
}


export const useDatabase = () => useContext(databaseContext);
