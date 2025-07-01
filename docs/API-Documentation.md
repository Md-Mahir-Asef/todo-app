# 📝 Todo App API

## 🔖 Overview

This is the API collection for the **Todo App**, a RESTful API service that supports user authentication and task management features. The API is designed to be consumed by frontend clients (such as a React app), and it follows standard REST principles using HTTP verbs and status codes.

---

## 🚀 Base URL

[http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)

---

## 🔐 Authentication

This API uses **JWT-based authentication**.

- **Login and Signup** endpoints return a JWT token.
- This token should be sent with every authenticated request as credentials.

---

## 📁 Folders

These APIs are divided into two folders:

- Auth
- Tasks

---

## ⚙️ Endpoints

There are 8 endpoints in total. 4 in the Auth folder and 4 in the Tasks folder.

Endpoints under the Auth folder:

- Sign-up
- Logout
- Login
- Delete-user

Endpoints under the Tasks folder:

- Create Task
- Get Sorted Tasks
- Update Task
- Delete Task

# 🔐 Auth API Documentation

This section of the Todo App API handles all user authentication-related operations, including account creation, login, logout, and user deletion.

Base URL for all endpoints:  
`http://localhost:8000/api/v1/user`

## ⚙️ Endpoints

Here are the endpoints under Auth folder:

- Sign Up
- Logout
- Login
- Delete User

## User Sign-Up API

This endpoint is used to register a new user in the system. It allows users to create an account by providing their name, email, and password. Upon successful registration, the API returns a token that can be used for authentication in subsequent requests.

### Request

- **Method**: POST
- **URL**: `http://localhost:8000/api/v1/user/sign-up`

#### Request Body

The request body must be in JSON format and should include the following fields:

| Parameter | Type   | Description                                                              |
| --------- | ------ | ------------------------------------------------------------------------ |
| name      | string | The name of the user.                                                    |
| email     | string | The email address of the user. It should be unique.                      |
| password  | string | The password for the user account. It should meet security requirements. |

**Example Request Body:**

```json
{
  "name": "user",
  "email": "{{$randomEmail}}",
  "password": "Test@123"
}
```

### Response

On a successful registration, the API responds with a JSON object containing the following fields:

| Parameter | Type    | Description                                                    |
| --------- | ------- | -------------------------------------------------------------- |
| message   | string  | A message indicating the result of the request (may be empty). |
| success   | boolean | Indicates whether the request was successful.                  |
| data      | object  | Contains additional data related to the registration.          |
| token     | string  | A token that can be used for authenticating future requests.   |

**Example Response:**

```json
{
  "message": "",
  "success": true,
  "data": {
    "token": ""
  }
}
```

### Notes

- Ensure that the email provided is valid and not already registered in the system.
- The password should adhere to security standards to ensure account safety.

## Logout User

This endpoint allows a user to log out from their current session. Upon successful execution, it invalidates the user's session and returns a confirmation of the logout action.

### Request

- **Method**: POST
- **URL**: `http://localhost:8000/api/v1/user/logout`

### Expected Input Parameters

This endpoint does not require any input parameters in the request body.

### Response Structure

On successful logout, the response will be in JSON format with the following structure:

- **message**: A string that may contain additional information about the logout process (may be empty).
- **success**: A boolean indicating the success of the logout operation.

#### Example Response

```json
{
  "message": "",
  "success": true
}
```

### Notes

- A successful response (HTTP Status 200) indicates that the user has been logged out successfully.

## User Login API

This endpoint allows users to authenticate by logging into their account.

### Request

- **Method**: `POST`
- **Endpoint**: `http://localhost:8000/api/v1/user/login`
- **Request Body**: The request should include a JSON object with the following parameters:
  - `email` (string): The email address of the user.
  - `password` (string): The password associated with the user's account.

### Example Request Body

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

### Response

Upon successful authentication, the server responds with a JSON object containing the following fields:

- `message` (string): A message regarding the login attempt.
- `authenticated` (boolean): Indicates whether the user is successfully authenticated.
- `success` (boolean): Indicates whether the login operation was successful.

### Example Response

```json
{
  "message": "",
  "authenticated": true,
  "success": true
}
```

### Status Codes

