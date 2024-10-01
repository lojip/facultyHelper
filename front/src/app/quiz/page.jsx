'use client';

import { useEffect, useState } from 'react';
import styles from '../../assets/style/quiz/quiz.module.scss';
import Spinner from '@/components/spinner/spinner';
import NotFound from '@/app/not-found';
import { startQuiz, newQuestion } from '@/components/quizComponents/quizLogic';
import { Result } from './result.jsx';
import { updatingThePage, handleOptionClick } from '@/components/quizComponents/uiLogic';
import { fetchUrl } from '@/components/fetchComponents/fetchComponent.jsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function QuizPage() {
	const [data, setData] = useState(null);
	const [load, setLoad] = useState(true);
	const [pushNotFound, setPushNotFound] = useState(false);
	const [question, setQuestions] = useState(null);
	const [isResult, setIsResult] = useState(false);
	const [result, setResult] = useState(null);
	const [percentBar, setPercentBar] = useState(0);
	const [isDirty, setIsDirty] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		updatingThePage(isDirty);
	}, [isDirty]);

	useEffect(() => {
		async function loadData() {
			try {
				const response = await fetch(`${fetchUrl}/collectionOnName?nameColl=profiles`);
				if (!response.ok) return setPushNotFound(true);

				const data = await response.json();
				if (data.length < 1) return setPushNotFound(true);

				startQuiz(setQuestions, data);
				setData(data);
			} catch (error) {
				console.error('Ошибка:', error);
				setPushNotFound(true);
			} finally {
				setLoad(false);
			}
		}

		loadData();
	}, []);

	const handleNextQuestion = (num) => {
		setIsDisabled(true); // блокируем кнопки

		setTimeout(() => {
			handleOptionClick(num, dataFromNewQuestion);
		}, 400); // Задержка для анимации
	};

	if (load) {
		return (
			<main className={styles.main}>
				<Spinner />
			</main>
		);
	}

	if (pushNotFound) {
		return <NotFound />;
	}

	if (isResult) {
		return (
			<Result
				result={result}
				setIsResult={setIsResult}
				setPercentBar={setPercentBar}
				setQuestions={setQuestions}
				data={data}
			/>
		);
	}

	const number = [
		{ num: 5, text: 'Очень подходит, сильно', custom: 1 },
		{ num: 4, text: 'Подходит, нормально', custom: 2 },
		{ num: 3, text: 'Средне(ние)', custom: 3 },
		{ num: 2, text: 'Не подходит, ниже среднего', custom: 4 },
		{ num: 1, text: 'Вообще не подходит, плохо', custom: 5 },
	];

	const dataFromNewQuestion = {
		setIsDisabled,
		setIsDirty,
		newQuestion,
		setQuestions,
		setPercentBar,
		setResult,
		setIsResult,
	};

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
					<div className={styles.containerQuiz}>
						<div className={styles.progress}>
							<div
								style={{ width: `${percentBar}%` }}
								className={styles.progress__inner}
								initial={{ scaleX: 0 }} // Начальное состояние прогресс-бара
								animate={{ scaleX: 1 }} // Конечное состояние прогресс-бара
								transition={{ duration: 0.5 }} // Длительность анимации прогресс-бара
							></div>
						</div>
						<div>
							<motion.div
								className={styles.containerQuizWrapper}
								key={question}
								initial={{ opacity: 0, y: 10 }}
								animate={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									y: {
										duration: 0.4,
										ease: "easeInOut",
									},
								}}
							>
								<h2 className={styles.qestionHeader}>{question}</h2>
							</motion.div>
							<ul className={styles.ul}>
								{number.map(({ num, text }) => (
									<motion.li
										key={num}
										onClick={() => handleNextQuestion(num)}
										initial={{ opacity: 1, y: 0 }}
										animate={{ opacity: isDisabled ? 0.8 : 1, y: 0 }}
										transition={{ duration: 0.2 }}
										style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
									>
										{num} - {text}
									</motion.li>
								))}
							</ul>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</main >
	);
}