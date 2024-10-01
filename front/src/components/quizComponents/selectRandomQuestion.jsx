import { removeFromLocalStorage, getFromLocalStorage } from './localStorageLogic.jsx';


const randomIndex = (ratio) => {
	return Math.floor(Math.random() * ratio);
}


export const selectRandomQuestion = (setQuestions) => {
	removeFromLocalStorage('removedFaculties')
	const faculties = getFromLocalStorage('faculties')

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