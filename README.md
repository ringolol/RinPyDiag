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

### GET
*Создать токен для авторизации*

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

### GET
*Забрать типы блоков для диаграммы*

Поля: ```{}```

Заголовок:
```js
{
    'Authorization': `Token ${token}`
}
```

## /diagram/api/files/
*Файлы юзера с диаграммами*

### GET
*Забрать файлы с сервера*

Поля: ```{}```

Заголовок:
```js
{
    'Authorization': `Token ${token}`
}
```

### POST
*Загрузить файл на сервер*

Поля:
  * user (имя юзера)
  * name (имя файла)
  * ser (сериализованная диаграмма)

Пример:
```js
{
    user: "username",
    name: "diag-name",
    ser: { ... }
}
```

Заголовок:
```js
{
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json'
}
```
