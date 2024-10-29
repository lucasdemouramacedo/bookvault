'use client'
import styles from "./page.module.css";
import { use, useEffect, useState } from "react";
import Notification from "@/components/Notification/Notification";
import { redirect } from 'next/navigation'

interface Form {
    title?: string
    author?: string
    description?: string
    published_date?: string
    isbn?: string
}

interface Error {
    title: string
    author: string
    description: string
    published_date: string
    isbn: string
}

interface Props {
    params: Promise<{ id: string }>
}

export default function EditBook({ params }: Props) {
    const { id } = use(params);
    const [form, setForm] = useState<Form>();
    const [error, setError] = useState<Error>({
        title: "",
        author: "",
        description: "",
        published_date: "",
        isbn: "",
    });

    const [notification, setNotification] = useState(false)
    const [notificationInfo, setNotificationInfo] = useState({ type: '', message: '' })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    useEffect(() => {
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
                        setForm(res.book.book);
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
        getBook();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/books/edit", {
                method: "POST",
                body: JSON.stringify({ form: form, id: id })
            });
            if (response.ok) {
                const res = await response.json();
                console.log("Response from API:", res);

                if (res.data.error) {
                    setError(res.data.error.details)
                    setNotification(true);
                    setNotificationInfo({
                        type: 'warn',
                        message: res.data.error.message
                    })
                    setTimeout(() => {
                        setNotification(false);
                    }, 3000);
                } else {
                    setNotification(true);
                    setNotificationInfo({
                        type: 'info',
                        message: res.data.message
                    })
                    setError({
                        title: "",
                        author: "",
                        description: "",
                        published_date: "",
                        isbn: "",
                    })
                    setTimeout(() => {
                        setNotification(false);
                        redirect("/details-book/" + id)
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
                form ?
                    <>
                        <div className={styles.header}>
                            BookVault
                        </div>
                        <div className={styles.main}>
                            <div className={styles.title}>
                                Editar livro
                            </div>
                            <form onSubmit={handleSubmit} className={styles.container}>
                                <div className="field">
                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Título do livro"
                                        className={styles.input} />
                                    <p className={styles.error}>{error?.title}</p>
                                </div>

                                <div className="field">
                                    <input
                                        name="author"
                                        value={form.author}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Autor do livro"
                                        className={styles.input} />
                                    <p className={styles.error}>{error.author}</p>
                                </div>
                                <div className="field">
                                    <input
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Descrição"
                                        className={styles.input} />
                                    <p className={styles.error}>{error.description}</p>
                                </div>
                                <div className="field">
                                    <input
                                        name="published_date"
                                        value={form.published_date}
                                        onChange={handleChange}
                                        type="date"
                                        placeholder="Data de publicação"
                                        className={styles.input} />
                                    <p className={styles.error}>{error.published_date}</p>
                                </div>
                                <div className="field">
                                    <input
                                        name="isbn"
                                        value={form.isbn}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="ISBN"
                                        className={styles.input} />
                                    <p className={styles.error}>{error.isbn}</p>
                                </div>
                                <button type="submit" className={styles.newBook}>Salvar livro</button>
                            </form>
                        </div>
                    </>
                    : null
            }
            <Notification visible={notification} type={notificationInfo.type} message={notificationInfo.message}></Notification>
        </div>
    );
}