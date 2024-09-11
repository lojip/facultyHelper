"use client";

import Link from 'next/link'
import styles from '../../assets/style/quiz/quiz.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner/spinner';
import NotFound from '@/app/not-found';

export default function page() {
    const [fetchData, setFetchData] = useState(null);
    const [load, setLoad] = useState(true);
    const [pushNotFound, setPushNotFound] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/universities")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setFetchData(data);
                setLoad(false);
            })
            .catch(error => {
                setPushNotFound(true);
                console.error('Ошибка:', error);
                setLoad(false);
            });
    }, []);

    if (pushNotFound) {
        return (<NotFound />)
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {load ? (
                    <div className={styles.spinnerContainer}>
                        <Spinner />
                    </div>
                ) : (
                    fetchData.map((department, index) => (
                        <section className={styles.sectionVuzItem} key={index}>
                            <div className={styles.containerNewQuiz}>
                                <div className={styles.logo}>
                                    <Image src={`http://127.0.0.1:5000/${department.urlImg}`} alt="logo university" width={200} height={200} priority />
                                </div>
                                <div className={styles.wrapper}>
                                    <div className={styles.description}>
                                        <h2>{department.fullName}</h2>
                                        <a href={department.url} target="_blank" rel="noopener noreferrer">
                                            <p>Узнать о вузе</p>
                                        </a>
                                    </div>
                                    <div className={styles.containerButton}>
                                        <Link href={`/quiz/${department.name}`} className={styles.containerButtonLink}>
                                            Пройти тест
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))
                )}
            </div>
        </main >
    )
}