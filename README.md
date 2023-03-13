<h1>Node.js сервер с CRUD операциями для хранения фильмов</h1>

Для запуска сервера необходимо установить npm-пакеты и настроить БД в файле db.js. <br />Так же в новую базу, которая будет указана в файле db.js, вставить запросы на создание структуры БД из файла database.sql

Запросы в postman для тестирования:
<ul>Жанры
<li>'POST' http://localhost:5000/genre </br> body: {"name": "horror"} - добавляем жанр</li>
<li>'POST' http://localhost:5000/genre   body: {"name": "thriller"} - добавляем жанр</li>
<li>'POST' http://localhost:5000/genre body: {"name": "comedy"} - добавляем жанр</li>
<li>'GET' http://localhost:5000/genres - получаем все жанры</li>
<li>'GET' http://localhost:5000/genre?id=2 - получаем жанр по id</li>
<li>'PUT' http://localhost:5000/genre?id=2 body: {"id": 2, "name": "NEW-thriller"} - меняем название жанра</li>
<li>'GET' http://localhost:5000/genre?id=2 - получаем жанр по id и проверяем изменения</li>
<li>'DELETE' http://localhost:5000/genre?id=2 - удаляем жанр по id</li>
<li>'GET' http://localhost:5000/genres - получаем все жанры и проверяем изменения</li>
</ul>

