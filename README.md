# OTT Platform "My List" Feature - Developer Evaluation Project

Welcome to the OTT Platform "My List" feature evaluation project. This project is designed to assess your problem-solving skills, debugging abilities, and overall proficiency in improving an existing codebase. The project is built using [NestJS](https://nestjs.com/), and your task will involve refining the current implementation and adding new features.

## Project Overview

This project simulates a basic OTT (Over-the-Top) platform where users can add content (movies, series, etc.) to their "My List" feature. The backend is implemented with NestJS, and we have already seeded the database with some initial data and models.

Your job will be to address existing issues, optimize the current code, and extend it by adding the required functionalities.

### What you will be working on:
- **Fix existing bugs** in the project.
- **Improve and optimize** the current implementation.
- **Add new features** to enhance the functionality of the "My List" feature.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following prerequisites installed on your machine:

- Node.js v18 or above
- Docker
- Docker Compose

### Setting Up the Project

1. **Clone the repository** to your local machine:
   ```bash
   git clone <repository-url>


### Getting Started

To start the project locally, use the following command:

```bash
docker-compose up --build
```



### Swagger Documentation for existing apis
Swagger Documentation: http://127.0.0.1:3000/api


### API Endpoints to Be Developed
The application needs to expose the following API endpoints by the completion of this assignment:

- GET /list: Lists all items added to the user's list with pagination.
- Accepts {limit, offset} to paginate data with {20, 0} as default
- POST /list: Adds items to the user's list.
- Accepts {contentId, contendType} in body to add to user list
- DELETE /list: Removes an item from the user's list.
- Accepts {contentId} in query to remove contend


## Evaluation Criteria
You will be evaluated based on the following aspects:



A brief overview of the changes you made.
1. Created user and auth service from scratch
2. Created end sign up and login APIs with jwt token in response.
3. Used myList field of users collection to store IDs of movies and tv shows.
4. Used JWT auth guard for making /list as protected routes 

Any challenges you faced and how you overcame them.
1. Worked on NestJS for the first time, understood how decorators and annotation worked 
2. Setting up seeder script for mock entries, caught the concepts of modular dependencies involved


Good Luck!

Feel free to reach out if you have any questions or need clarification on the requirements. We're looking forward to reviewing your submission and evaluating how you tackle this task!


