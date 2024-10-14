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

export const saveRoomNameToLocalStorage = (newRoomName) => {
    const storedRoomNames = JSON.parse(localStorage.getItem('roomNames')) || [];
    let updatedRoomNames = [...storedRoomNames];
    if (!updatedRoomNames.includes(newRoomName)) {
        updatedRoomNames.push(newRoomName);
        localStorage.setItem('roomNames', JSON.stringify(updatedRoomNames));
    }
};


export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};
