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

Пример ответ:
```js
{
    ...
    data: {
        ...
        token: krakoziabra777,
        ...
    },
    ...
}
```

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

Пример ответ:
```js
[
    {
        "name": "const",
        "inpN": 0,
        "outpN": 1,
        "pars": {
            "val": 1
        },
        "states": {}
    },
    {
        "name": "integ",
        "inpN": 1,
        "outpN": 1,
        "pars": {},
        "states": {
            "0": 0
        }
    }
]
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

Пример ответ:
```js
[
    {
        "user": "username",
        "name": "diag-name1",
        "ser": { ... }
    },
    {
        "user": "username",
        "name": "diag-name2",
        "ser": { ... }
    }
]
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

Пример ответа:
```js
???
```
