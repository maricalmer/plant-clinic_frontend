### [plant-clinic](https://mellifluous-arithmetic-b968bd.netlify.app/), a copycat of the subreddit r/plantclinic

## Description

The core function of plant-clinic is to diagnose sick plants. If a user wonders "what's wrong with my plant?", the community helps diagnose and treat it! A registered user can:
- create a post including picture of the plant
- comment on a post
- scroll through posts list
- search for posts within posts list

## Web App

plant-clinic is developed using:
- Rails API with GraphQL for backend. Supported by PostgreSQL database and running on Heroku [GitHub] (https://github.com/maricalmer/plant-clinic_backend)
- React with GraphQL + Apollo Client for frontend. Deployed on Netlify [GitHub] (https://github.com/maricalmer/plant-clinic_frontend)

## React Client

plant-clinic is developed using:
- Rails API with GraphQL for backend. Supported by PostgreSQL database and running on Heroku [GitHub] (https://github.com/maricalmer/plant-clinic_backend)
- React with GraphQL + Apollo Client for frontend. Deployed on Netlify [GitHub] (https://github.com/maricalmer/plant-clinic_frontend)


![React](https://img.shields.io/badge/React-18.2-139ECA?style=for-the-badge&logo=react&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript&logoColor=white) ![Apollo](https://img.shields.io/badge/apollo-3.7.17-2E1D80?style=for-the-badge&logo=apollographql&logoColor=white) ![GraphQL](https://img.shields.io/badge/graphql-16.7.1-F6009B?style=for-the-badge&logo=graphql&logoColor=white) ![tailwindcss](https://img.shields.io/badge/tailwindcss-3.2.2-37BCF8?style=for-the-badge&logo=tailwindcss&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-3-264DE4?style=for-the-badge&logo=css&logoColor=white) ![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![FontAwesome](https://img.shields.io/badge/FontAwesome-5-528CD7?style=for-the-badge&logo=fontawesome&logoColor=white)

## JS Packages (non exhaustive)

[![react-router-dom](https://img.shields.io/badge/animejs-3.2.1-yellow.svg)](https://yarnpkg.com/package/react-router-dom)
[![pluralize](https://img.shields.io/badge/pluralize-8.0.0-yellow.svg)](https://yarnpkg.com/package/pluralize)

## APIs

[![Cloudinary](https://img.shields.io/badge/Cloudinary-API-green.svg)](https://cloudinary.com/documentation/image_upload_api_reference)

## Run Locally

Clone the project

```bash
  git clone git@github.com:maricalmer/maricalmer.github.io.git my-project
```

Go to the project directory and remove git logs

```bash
  cd my-project
  rm -rf .git
```

Install dependencies

```bash
  yarn install
```

Make sure you have ./node_modules/.bin in your $PATH:

```bash
  echo $PATH
  # You should see `./node_modules/.bin` in the list
```

If it's not the case, add it:

```bash
  cd ~/code/dotfiles/<your_github_nickname>
  echo 'export PATH="./bin:./node_modules/.bin:${PATH}"' >> zshrc
  cd ~/code/<your_github_nickname>/my-project
  source ~/.zshrc
```

Start the server

```bash
  yarn start
```

## Visit the page!

[plant-clinic](https://mellifluous-arithmetic-b968bd.netlify.app/)

## License


[MIT](https://choosealicense.com/licenses/mit/)
