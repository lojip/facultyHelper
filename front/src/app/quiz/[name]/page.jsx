"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../../assets/style/quiz/quiz.module.scss';
import Spinner from '@/components/spinner/spinner';
import NotFound from '@/app/not-found';
import { startQuiz, newQuestion } from '@/components/quizComponents/quizLogic';
import { Result } from './result.jsx';

export default function QuizPage() {
	const { name } = useParams();
	const [data, setData] = useState(null);
	const [load, setLoad] = useState(true);
	const [pushNotFound, setPushNotFound] = useState(false);
	const [question, setQuestions] = useState(null);
	const [isResult, setIsResult] = useState(false);
	const [result, setResult] = useState(null);
	const [procentBar, setProcentBar] = useState(0);
	const [newInfo, setNewInfo] = useState(false);
	const [startNewQuiz, setStartNewQuiz] = useState(false);


	useEffect(() => {
		async function loadData() {
			try {
				const response = await fetch(`http://127.0.0.1:5000/collectionOnName?nameColl=${name}`);
				if (!response.ok) {
					return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 });
				}

				const data = await response.json();
				if (data.length < 1) {
					setLoad(false);
					return setPushNotFound(true);
				}

				startQuiz(setQuestions, data)
				setData(data);
			} catch (error) {
				console.error('Ошибка:', error);
				setPushNotFound(true)
			} finally {
				setLoad(false)
			}

		}

		loadData();
	}, [name]);


	if (pushNotFound) {
		return (<NotFound />)
	}

	if (isResult) {
		return (<Result result={result} setIsResult={setIsResult} setProcentBar={setProcentBar} setQuestions={setQuestions} setStartNewQuiz={setStartNewQuiz} data={data} />)
	}

	const number = [
		{ num: 5, text: 'Очень подходит, сильно', custom: 1 },
		{ num: 4, text: "Подходит, нормально", custom: 2 },
		{ num: 3, text: "Средне(ние)", custom: 3 },
		{ num: 2, text: "Не подходит, ниже среднего", custom: 4 },
		{ num: 1, text: 'Вообще не подходит, плохо', custom: 5 }
	];

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				{load ? (
					<Spinner />
				) : (
					<>
						<div className={styles.containerQuiz}>
							<div className={styles.progress}>
								<div style={{ width: `${procentBar}%` }} className={styles.progress__inner}></div>
							</div>
							<div>
								<div className={styles.containerQuizWrapper}>
									<h2 className={styles.qestionHeader}>{question}</h2>
								</div>
								<ul className={styles.ul}>
									{number.map(({ num, text }) => (
										<li
											key={num}
											onClick={() => newQuestion(setQuestions, num, question, setProcentBar, setResult, setIsResult)}
										>
											{num} - {text}
										</li>
									))}
								</ul>

							</div>
						</div>
					</>
				)}

			</div>
		</main>
	);
}