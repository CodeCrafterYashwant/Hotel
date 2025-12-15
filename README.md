# Hotel

This repository contains the backend API for a simple hotel management system, built using Node.js, Express, and MongoDB. It provides endpoints for managing staff (`Person`) and menu items (`Menuitem`).

## Features

*   RESTful API for managing hotel data.
*   CRUD (Create, Read, Update, Delete) operations for Staff and Menu Items.
*   Data models for `Person` and `Menuitem` using Mongoose.
*   Environment variable management with `dotenv`.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB with Mongoose ODM
*   **Dependencies:**
    *   `body-parser`: To parse incoming request bodies.
    *   `dotenv`: To load environment variables from a `.env` file.
    *   `nodemon`: For automatic server restarts during development.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js and npm installed.
*   A running instance of MongoDB (local or cloud-based like MongoDB Atlas).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/codecrafteryashwant/hotel.git
    cd hotel
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add the following environment variables. Replace the placeholder with your actual MongoDB connection string.
    ```env
    MONGODB_URL=mongodb://localhost:27017/hotel
    PORT=3000
    ```

4.  **Start the server:**
    ```sh
    npm start
    ```
    The server will be running on `http://localhost:3000`.

## API Endpoints

The base URL for all endpoints is `http://localhost:3000`.

### Person Routes

Endpoint: `/person`

| Method | Route                | Description                                        |
| :----- | :------------------- | :------------------------------------------------- |
| `POST` | `/`                  | Creates a new person (staff member).               |
| `GET`  | `/`                  | Retrieves a list of all persons.                   |
| `GET`  | `/:worktype`         | Retrieves persons by work type (`chef`, `waiter`, `manager`). |
| `PUT`  | `/:id`               | Updates a person's information by their ID.        |
| `DELETE`| `/:id`               | Deletes a person by their ID.                      |

**Example `Person` Body:**
```json
{
    "name": "John Doe",
    "age": 35,
    "work": "manager",
    "mobile": "1234567890",
    "email": "john.doe@example.com",
    "address": "123 Hotel St, City",
    "salary": 60000
}
```

### Menu Item Routes

Endpoint: `/menu`

| Method | Route           | Description                                       |
| :----- | :-------------- | :------------------------------------------------ |
| `POST` | `/`             | Creates a new menu item.                          |
| `GET`  | `/`             | Retrieves a list of all menu items.               |
| `GET`  | `/:taste`       | Retrieves menu items by taste (`Sweet`, `Spicy`, `Sour`). |
| `PUT`  | `/:id`          | Updates a menu item's information by its ID.      |
| `DELETE`| `/:id`          | Deletes a menu item by its ID.                    |

**Example `Menuitem` Body:**
```json
{
    "name": "Spicy Curry",
    "price": 15,
    "taste": "Spicy",
    "is_drink": false,
    "ingredients": ["curry powder", "chicken", "vegetables"]
}