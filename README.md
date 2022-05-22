Full stack Arcadia, in this project will be defined a basic structure frontend and backend as long as dockerfile to test in a local enviroment. All the project is defined using only **typescript** as main language

## Database
Database used in this project, is a PostgreSQL. Conection string will be defined inside .env files.
## Backend
Backend server created using **Express**, with a middleware **ApolloServer**, and **Typeorm** as the database conector.
## Frontend

### Configuration
.env files are not included in the project but there is a model(.env.model) where is included an example of the enviroment variables that need to be defined. This archives should be included in _./backend/.env_ and _./frontend/.env_.
```
docker-compose up --build, in order to build and create all the instances needed to run the project
docker-compose down, to shut down all the servers
localhost:3001/graphql, graphql server to test all the backend endpoints (BACKEND_PORT=3001)
localhost:3000, frontend web (FRONTEND_PORT=3000)
```
There will be initial data inside migrations, that will fill the database first time its running.
As the website need user and login in order to be visited,
| usercode  | password  |
|---|---|
| C00000  | 1234  |
| C00001  | 1234  |
| C00002  | 1234  |
| C00003  | 1234  |

## jsonWebToken
In order to be able to store a valid login user, we will be creating two jsonwebtoken, one access_token that will expire in a short period of time, and a refresh token that will be stored in a cookie ('jid'), when the access token is expired we will be calling to /refresh_token and generate a new access token if the refresh token is not expired (also renew the refresh token). jsonwebtoken will store the user id as payload.

Some of the endpoints will check for a valid jsonwebtoken, to prevent unauthorized user use this endpoints. Also carefull if your browser is not saving cookies from localhost.

