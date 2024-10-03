import { addToLocalStorage, removeFromLocalStorage, getFromLocalStorage } from './localStorageLogic.jsx';

export const checkQuestion = (numberQuestion, setPercent, MAX_LENGTH_QUESTIONS) => {
	// Получаем данные из localStorage
	const faculties = getFromLocalStorage('faculties') || {};
	const removedFaculties = getFromLocalStorage('removedFaculties')

	removedFaculties.forEach(faculty => {
		switch (numberQuestion) {
			case 1:
			case 2:
				faculty.lowRange += 1
				break
			case 3:
				faculty.midRange += 1
				break
			case 4:
			case 5:
				faculty.highRange += 1
				break
			default:
				console.error("Ошибка")
		}
	})

	faculties.forEach(faculty => {
		// Ищем кафедру с тем же id в removedFacultiesData
		const removedFaculty = removedFaculties.find(removed => removed.department === faculty.department);

		// Если кафедра найдена, изменяем один из параметров
		if (removedFaculty) {
			faculty.percent += Math.ceil((100 / (MAX_LENGTH_QUESTIONS)) / 5 * numberQuestion);
		}
	});

	// Обновляем данные факультетов в localStorage
	addToLocalStorage('faculties', faculties)
	addToLocalStorage('removedFaculties', removedFaculties)
	findFavoriteDish(setPercent);
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
