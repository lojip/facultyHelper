export const addToLocalStorage = (key, item) => {
	localStorage.setItem(`${key}`, JSON.stringify(item));
}

export const removeFromLocalStorage = (key) => {
	localStorage.removeItem(`${key}`);
}

export const getFromLocalStorage = (key) => {
	const data = localStorage.getItem(`${key}`);

	if (!data) {
		console.error('Faculties data is not available in localStorage.');
		return;
	}

	return JSON.parse(data);
}