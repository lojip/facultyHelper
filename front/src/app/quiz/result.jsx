import styles from '../../assets/style/quiz/quiz.module.scss';
import { newQuizFull } from '../../components/quizComponents/quizLogic.jsx'
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';


export const Result = ({ result, setIsResult, setPercentBar, setQuestions, data }) => {
	return (
		<main className={styles.main}>
			<AnimatePresence>
				<motion.div
					className={styles.container}
					initial={{ opacity: 0, scale: 0.9 }} // Начальное состояние контейнера
					animate={{ opacity: 1, scale: 1 }} // Конечное состояние контейнера
					exit={{ opacity: 0, scale: 0.9 }} // Состояние при выходе
					transition={{ duration: 0.5 }} // Длительность анимации контейнера
				>
					<div className={styles.containerQuizwrapper}>
						<h2 className={styles.qestionHeaderResult}>Вам подойдет данный профиль:</h2>
					</div>
					<div className={styles.qestionIsResult}>
						<h1>{result}</h1>
					</div>
					<div className={styles.containerButton}>
						<a
							className={styles.containerButtonLink}
							onClick={() => newQuizFull(setIsResult, setPercentBar, setQuestions, data)}
						>
							Пройти ещё раз
						</a>
						<Link href={`/`}
							className={styles.containerButtonLink}>
							главная
						</Link>
					</div>
				</motion.div>
			</AnimatePresence>
		</main>
	)
}