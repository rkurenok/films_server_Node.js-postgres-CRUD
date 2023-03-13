function checkFullField(obj) {
    let result = "";

    // проверка на заполненность всех полей (исключая массив, который представляет жанры для фильмов)
    if (Object.values(obj).filter(x => !Array.isArray(x)).map(x => x.toString().trim()).includes("")) {
        result = "Поля не могут быть пустым";
    }

    return result;
}

module.exports = checkFullField;