# lightfeather-coding-challenge
Code for LightFeather Coding Challenge

This was built on Node v14, and also requires npm. It was built from the example [express-generator](https://expressjs.com/en/starter/generator.html).

To get started, run:

```
npm install
```

To start up server, run:
```
npm start
```

By default, the server runs on port 3000, so any calls would be going to localhost:3000/api/supervisors or localhost:3000/api/submit

### GET /api/supervisors
Returns a list of supervisors formated and alphabetized as follows:
```
{jurisdiction} - {lastName}, {firstName}
```

### POST /api/submit
Takes in application/x-www-form-urlencoded data, and performs validation.

Input should be in the following format:
```
{
    "firstName": "Joshua", (required)
    "lastName": "Ji", (required)
    "email": "joshua.yuheji@gmail.com",
    "phoneNumber": "123456789",
    "supervisorId": "3" (required)
}
```

Server will return an error if required parameters are not there, or if the supervisor id is not in database.

Otherwise, server will return the input data and print it in console.