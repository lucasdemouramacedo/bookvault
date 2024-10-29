'use client'
import styles from "./page.module.css";
import { use, useEffect, useState } from "react";
import Notification from "@/components/Notification/Notification";
import { redirect } from 'next/navigation'
import Image from "next/image";
import logo from "../../../../public/image.png";

interface Book {
    title?: string
    author?: string
    description?: string
    published_date?: string
    isbn?: string
}

interface Props {
    params: Promise<{ id: string }>
}

export default function EditBook({ params }: Props) {
    const { id } = use(params);
    const [book, setBook] = useState<Book>();
    const [notification, setNotification] = useState(false)
    const [notificationInfo, setNotificationInfo] = useState({ type: '', message: '' })

    const getBook = async () => {
        try {
            const response = await fetch("/api/books/book", {
                method: "POST",
                body: JSON.stringify({ id: id })
            });
            if (response.ok) {
                const res = await response.json();
                console.log("Response from API:", res);

                if (res.book.book) {
                    setBook(res.book.book);
                } else {
                    setNotification(true);
                    setNotificationInfo({
                        type: 'warn',
                        message: res.book.error.message
                    })
                    setTimeout(() => {
                        setNotification(false);
                        redirect("/")
                    }, 3000);
                }
            }
        } catch (e) {
            console.error("Erro de fetch:", e);
        }
    };

    useEffect(() => {
        getBook();
    }, [])

    const handleDelete = async () => {
        try {
            const response = await fetch("/api/books/delete", {
                method: "POST",
                body: JSON.stringify({ id: id })
            });
            if (response.ok) {
                const res = await response.json();
                console.log("Response from API:", res);

                if (res.book.book) {
                    setNotification(true);
                    setNotificationInfo({
                        type: 'indo',
                        message: res.data.message
                    })
                    setTimeout(() => {
                        setNotification(false);
                        redirect("/")
                    }, 3000);
                } else {
                    setNotification(true);
                    setNotificationInfo({
                        type: 'warn',
                        message: res.data.error.message
                    })
                    setTimeout(() => {
                        setNotification(false);
                        redirect("/")
                    }, 3000);
                }
            }
        } catch (e) {
            console.error("Erro de fetch:", e);
        }
    };


    return (
        <div className={styles.page}>
            {
                book ?
                    <>
                        <div className={styles.header}>
                            BookVault
                        </div>
                        <div className={styles.main}>
                            <div className={styles.title}>
                                Detalhes do livro
                                <div className={styles.actions}>
                                    <a href={"/edit-book/" + id} className={styles.newBook}>Editar</a>
                                    <a onClick={handleDelete} className={styles.delete}>Deletar</a>
                                </div>
                            </div>
                            <div className={styles.container}>
                                <div className={styles.img}>
                                    <Image alt="" src={logo} />
                                </div>
                                <p className={styles.bookTitle}>
                                    {book.title}
                                </p>
                                <p className={styles.bookAuthor}>
                                    {book.author}
                                </p>
                                <p className={styles.published_date}>
                                    <label className={styles.label}>Data de publicação: </label>
                                    {book.published_date}
                                </p>
                                <p className={styles.isbn}>
                                    <label className={styles.label}>ISBN: </label>
                                    {book.isbn}
                                </p>
                                <p className={styles.description}>
                                    <label className={styles.label}>Descrição: </label>
                                    {book.description}
                                </p>
                            </div>
                        </div>
                    </>
                    : null
            }
            <Notification visible={notification} type={notificationInfo.type} message={notificationInfo.message}></Notification>
        </div>
    );
}