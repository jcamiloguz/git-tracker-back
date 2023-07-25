# Git Tracker Backend

## Table of Content

- [Git Tracker Backend](#git-tracker-backend)
  - [Table of Content](#table-of-content)
  - [Description](#description)
  - [Technologies](#technologies)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [Run locally with Npm / node](#run-locally-with-npm--node)
    - [Run locally with Docker](#run-locally-with-docker)

## Description

This the backend app for the Git Tracker project. It is a Nestjs app that connect to github API to track the progress of this current project the backend repository and expose a REST API to the frontend app [Git Tracker Frontend](https://github.com/jcamiloguz/git-tracker-front). This API is deployed on Fly.io and you can access it on [https://git-tracker-prod.fly.dev/](https://git-tracker-prod.fly.dev/).

## Technologies

The stack of technologies used in this project are:

- Nestjs as a backend framework
- TypeScript as a programming language
- Octokit as a GitHub API client
- Fly.io as a cloud platform to deploy the app
- Docker as a containerization tool

## Requirements

- Node.js 18.0.0 or higher
- npm 7.0.0 or higher
- Docker 20.10.8 or higher

## Installation

To run this project you have 2 options:

### Run locally with Npm / node

1. Clone the repository from GitHub.
2. Install the dependencies by running `npm install`.
3. Create the .env.local file with the API of the backend, you can use the .env.example file as a template. The GITHUB_TOKEN is a personal access token that you can create on your GitHub account [here](https://github.com/settings/tokens/new). The FRONTEND_REPO and BACKEND_REPO are the name of the repositories that you want to track. The GITHUB_USERNAME is the username of the owner of the repositories.

   ```env
   GITHUB_TOKEN={GITHUB_TOKEN}
   FRONTEND_REPO=git-tracker-front
   BACKEND_REPO=git-tracker-back
   GITHUB_USERNAME=jcamiloguz
   ```

4. Run the app by running `npm run start:dev`.
5. Check that the app is running by going to [http://localhost:8080/](http://localhost:8080/) and add url in the frontend env variable.

### Run locally with Docker

1. Clone the repository from GitHub.
2. Build the docker image by running `docker build -t git-tracker-backend .`
3. Create the .env.local file with the API of the backend, you can use the .env.example file as a template. The GITHUB_TOKEN is a personal access token that you can create on your GitHub account [here](https://github.com/settings/tokens/new). The FRONTEND_REPO and BACKEND_REPO are the name of the repositories that you want to track. The GITHUB_USERNAME is the username of the owner of the repositories.

   ```env
   GITHUB_TOKEN={GITHUB_TOKEN}
   FRONTEND_REPO=git-tracker-front
   BACKEND_REPO=git-tracker-back
   GITHUB_USERNAME=jcamiloguz
   ```

4. Run the docker image by running `docker run -p 8080:8080 git-tracker-backend`
5. Check that the app is running by going to [http://localhost:8080/](http://localhost:8080/) and add url in the frontend env variable.
