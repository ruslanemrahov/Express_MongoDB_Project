# Comments API && MongoDB

A simple RESTful API built with Node.js, Express, and MongoDB for managing comments with support for nested/threaded commenting functionality.

## Features

- **Create Comments**: Add new comments with optional parent-child relationships
- **Read Comments**: Retrieve all comments with formatted response
- **Update Comments**: Edit existing comment content
- **Delete Comments**: Remove comments from the system
- **Nested Comments**: Support for threaded/hierarchical comment structure via `parentId`
- **Auto Timestamps**: Automatically adds creation timestamps to comments
- **JSON API**: Clean JSON responses with proper HTTP status codes

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with native MongoDB driver
- **Development**: Nodemon for auto-restart during development
- **Body Parsing**: Built-in Express body parser for JSON and URL-encoded data

## Project Structure

```
mango_db_project/
├── controllers/
│   └── commnets.js          # Comment controller with CRUD operations
├── models/
│   └── comments.js          # Comment model with database operations
├── db.js                    # Database connection management
├── index.js                 # Main application entry point
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## API Endpoints

### GET /comments
Retrieve all comments

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "body": "This is a comment",
    "parentId": null,
    "userId": "1",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### POST /comments
Create a new comment

**Request Body:**
```json
{
  "text": "Your comment text here",
  "parentId": "507f1f77bcf86cd799439011" // optional, for nested comments
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "body": "Your comment text here",
  "parentId": "507f1f77bcf86cd799439011",
  "userId": "1",
  "createdAt": "2024-01-15T10:35:00Z"
}
```

### PUT /comments/:id
Update an existing comment

**Request Body:**
```json
{
  "text": "Updated comment text"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "body": "Updated comment text",
  "parentId": "507f1f77bcf86cd799439011",
  "userId": "1",
  "createdAt": "2024-01-15T10:35:00Z"
}
```

### DELETE /comments/:id
Delete a comment

**Response:** HTTP 200 status code

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd mango_db_project
```

2. **Install dependencies**
```bash
npm install
```

3. **Start MongoDB**
Make sure MongoDB is running on `mongodb://localhost:27017`

4. **Run the application**
```bash
# Development mode with auto-restart
npm start

# Or run directly
node index.js
```

5. **Test the API**
The server will start on `http://localhost:5000`

## Configuration

### Database Connection
The application connects to MongoDB using the following configuration in `index.js`:
```javascript
await connect("mongodb://localhost:27017/comments");
```

To use a different database URL, modify this line or consider using environment variables.

### Port Configuration
The application runs on port 5000 by default. You can change this in `index.js`:
```javascript
const PORT = 5000;
```

## Database Schema

### Comments Collection
```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  body: String,            // Comment text content
  parentId: String|null,   // Reference to parent comment for nesting
  userId: String,          // User identifier (currently hardcoded as "1")
  createdAt: Date         // Auto-generated timestamp
}
```

## Development Features

- **Auto-restart**: Uses nodemon for automatic server restart during development
- **Error Handling**: Centralized error handling with Express middleware
- **Data Normalization**: Consistent response format with ID transformation
- **CORS Ready**: Can be easily extended with CORS middleware for frontend integration

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Comment voting/rating system
- [ ] Pagination for large comment sets
- [ ] Input validation and sanitization
- [ ] Rate limiting
- [ ] Comment moderation features
- [ ] Real-time updates with WebSockets
- [ ] Search functionality

## Dependencies

### Production
- **express**: Fast, unopinionated web framework for Node.js
- **mongodb**: Official MongoDB driver for Node.js
- **body-parser**: Middleware to parse incoming request bodies
- **mongoose**: MongoDB object modeling (included but not actively used)

### Development
- **nodemon**: Automatically restarts the application when file changes are detected

## License

This project is for educational purposes and is open source.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Note**: This project uses the native MongoDB driver instead of Mongoose for direct database operations. The `mongoose` dependency is included in the package but not utilized in the current implementation.
