import styles from '../../../assets/style/quiz/quiz.module.scss';
import { newQuizFull } from '../../../components/quizComponents/quizLogic.jsx'
import Link from 'next/link';



export const Result = ({ result, setIsResult, setProcentBar, setQuestions, setStartNewQuiz, data }) => {
	return (
		<>
			<main className={styles.main}>
				<div className={styles.container}>
					<div className={styles.containerQuizwrapper}>
						<h2 className={styles.qestionHeaderResult}>Вам подойдет данная кафедра:</h2>
					</div>
					<div className={styles.qestionIsResult}>
						<h1>{result}</h1>
					</div>
					<div className={styles.containerButton}>
						<a
							className={styles.containerButtonLink}
							onClick={() => newQuizFull(setIsResult, setProcentBar, setQuestions, setStartNewQuiz, data)}
						>
							Пройти ещё раз
						</a>
						<Link href={`/quiz`}
							className={styles.containerButtonLink}>
							Другие тесты
						</Link>
					</div>
				</div>
			</main>
		</>
	)
}