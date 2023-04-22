export const setToLocaleStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

export const getFromLocaleStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.log(error);
    }
}