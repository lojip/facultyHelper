const PROCENT_MAX = 80.0;
let MAX_LENGTH_QUESTIONS;


export const startQuiz = (setQuestions, fetchData) => {
	// Проверка наличия данных о профилях
	if (!fetchData) {
		console.error('Faculties data is not available.');
		return;
	}

	// Сохраняем факультеты в localStorage
	MAX_LENGTH_QUESTIONS = fetchData[0].questions.length + 1;
	localStorage.setItem('faculties', JSON.stringify(fetchData));
	selectRandomQuestion(setQuestions);
};



const randomIndex = (ratio) => {
	return Math.floor(Math.random() * ratio);
}


const selectRandomQuestion = (setQuestions) => {
	localStorage.removeItem('removedFaculties');
	let facultiesData = localStorage.getItem('faculties');
	if (!facultiesData) {
		console.error('Faculties data is not available in localStorage.');
		return;
	}
	let faculties = JSON.parse(facultiesData);

	// Выбираем случайный профиль
	const randomProfile = faculties[randomIndex(faculties.length)];

	// Проверка наличия вопросов в профиле
	if (!randomProfile.questions || randomProfile.questions.length === 0) {
		console.error('No questions available for the selected profile.');
		return;
	}

	// Выбираем случайный вопрос
	const questionIndex = randomIndex(randomProfile.questions.length);
	const newQuestion = randomProfile.questions[questionIndex];
	setQuestions(newQuestion);

	// Удаление выбранного вопроса из всех профилей
	const updatedFaculties = faculties.map(faculty => ({
		...faculty,
		questions: faculty.questions.filter(question => question !== newQuestion)
	}));

	// Получаем или создаем объект для хранения факультетов, которые "выкинулись"
	let removedFacultiesData = localStorage.getItem('removedFaculties');
	removedFacultiesData = removedFacultiesData ? JSON.parse(removedFacultiesData) : [];

	// Добавляем текущий профиль в список "выкинутых" факультетов, если у него был удален вопрос
	const facultiesWithRemovedQuestion = faculties.filter(faculty =>
		faculty.questions.includes(newQuestion)
	);

	// Обновляем и сохраняем "выкинутые" факультеты в localStorage
	removedFacultiesData = [...removedFacultiesData, ...facultiesWithRemovedQuestion];
	localStorage.setItem('removedFaculties', JSON.stringify(removedFacultiesData));

	// Сохраняем обновленные факультеты в localStorage
	localStorage.setItem('faculties', JSON.stringify(updatedFaculties));
};



const checkQuestion = (numberQuestion, setProcent) => {
	// Получаем данные из localStorage
	let faculties = localStorage.getItem('faculties');
	let removedFaculties = localStorage.getItem('removedFaculties');
	if (!faculties || !removedFaculties) {
		console.error('Data is not available in localStorage.');
		return;
	}
	faculties = JSON.parse(faculties);
	removedFaculties = JSON.parse(removedFaculties);

	faculties.forEach(faculty => {
		// Ищем кафедру с тем же id в removedFacultiesData
		const removedFaculty = removedFaculties.find(removed => removed.department === faculty.department);

		// Если кафедра найдена, изменяем один из параметров
		if (removedFaculty) {
			faculty.percent += Math.ceil((100 / (MAX_LENGTH_QUESTIONS)) / 3 * numberQuestion);
		}
	});

	// Обновляем данные факультетов в localStorage
	localStorage.removeItem('removedFaculties');
	localStorage.setItem('faculties', JSON.stringify(faculties));
	findFavoriteDish(setProcent);
};



// Проверка на завершение 
const examinationQuestion = (setResult, setIsResult, setProcent) => {
	let facultiesData = localStorage.getItem('faculties');
	if (!facultiesData) {
		console.error('Faculties data is not available in localStorage.');
		return;
	}
	facultiesData = JSON.parse(facultiesData);
	facultiesData = facultiesData.sort((a, b) => b.percent - a.percent);
	localStorage.setItem('faculties', JSON.stringify(facultiesData));

	for (const faculty of facultiesData) {
		if (faculty.percent >= PROCENT_MAX) {
			setProcent(100);
			localStorage.removeItem('removedFaculties');
			setTimeout(() => {
				setResult(`${faculty.department}`);
				setIsResult(true)
			}, 400)
		}
	}
};



// Новый вопрос
export const newQuestion = (setQuestions, numberQuestion, setProcent, setResult, setIsResult) => {
	let facultiesData = localStorage.getItem('faculties');
	if (!facultiesData) {
		console.error('Faculties data is not available in localStorage.');
		return;
	}
	facultiesData = JSON.parse(facultiesData);


	checkQuestion(numberQuestion, setProcent);
	examinationQuestion(setResult, setIsResult, setProcent);
	selectRandomQuestion(setQuestions);
};



// Прогресс бар
const findFavoriteDish = (setProcent) => {
	let facultiesData = localStorage.getItem('faculties');
	if (!facultiesData) {
		console.error('Faculties data is not available in localStorage.');
		return;
	}
	facultiesData = JSON.parse(facultiesData);

	const favoriteDish = facultiesData.reduce((maxDish, currentDish) => {
		return currentDish.percent > maxDish.percent ? currentDish : maxDish;
	});

	console.log(favoriteDish.percent);
	setProcent(favoriteDish.percent);
};



// попробовать снова
export const newQuizFull = (setIsResult, setProcent, setQuestions, data) => {
	localStorage.setItem('faculties', JSON.stringify(data));
	setIsResult(false);
	setProcent(0);
	setQuestions('');
	startQuiz(setQuestions, data);
};