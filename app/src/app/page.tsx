'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";

interface Book {
  id: string
  title: string;
  author: string;
}

interface Form {
  title: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Form>({
    title: ""
  });
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const callAPI = async (title: string = "") => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify({ title: title })
      });
      if (response.ok) {
        const res = await response.json();
        console.log("Response from API:", res);

        if (res.books.books && res.books.books.data) {
          setBooks(res.books.books.data);
        }
      }
    } catch (e) {
      console.error("Erro de fetch:", e);
    }
  };

  useEffect(() => {
    callAPI();
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      callAPI(value);
    }, 500);

    setTypingTimeout(timeout);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        BookVault
      </div>
      <div className={styles.main}>
        <div className={styles.search}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="Busque" />
          <a href="/new-book" className={styles.newBook}>Novo livro</a>
        </div>
        <div className={styles.books}>
          {books.map((item, index) => {
            return (
              <Card item={item} key={index}></Card>
            )
          })
          }
        </div>
      </div>
    </div>
  );
}
