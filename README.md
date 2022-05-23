Full stack Arcadia, in this project will be defined a basic structure frontend and backend as long as dockerfile to test in a local enviroment. All the project is defined using only **typescript** as main language

## Database
Database used in this project, is a PostgreSQL. Conection string will be defined inside .env files.
## Backend
Backend server created using **Express**, with a middleware **ApolloServer**, and **Typeorm** as the database conector.
There will be 3 main parts in the backend project
* /entity, database model, relations defined for Typeorm 
* /resolvers, graphql endpoints
* /migration, migrations that will run via Typeorm. (program will check for new migrations at the beginning)
## Frontend
For the frotend has been used **Vite** as the framework for **React**. Also **Material-ui** for the components style.
* /components, building block with functionality
* /views, main pages of the website
* /graphql, query and mutation definitions to create Hooks
* /generated, hooks created based of the files in /graphql

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
In order to be able to store a valid login user, we will be creating two jsonwebtoken, one access_token that will expire in a short period of time, and a refresh token that will be stored in a cookie ('jid'), when the access token is expired we will be calling to /refresh_token (backend endpoint) and generate a new access token if the refresh token is not expired (also renew the refresh token). jsonwebtoken will store the user id as payload.

Some of the endpoints will check for a valid jsonwebtoken, to prevent unauthorized user use this endpoints. Also carefull if your browser is not saving cookies from localhost.

## Workflow
There will be a left menu with the most important pages of the website, all of them are protected, so if the user is not login there will be redirect to the login page. If the user have cookie from previous visits, it will generate a accesstoken and the user will no need to login again. 

Edit worker / company, by clicking any of the card, modal window will popup with all the relative information. For simplicity some of the fields are disabled by default in order to avoid extra checks (unique fields like email or username).

In the edit worker modal view can also manage its job, like leave job or apply a new company (user will only see new companies to apply if currently dont have a job)

WorldMap display workers with a job (green dot) and companny (red dot) locations.

At the beggining of the proyect there will no worker either companies, both pages, will have a plus sign (top right corner) to add new elements. All pages will be reloaded after any change happens.

## Graphql
Graphql has been choose as the main comunication between frontend and backend. All the endpoint exposed can be tested localy in the page, http://localhost:3001/graphql.
 
In order to test new endpoint in the frontend
* define new graphql in a new archive under /graphql, there is two folders, Query & Mutation
* Run 'yarn gen' in order to create new hooks based on the file created
* New hook will have as name convection, _use + name of the query + [Query|Mutation]_, for instance useWorkerQuery will provide with a json format with all the currently (not disabled) workers.

## TODO
- [ ] User functionality, logout, forgot password, signup, etc
- [ ] Company, display its workers when click on any card.
- [ ] WorldMap, display company name for workers, kind of tooltip (on hover)
- [ ] Home, need to be more welcoming.