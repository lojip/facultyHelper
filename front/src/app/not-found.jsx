import styles from '../assets/style/notFound.module.scss'

export default function notFound() {
    return (
        <main className={styles.main}>
            <h1>
                404
            </h1>
            <h2>
                Страница не найдена
            </h2>
        </main>
    )
}