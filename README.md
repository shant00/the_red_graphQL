## Overview

This application is a GraphQL API built with Node.js, Express, and Apollo Server. It provides a mechanism for authentication using JWT and allows querying various data entities through a GraphQL schema.

## Features

- User authentication via JWT.
- GraphQL API with queries for different entities.
- CORS support for cross-origin requests.

## Environment Variables

Ensure to create a `.env` file in the root of the project with the following variables:

```env
PORT=your_port
JWT_SECRET=your_jwt_secret
EXPIRY_TIME=1h
```
## API Endpoints
### Authentication
#### `POST /login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password"
}
```

 ### Response

- **Success (200)**:
  ```json
  {
    "token": "Bearer <your_jwt_token>"
  }
  ```

- **Error (401)**:
   ```json
  {
    "message": "Invalid credentials"
  }
  ```

### cURL
```curl
curl -X POST http://localhost:<port>/login \
-H "Content-Type: application/json" \
-d '{"username": "admin", "password": "password"}'
```
 
  ### GraphQL Endpoint

The GraphQL API is exposed at the `/graphql` endpoint. Use a GraphQL client or an IDE like GraphQL Playground to send queries.

### GraphQL Schema
- **Action**
    - `_id`: ID!
    - `createdAt`: Long!
    - `updatedAt`: Long
    - `name`: String!
    - `description`: String
    - `functionString`: String
    - `resourceTemplateId`: ID
    - `resourceTemplate`: ResourceTemplate

- **Trigger**
    - `_id`: ID!
    - `createdAt`: Long!
    - `updatedAt`: Long
    - `name`: String!
    - `description`: String
    - `functionString`: String
    - `resourceTemplateId`: ID
    - `resourceTemplate`: ResourceTemplate

- **Response**
    - `_id`: ID!
    - `createdAt`: Long!
    - `updatedAt`: Long
    - `name`: String!
    - `description`: String
    - `platforms`: [ResponsePlatform]

- **NodeObject**
    - `_id`: ID!
    - `createdAt`: Long!
    - `updatedAt`: Long
    - `name`: String!
    - `description`: String
    - `parents`: [NodeObject]
    - `parentIds`: [ID]
    - `trigger`: Trigger
    - `responses`: [Response]
    - `actions`: [Action]

### Queries

#### `node(nodeId: ID): NodeObject`

Fetches a `NodeObject` by its ID.

**Request Headers:**

```bash
Content-Type: application/json
Authorization: Bearer <your_token_here>
```
**Request Body:**
```graphql
query {
 node(nodeId:"6296be3470a0c1052f89cccb") {
    _id
    createdAt
    description
		parentIds
    root
	  responses{
			_id
			name
		}
    actions {
      _id
      name
      resourceTemplate {
        _id
        name  
      }
    }
    responseIds
   
  }
}
```

### Response 
```json
{
	"data": {
		"node": {
			"_id": "6296be3470a0c1052f89cccb",
			"createdAt": 1654046260304,
			"description": "",
			"parentIds": [],
			"root": true,
			"responses": [
				{
					"_id": "6296fcad70a0c11ddb89ccf0",
					"name": "Greeting Message"
				}
			],
			"actions": [
				{
					"_id": "6530933e6a1690d2f0c78a92",
					"name": "Send Email Action",
					"resourceTemplate": {
						"_id": "62cfc19bf4573e1b32ca2295",
						"name": "Send Email"
					}
				}
			],
			"responseIds": null
		}
	}
}
```
### cURL
```cURL
curl -X POST http://localhost:<port>/graphql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
-d '{"query": "{ node(nodeId: \"1\") { _id name parents { _id name } actions { _id name } } }"}'
```

## Running the Application

1. Install dependencies:
   ```bash
   yarn install
   ```
2. Start the server:
    ```bash
    node server.js
    ```
3. Access the GraphQL Playground at http://localhost:<"port">/graphql.

###### used node version: 20.17.0

