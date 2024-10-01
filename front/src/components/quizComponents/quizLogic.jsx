import { selectRandomQuestion } from './selectRandomQuestion.jsx'
import { addToLocalStorage, removeFromLocalStorage, getFromLocalStorage } from './localStorageLogic.jsx';

const PERCENT_MAX = 80.0;
let MAX_LENGTH_QUESTIONS;

export const startQuiz = (setQuestions, fetchData) => {
	// Проверка наличия данных о профилях
	if (!fetchData) {
		console.error('Faculties data is not available.');
		return;
	}

	MAX_LENGTH_QUESTIONS = fetchData[0].questions.length + 1;

	// Сохраняем факультеты в localStorage
	addToLocalStorage('faculties', fetchData)
	selectRandomQuestion(setQuestions);
};


const checkQuestion = (numberQuestion, setPercent) => {
	// Получаем данные из localStorage
	const faculties = getFromLocalStorage('faculties');
	const removedFaculties = getFromLocalStorage('removedFaculties');

	faculties.forEach(faculty => {
		// Ищем кафедру с тем же id в removedFacultiesData
		const removedFaculty = removedFaculties.find(removed => removed.department === faculty.department);

		// Если кафедра найдена, изменяем один из параметров
		if (removedFaculty) {
			faculty.percent += Math.ceil((100 / (MAX_LENGTH_QUESTIONS)) / 4 * numberQuestion);
		}
	});

	// Обновляем данные факультетов в localStorage
	addToLocalStorage('faculties', faculties)
	findFavoriteDish(setPercent);
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
	checkQuestion(numberQuestion, data.setPercentBar);
	examinationQuestion(data.setResult, data.setIsResult, data.setPercentBar);
	selectRandomQuestion(data.setQuestions);
};



// Прогресс бар
const findFavoriteDish = (setPercent) => {
	const facultiesData = getFromLocalStorage('faculties')
	const favoriteDish = facultiesData.reduce((maxDish, currentDish) => {
		return currentDish.percent > maxDish.percent ? currentDish : maxDish;
	});

	console.log(favoriteDish.percent);
	setPercent(favoriteDish.percent);
};



// попробовать снова
export const newQuizFull = (setIsResult, setPercent, setQuestions, data) => {
	addToLocalStorage('faculties', data)
	setIsResult(false);
	setPercent(0);
	setQuestions('');
	startQuiz(setQuestions, data);
};