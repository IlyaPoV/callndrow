// src/utils/localStorageUtils.js

export const saveToLocalStorage = (key, value) => {
    // Получаем существующие данные из localStorage
    const storedData = JSON.parse(localStorage.getItem(key)) || [];
    
    // Проверяем, существует ли значение уже в storedData
    if (!storedData.includes(value)) {
        // Добавляем новое значение
        storedData.push(value);
        // Сохраняем обратно в localStorage
        localStorage.setItem(key, JSON.stringify(storedData));
    }
};


export const saveUsernameToLocalStorage = (newUsername) => {
    const storedUsernames = JSON.parse(localStorage.getItem('usernames')) || [];
    let updatedUsernames = [...storedUsernames];
    if (!updatedUsernames.includes(newUsername)) {
      updatedUsernames.push(newUsername);
      localStorage.setItem('usernames', JSON.stringify(updatedUsernames));
    }
  };

export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};
