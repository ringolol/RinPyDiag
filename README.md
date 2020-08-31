# REST-api

## Содержание
* [/api-token-auth/](#api-token-auth)
  * [GET](#GET)
* [/diagram/api/blocks/](#diagramapiblocks)
  * [GET](#GET-1)
* [/diagram/api/files/](#diagramapifiles)
  * [GET](#GET-2)
  * [POST](#POST)

## /api-token-auth/
*Создать токен для авторизации*

### GET

Поля:
* username
* password

Пример:
```js
{
    username: 'username',
    password: 'password'
}
```

Заголовок: ```{}```

## /diagram/api/blocks/
*Типы блоков для диаграммы*

### GET

Поля: ```{}```

Заголовок:
```js
'Authorization': `Token ${token}` 
```

## /diagram/api/files/
*Файлы юзера с диаграммами*

### GET
*Забрать файлы с сервера*

Поля: ```{}```

Заголовок:
```js
'Authorization': `Token ${token}` 
```

### POST
*Загрузить файл на сервер*

Поля:
  * user (имя юзера)
  * name (имя файла)
  * ser (сериализованная диаграмма)

Пример:
```js
let test_json = {
    user: "username",
    name: "diag-name",
    ser: { ... }
}
```
