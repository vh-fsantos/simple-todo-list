# Simple To-do List

## How to run 
  - first of all you need to clone the project to your machine.
  - second you need to create a database in `postgres`
  

### Run Frontend:
  - `cd frontend`
  - you need to create `.env` file and setup the api url, see `.env-example` file
  - run `npm run start`
  - the frontend will run in http://localhost:3000/

### Run Backend:
  - `cd backend`
  - create a `.env` file and setup the database connections, see the `.env-example` file
  - run `npm run start`
  - the backend will run in http://localhost:8081/

### Running Tests:
  - `cd` to either the frontend or backend folder
  - run `npm run test`
  - run `npm run test:cov` if you want to see the coverage report

## image preview:
<img width="476" alt="Example of tasks stacked " src="https://user-images.githubusercontent.com/23633309/186055516-80f67937-994d-4a7b-8844-9bd8892813e2.png">

## used technologies
  - React
  - Typescript§w
  - Nest
  - TypeORM
  - Jest
  - Testing Library
  - Material UI
  - Styled Components