- **200 OK**: Indicates that the login was successful.

### DELETE User Endpoint

This endpoint allows you to delete a user from the system using their unique identifier.

- **HTTP Method:** `DELETE`
- **Endpoint:** `http://localhost:8000/api/v1/user/{userId}`
  - Replace `{userId}` with the unique ID of the user you wish to delete.

#### Request Parameters

- **Path Parameter:**
  - `userId` (string): The unique identifier of the user to be deleted.

#### Expected Response

On a successful deletion, the API will return a JSON response with the following structure:

- **Status Code:** `200 OK`
- **Content-Type:** `application/json`
- { "message": "", "data": { "id": "" }, "success": true}
  - `message`: A string that may contain additional information about the request.
  - `data`: An object containing the `id` of the deleted user.
  - `success`: A boolean indicating the success of the operation.

Ensure that you have the necessary permissions to delete a user before making this request.

# ✔️ Tasks API Documentation

This section of the Todo App API handles all task related operations, including task creation, getting sorted tasks, updating tasks, and task deletion.

Base URL for all endpoints:  
`http://localhost:8000/api/v1/user/task`

## ⚙️ Endpoints

Here are the endpoints under Tasks folder:

- Create Task
- Get Sorted Tasks
- Update Task
- Delete Task

## Add Task Endpoint

This endpoint allows users to create a new task by submitting a POST request to the specified URL.

### Request

- **Method**: POST
- **Endpoint**: `http://localhost:8000/api/v1/user/task/`

#### Request Body

The request body must be in JSON format and include the following parameters:

- **title** (string): The title of the task. This should be a brief description of the task (Optional). (Default: "Untitled Task")
- **description** (string): A detailed description of the task (Optional). (Default: "No Description.")
- **priority** (string): The priority level of the task. Acceptable values include "Not_set", "High", "Medium", or "Low" (Optional). (Default: "Not_set")
- **dueDate** (string): The due date for the task in MM/DD/YYYY format (Optional). (Default: "null")
- **status** (string): The current status of the task. Common values include "Todo", "Doing", or "Done" (Optional). (Default: "Todo")

Example of a request body:

```json
{
  "title": "Sample Task Title",
  "description": "Sample Task Description",
  "priority": "High",
  "dueDate": "7/1/2025",
  "status": "Todo"
}
```

### Response

Upon a successful request, the server will respond with a status code of 200 and a JSON object containing the following structure:

- **message** (string): A message indicating the result of the operation (may be empty).
- **data** (object): Contains the details of the created task.
  - **task** (object): The task object that includes:
    - **id** (string): The unique identifier for the task.
    - **title** (string): The title of the task.
    - **description** (string): The description of the task.
    - **createdAt** (string): Timestamp of when the task was created.
    - **updatedAt** (string): Timestamp of the last update to the task.
    - **priority** (string): The priority level of the task.
    - **dueDate** (string): The due date of the task.
    - **status** (string): The current status of the task.
    - **userId** (string): The identifier of the user who created the task.
- **success** (boolean): Indicates whether the request was successful.

Example of a successful response:

```json
{
  "message": "",
  "data": {
    "task": {
      "id": "12345",
      "title": "Sample Task Title",
      "description": "Sample Task Description",
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z",
      "priority": "High",
      "dueDate": "7/1/2025",
      "status": "Todo",
      "userId": "67890"
    }
  },
  "success": true
}
```

## Endpoint Description

This endpoint retrieves a list of tasks created by users, sorted in descending or ascending order based on their creation date, update date, due date, priority or status. It is useful for applications that need to display tasks or manage task-related functionalities.

### HTTP Method

`GET`

### Request URL

`http://localhost:8000/api/v1/user/task/{sortedBy}/{sortOrder}`

### Request Parameters

This endpoint requires two request parameters, one is **sortedBy** and another one is **sortOrder.**  
Possible values of **sortedBy**:

- createdAt
- updatedAt
- dueDate
- priority
- status

And the possible values of **sortOrder**:

- asc
- desc

Default values of **sortedBy** is **creatdAt** and default value of **sortOrder** is desc.  
if the parameters are wrong, this api will give a 404 not found status code.

### Response Structure

