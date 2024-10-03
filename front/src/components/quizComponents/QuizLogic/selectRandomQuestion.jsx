import { addToLocalStorage, removeFromLocalStorage, getFromLocalStorage } from './localStorageLogic.jsx';


const randomIndex = (ratio) => {
	return Math.floor(Math.random() * ratio);
}

const newProfileAndQuestions = (setQuestions, faculties) => {
	removeFromLocalStorage('removedFaculties')
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

	// Добавляем текущий профиль в список "выкинутых" факультетов, если у него был удален вопрос
	const facultiesWithRemovedQuestion = faculties.filter(faculty =>
		faculty.questions.includes(newQuestion)
	);

	// Обновляем removedFacultiesData, добавляя три фиксированных поля
	const updatedRemovedFaculties = facultiesWithRemovedQuestion.map(faculty => {
		return {
			...faculty,
			lowRange: 0,
			midRange: 0,
			highRange: 0
		};
	});

	// Обновляем и сохраняем "выкинутые" факультеты в localStorage
	addToLocalStorage('removedFaculties', updatedRemovedFaculties);

	// Сохраняем обновленные факультеты в localStorage
	addToLocalStorage('faculties', updatedFaculties);
}


// Если уже был задан вопрос

const choiceSubjectToCondition = (removedFaculties, faculties, setQuestions, MAX_LENGTH_QUESTIONS) => {
	const meaningForThrowingAway = Math.floor(MAX_LENGTH_QUESTIONS / 2.5);

	removedFaculties.forEach(faculty => {
		if (faculty.lowRange === meaningForThrowingAway) return choiceLowRange(removedFaculties, faculties, setQuestions)
		// if (faculty.midRange !== 0) choiceMidRange(faculty) 

		choiceHighRange(removedFaculties, setQuestions)
	})
}

const choiceLowRange = (removedFaculties, faculties, setQuestions,) => {
	const updatedFaculties = faculties.filter(item =>
		!removedFaculties.some(removed => removed.department === item.department)
	);

	addToLocalStorage('faculties', updatedFaculties);
	newProfileAndQuestions(setQuestions, updatedFaculties);
}

// const choiceMidRange = (faculty) => {
// 	console.log(`midRange = ${faculty.midRange}`)
// }

const choiceHighRange = (removedFaculties, setQuestions) => {
	const randomProfile = removedFaculties[randomIndex(removedFaculties.length)];

	// Проверка наличия вопросов в профиле
	if (!randomProfile.questions || randomProfile.questions.length === 0) {
		console.error('No questions available for the selected profile.');
		return;
	}

	// Выбираем случайный вопрос
	const questionIndex = randomIndex(randomProfile.questions.length);
	const newQuestion = randomProfile.questions[questionIndex];
	setQuestions(newQuestion);

	const updatedRemovedFaculties = removedFaculties.map(faculty => ({
		...faculty,
		questions: faculty.questions.filter(question => question !== newQuestion)
	}));

	return addToLocalStorage('removedFaculties', updatedRemovedFaculties);
}



export const selectRandomQuestion = (setQuestions, MAX_LENGTH_QUESTIONS) => {
	const removedFaculties = getFromLocalStorage('removedFaculties');
	const faculties = getFromLocalStorage('faculties')

	// Если у нас уже есть выбранный профиль прокидываем его через условие
	if (!Array.isArray(removedFaculties) || removedFaculties.length !== 0) {
		return choiceSubjectToCondition(removedFaculties, faculties, setQuestions, MAX_LENGTH_QUESTIONS);
	}

	newProfileAndQuestions(setQuestions, faculties)
};
