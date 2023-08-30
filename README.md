# Hello World API with Node and Express

A simple Express.js application built to work with Google Cloud Platform's serverless suite.

- Built with Express.js on a Node.js runtime
- PostgreSQL on GCP's [Cloud SQL](https://cloud.google.com/sql)
- GCP's [Cloud Build](https://cloud.google.com/build) for automatic deployments
- Deployed on GCP's [App Engine](https://cloud.google.com/appengine)
- [Jest](https://jestjs.io) for testing
- JSON Schema validation with [ajv](https://ajv.js.org/)
- [Prettier](https://prettier.io/) for formatting
- [ESLint](https://eslint.org/) for linting
- [Husky](https://typicode.github.io/husky/) for commit linting


Base URL: https://infinite-deck-397306.oa.r.appspot.com

Endpoints
- **GET** `/messages` (Example response below)
```json
{
    "status": "Success",
    "message": [
        {
            "id": 1,
            "created_by": "safwan",
            "message": "hello"
        },
        {
            "id": 2,
            "created_by": "safwan",
            "message": "hello world :D"
        }
    ]
}
```
- **GET** `/messages/:id` (Example response below)
```json
{
    "status": "Success",
    "message": {
        "id": 1,
        "created_by": "safwan",
        "message": "hello"
    }
}
```
- **POST** `/messages`
- Request body must be a JSON with "created_by" and "message" fields. For example:
```json
{
  "created_by": "Safwan Parkar",
  "message": "Hello World!"
}
```
The response for this would be:
```json
{
    "status": "Success",
    "message": {
        "id": 999,
        "created_by": "Safwan Parkar",
        "message": "Hello World!"
    }
}
```