On successful execution, the response will return a JSON object with the following structure:

- `message`: A string that may contain additional information about the response (empty in this case).
- `data`: An object containing:
  - `tasks`: An array of task objects, where each task object includes:
    - `id`: The unique identifier for the task.
    - `title`: The title of the task.
    - `description`: A brief description of the task.
    - `createdAt`: The timestamp indicating when the task was created.
    - `updatedAt`: The timestamp indicating the last update time of the task.
    - `priority`: The priority level of the task.
    - `dueDate`: The date by which the task should be completed.
    - `status`: The current status of the task (e.g., pending, completed).
    - `userId`: The identifier of the user who created the task.
- `success`: A boolean indicating whether the request was successful.

### Example Response

```json
{
  "message": "",
  "data": {
    "tasks": [
      {
        "id": "",
        "title": "",
        "description": "",
        "createdAt": "",
        "updatedAt": "",
        "priority": "",
        "dueDate": "",
        "status": "",
        "userId": ""
      }
    ]
  },
  "success": true
}
```

This endpoint is particularly useful for applications that need to display or manage user tasks based on their creation date.

### Update Task

This endpoint allows you to update an existing task by providing the task ID in the URL. The request modifies the task details such as title, description, priority, status, and due date.

#### Request Parameters

The request body must be in JSON format and include the following parameters:

- **title** (string): The title of the task to be updated. (Default: "Untitled Task")
- **description** (string): A brief description of the task. (Default: "No Description.")
- **priority** (string): The priority level of the task (Not_set, Low, Medium or High). (Default: "Not_set")
- **status** (string): The current status of the task (Todo, Doing, Done). (Default: "Todo")
- **dueDate** (string): The due date for the task in MM/DD/YYYY format. (Default: null)

#### Response Structure

Upon a successful update, the API responds with a status code of 200 and a JSON object containing the following structure:

- **message** (string): A message indicating the result of the operation (empty in this case).
- **success** (boolean): Indicates whether the operation was successful.
- **data** (object): Contains the updated task details:
  - **task** (object): The updated task information, which includes:
    - **id** (string): The unique identifier of the task.
    - **title** (string): The updated title of the task.
    - **description** (string): The updated description of the task.
    - **createdAt** (string): The timestamp when the task was created.
    - **updatedAt** (string): The timestamp when the task was last updated.
    - **priority** (string): The updated priority level of the task.
    - **dueDate** (string): The updated due date of the task.
    - **status** (string): The updated status of the task.
    - **userId** (string): The ID of the user associated with the task.

This endpoint is essential for maintaining and managing tasks effectively within the application.

## Delete Task Endpoint

This endpoint allows users to delete a specific task identified by its unique ID.

### Request

- **Method**: `DELETE`
- **Endpoint**: `http://localhost:8000/api/v1/user/task/{taskId}`
- **Path Parameter**:
  - `taskId` (string): The unique identifier of the task to be deleted.

### Response

Upon successful deletion of the task, the API will return a JSON response with the following structure:

- **Status Code**: `200 OK`
- **Content-Type**: `application/json`
- **Response Body**:
  - `message` (string): A message indicating the result of the operation (may be empty).
  - `success` (boolean): Indicates whether the deletion was successful.
  - `data` (object): Contains details about the deleted task, including:
    - `task` (object): An object representing the deleted task with the following properties:
      - `id` (string): The unique identifier of the task.
      - `title` (string): The title of the task.
      - `description` (string): A brief description of the task.
      - `createdAt` (string): The timestamp when the task was created.
      - `updatedAt` (string): The timestamp when the task was last updated.
      - `priority` (string): The priority level of the task.
      - `dueDate` (string): The due date of the task.
      - `status` (string): The current status of the task.
      - `userId` (string): The identifier of the user who owns the task.

### Example Response

```json
{
  "message": "",
  "success": true,
  "data": {
    "task": {
      "id": "",
      "title": "",
      "description": "",
      "createdAt": "",
      "updatedAt": "",
      "priority": "",
      "dueDate": "",
      "status": "",
      "userId": ""
    }
  }
}
```

This endpoint is useful for managing tasks within the user's account by allowing them to remove tasks that are no longer needed.
