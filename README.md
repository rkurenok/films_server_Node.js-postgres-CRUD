<h1>Node.js сервер с CRUD операциями для хранения фильмов</h1>

Для запуска сервера необходимо установить npm-пакеты и настроить БД в файле db.js. <br />Так же в новую базу, которая будет указана в файле db.js, вставить запросы на создание структуры БД из файла database.sql

Запросы в postman для тестирования:

<ul>Жанры
<li>'POST' http://localhost:5000/genre </br> body: {"name": "horror"} - добавляем жанр</li>
<li>'POST' http://localhost:5000/genre </br> body: {"name": "thriller"} - добавляем жанр</li>
<li>'POST' http://localhost:5000/genre </br> body: {"name": "comedy"} - добавляем жанр</li>
<li>'GET' http://localhost:5000/genres - получаем все жанры</li>
<li>'GET' http://localhost:5000/genre?id=2 - получаем жанр по id</li>
<li>'PUT' http://localhost:5000/genre?id=2 </br> body: {"id": 2, "name": "NEW-thriller"} - меняем название жанра</li>
<li>'GET' http://localhost:5000/genre?id=2 - получаем жанр по id и проверяем изменения</li>
<li>'DELETE' http://localhost:5000/genre?id=2 - удаляем жанр по id</li>
<li>'GET' http://localhost:5000/genres - получаем все жанры и проверяем изменения</li>
</ul>
</br>
<ul>Фильмы
<li>'POST' http://localhost:5000/film </br> body: {"name": "Побег из Шоушенка", "year": 1994} - добавляем фильм (без жанра)</li>
<li>'POST' http://localhost:5000/film </br> body: {"name": "Зелёная миля", "year": 1999, "genre": [1, 3]} - добавляем фильм</li>
<li>'POST' http://localhost:5000/film </br> body: {"name": "Форрест Гамп", "year": 1994, "genre": [3]} - добавляем фильм</li>
<li>'GET' http://localhost:5000/films - получаем все фильмы</li>
<li>'GET' http://localhost:5000/film?id=2 - получаем фильм по id</li>
<li>'PUT' http://localhost:5000/film?id=2 </br> body: {"id": 2, "name": "Список Шиндлера", "year": 1993, "genre": [1]} - меняем данные фильма</li>
<li>'PUT' http://localhost:5000/film?id=2 </br> body: {"id": 3, "name": "Крёстный отец", "year": 1972} - меняем данные фильма (задаем фильм без жанра)</li>
<li>'GET' http://localhost:5000/films - получаем все фильмы и проверяем изменения</li>
<li>'DELETE' http://localhost:5000/film?id=2 - удаляем фильм по id</li>
<li>'GET' http://localhost:5000/films - получаем все фильмы и проверяем изменения</li>
</ul>


