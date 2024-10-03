import { selectRandomQuestion } from './selectRandomQuestion.jsx'
import { addToLocalStorage, removeFromLocalStorage, getFromLocalStorage } from './localStorageLogic.jsx';
import { checkQuestion } from './checkQuestion.jsx';

const PERCENT_MAX = 80.0;
let MAX_LENGTH_QUESTIONS;

export const startQuiz = (setQuestions, fetchData) => {
	// Обнуляем локальное хранилище
	removeFromLocalStorage('removedFaculties')

	// Проверка наличия данных о профилях
	if (!fetchData) {
		console.error('Faculties data is not available.');
		return;
	}

	MAX_LENGTH_QUESTIONS = fetchData[0].questions.length;

	// Сохраняем факультеты в localStorage

	addToLocalStorage('faculties', fetchData)
	selectRandomQuestion(setQuestions);
};


// Проверка на завершение 
const examinationQuestion = (setResult, setIsResult, setPercent) => {
	let facultiesData = getFromLocalStorage('faculties');

	facultiesData = facultiesData.sort((a, b) => b.percent - a.percent);
	addToLocalStorage('faculties', facultiesData)

	for (const faculty of facultiesData) {
		if (faculty.percent >= PERCENT_MAX) {
			setPercent(100);
			removeFromLocalStorage('removedFaculties')
			setTimeout(() => {
				setResult(`${faculty.department}`);
				setIsResult(true)
			}, 400)
		}
	}
};

// Новый вопрос
export const newQuestion = (numberQuestion, data) => {
	checkQuestion(numberQuestion, data.setPercentBar, MAX_LENGTH_QUESTIONS);
	examinationQuestion(data.setResult, data.setIsResult, data.setPercentBar);
	selectRandomQuestion(data.setQuestions, MAX_LENGTH_QUESTIONS);
};


// попробовать снова
export const newQuizFull = (setIsResult, setPercent, setQuestions, data) => {
	addToLocalStorage('faculties', data)
	setIsResult(false);
	setPercent(0);
	setQuestions('');
	startQuiz(setQuestions, data);
};