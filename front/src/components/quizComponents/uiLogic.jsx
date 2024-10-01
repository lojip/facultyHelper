export const updatingThePage = (isDirty) => {
	const handleBeforeUnload = (event) => {
		if (isDirty) {
			event.preventDefault();
			event.returnValue = ''; // Для современных браузеров
		}
	};

	window.addEventListener('beforeunload', handleBeforeUnload);
	return () => {
		window.removeEventListener('beforeunload', handleBeforeUnload);
	};
}

export const handleOptionClick = async (num, dataFromNewQuestion) => {
	const { setIsDisabled, setIsDirty, newQuestion, ...data } = dataFromNewQuestion;

	try {
		// Выполняем логику смены вопроса
		await newQuestion(num, data); // Ждем завершения логики смены вопроса
		setIsDirty(true); // Устанавливаем состояние при взаимодействи
	} catch (error) {
		console.error('Ошибка при обработке вопроса:', error);
	} finally {
		setTimeout(() => {
			setIsDisabled(false); // Разблокируем кнопки после завершения
		}, 400);
	}

};
