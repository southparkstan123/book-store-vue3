# Book-Store-Vue3

## Introduction

This is an SPA using Vite Ruby(include Ruby on Rails 7) with Vue 3 revamping the repository [Book store](https://github.com/southparkstan123/book-store).

## Features
- Basic Token Based (JWT) Authentication
- Login by username and password
- CRUD for 'Books', 'Authors' and 'Publisher'
- Search records of 'books' by name
- Pagination for records
- Switch theme and control the page size of pagination

## Technical information

### Backend

#### Database

**PostgreSQL 15** is used on this repo

#### Ruby

**Ruby 3.1.4** is used on this repo

#### Rails

**Rails 7.0** is used on this repo

### Frontend

#### Javascript Framework

**Vue 3.3.4** is used on this repo

#### CSS Framework

**TailwindCSS 3.3.3** is used on this repo

#### Others

**Pinia** and **Vue-router 4** are used on this repo

## Setup the environment on local machine or Vitrual Machine

### Clone the repo to your local machine

You can clone this repo by Github using command line prompt:

```bash
git clone https://github.com/southparkstan123/book-store-vue3.git
```

After cloning the repo, install the dependencies for frontend and backend by following command:

```bash
yarn install && bundle install
```

### Environment variables

You can add the .env files to store the configuration value for different environments , the example file is in ```.env.template```, just copy this file for specific environment. 

For example, in development, create ```.env.development.local```, then input the key and value on it.

In addition, you can add the test configurations for your local machine by copy ```.env.template```, then create and modify as ```.env.test.local```

### Database

**Important**
You have to ensure that PostgreSQL and Redis driver is installed in your local machine.

If you not require the username and password for your database, just comment out the username and password field on ```config/database.yml```

You can create the database and migration by following command:
```bash
rails db:create && rails db:migrate
```
**Optional**
If you want to seeding of a database with data by following command:
```bash
rails db:seed
```

### Run the test cases

#### Backend

TBC

#### Frontend

TBC

### Fix Lint and Type errors

```bash 
yarn lint
```

```bash
yarn type-check
```

### Start up the server

Run ```rails s -b 0.0.0.0``` and access ```http://<YOUR_HOST_NAME_IN_ENV_FILE>:3000``` on Web browser.

**Remark: Edit your hosts file for your host name**

**If you want to enable HMR, run ```foreman s```**

Happy Coding!!!!!

## <i>Alternative</i> Setup the environment on Docker

### Initialization

1. Clone this repo by Github using command line prompt:

```bash
git clone https://github.com/southparkstan123/book-store-vue3.git
```

2. Environment variables

You can add the .env files to store the configuration value for different environments , the example file is in ```.env.template```, just copy this file for specific environment, for example ```.env.development.local``` file. 

**Caution!!!**

**Avoid to commit the ```.env``` file which may contains the sensitive information such as API keys, credentials, etc.**


3. Run the following command to prepare the Docker image and start the PostgresSQL, Rails and Vite services:

```bash
docker-compose up --build 
```

or specify an env file for several environment such as ```.env.development.local```.

```bash
# depends on .env.development.local
docker compose --env-file ./.env.development.local up
```

4. After create the images, migration the database by following command:
```bash
docker-compose exec web bundle exec rails db:migrate
```

5. (Optional) Seeding of a database with data by following command:
```bash
docker-compose exec web bundle exec rails db:seed
```

6. Wait a moment and access ```http://localhost:3000``` on Web browser.

Happy Coding !!!!!!

### Useful commands after establish the environment:

1. Run the following command to start the app:
```bash
# depends on .env
docker-compose up
```

or specify an env file for several environment such as ```.env.development.local```.

```bash
# depends on .env.development.local
docker compose --env-file ./.env.development.local up
```

2. Run the following command to restart the app:
```bash
docker-compose restart
```

or

```bash
docker compose --env-file ./.env.anything.local restart
```

3. Run the following command to shutdown the app:
```bash
docker-compose down
```

or

```bash
docker compose --env-file ./.env.anything.local down
```

4. Run the following command to clean up old unused builds to keep my system clean:
```bash
docker system prune --all
```

**Remark** If you want to run the app on virtual macine such as Homestead, you must comment the key ```host``` on ```config/database.yml```:

```yml
# config/database.yml
host: <%= ENV.fetch("DATABASE_HOST") { "postgres" } %>
```

## Staging environment

[https://book-store-vue3.onrender.com](https://book-store-vue3.onrender.com)
