# TaskFlow - Full-Stack Task Management Application

A modern, feature-rich task management application built with **Spring Boot** backend and **React** frontend, showcasing best practices in full-stack development.

## 🚀 Features

### Core Requirements ✅
- ✅ **Backend**: Java Spring Boot 3.2.1
- ✅ **User Authentication**: Login & Register
- ✅ **CRUD Operations**: Complete task management
- ✅ **Database**: PostgreSQL 16
- ✅ **RESTful API**: Well-structured endpoints
- ✅ **Frontend**: React 18 (separated from backend)
- ✅ **Git Version Control**: Clear commit history

### Bonus Features ✅
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **Search/Filter/Sorting**: Advanced search with multiple filter combinations
- ✅ **Application Logging**: Comprehensive logging with Logback
- ✅ **Responsive UI**: Mobile-friendly design with Tailwind CSS
- ✅ **Creative Features**:
  - Task priorities (LOW, MEDIUM, HIGH, URGENT)
  - Due dates with overdue indicators
  - Categories & tags for organization
  - Dashboard with visual analytics (charts)
  - Dark mode toggle
  - Toast notifications
  - User profile management
  - Real-time statistics

## 📁 Project Structure

```
neurogine/
├── backend/                    # Spring Boot Application
│   ├── src/main/java/com/neurogine/taskapp/
│   │   ├── config/            # Security, CORS, Logging
│   │   ├── controller/        # REST API endpoints
│   │   │   ├── AuthController.java
│   │   │   ├── TaskController.java
│   │   │   └── ProfileController.java
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── model/             # JPA Entities (User, Task)
│   │   ├── repository/        # Spring Data repositories
│   │   └── security/          # JWT utilities
│   ├── src/main/resources/
│   │   ├── application.yml    # App configuration
│   │   └── logback.xml        # Logging config
│   └── pom.xml
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/        # Toast, Navigation
│   │   ├── pages/             # Login, Register, Tasks, Dashboard, Profile
│   │   ├── api.js             # API client
│   │   ├── App.jsx            # Main app with routing
│   │   └── main.jsx
│   ├── tailwind.config.js     # Tailwind with dark mode
│   └── package.json
│
├── logs/                       # Application logs
└── README.md
```

## 🛠️ Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming language |
| Spring Boot | 3.2.1 | Backend framework |
| Spring Security | 6.2.1 | Authentication & authorization |
| Spring Data JPA | 3.2.1 | Database ORM |
| PostgreSQL | 16 | Database |
| JWT | 0.12.5 | Token-based auth |
| Lombok | 1.18.30 | Reduce boilerplate |
| Logback | 1.4.14 | Logging |
| Maven | 3.8.7 | Build tool |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| Vite | 5.0.8 | Build tool |
| React Router | 6.21.0 | Routing |
| Tailwind CSS | 3.4.0 | Styling |
| Recharts | 2.10.0 | Charts & graphs |
| React Toastify | 10.0.3 | Notifications |

## 📦 Installation & Setup

### Prerequisites
```bash
# Check versions
java -version    # Should be 17+
node -version    # Should be 18+
psql --version   # Should be 16+
mvn -version     # Should be 3.8+
```

### 1. Clone Repository
```bash
git clone <repository-url>
cd neurogine
```

### 2. Database Setup
```bash
# Start PostgreSQL
sudo service postgresql start

# Create database and user
sudo -u postgres psql
CREATE DATABASE taskdb;
CREATE USER taskuser WITH PASSWORD 'taskpass';
GRANT ALL PRIVILEGES ON DATABASE taskdb TO taskuser;
\q
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies and build
mvn clean install

# Run application
mvn spring-boot:run

# Server starts on http://localhost:8080
# Logs stored in logs/taskapp.log
```

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# App opens at http://localhost:5173
```

## 🔌 API Endpoints

### Authentication Endpoints
```
POST /api/auth/register
Request: { username, email, password }
Response: { token, username }

POST /api/auth/login
Request: { username, password }
Response: { token, username }
```

### Task Endpoints
```
GET /api/tasks
Headers: Authorization: Bearer <token>
Response: Task[]

GET /api/tasks/search?query=...&status=...&priority=...&category=...
Headers: Authorization: Bearer <token>
Response: Task[]

GET /api/tasks/statistics
Headers: Authorization: Bearer <token>
Response: { totalTasks, byStatus, byPriority, overdueTasksCount, ... }

GET /api/tasks/categories
Headers: Authorization: Bearer <token>
Response: string[]

POST /api/tasks
Headers: Authorization: Bearer <token>
Request: { title, description, priority, status, dueDate, category, tags }
Response: Task

PUT /api/tasks/{id}
Headers: Authorization: Bearer <token>
Request: { title, description, priority, status, dueDate, category, tags }
Response: Task

DELETE /api/tasks/{id}
Headers: Authorization: Bearer <token>
Response: 200 OK
```

### Profile Endpoints
```
GET /api/profile
Headers: Authorization: Bearer <token>
Response: { id, username, email, firstName, lastName }

PUT /api/profile
Headers: Authorization: Bearer <token>
Request: { firstName, lastName, email }
Response: UserProfile
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    last_login_at TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,  -- PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    priority VARCHAR(50) NOT NULL, -- LOW, MEDIUM, HIGH, URGENT
    due_date TIMESTAMP,
    category VARCHAR(100),
    tags VARCHAR(500),
    user_id BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

## 🎨 Application Features

### 1. Dashboard
- **Statistics Cards**: Total tasks, overdue, due today, this week
- **Pie Chart**: Task distribution by status
- **Bar Chart**: Task distribution by priority
- **Real-time Updates**: Auto-refresh on data changes

### 2. Enhanced Task Management
- **Rich Fields**: Title, description, priority, status, due date, category, tags
- **Visual Priority**: Color-coded badges (green → red)
- **Status Tracking**: PENDING → IN_PROGRESS → COMPLETED
- **Overdue Detection**: Red border for overdue tasks
- **Quick Actions**: Inline edit and delete buttons

### 3. Advanced Search & Filtering
- **Full-text Search**: Search in title, description, tags
- **Multi-filter**: Status + Priority + Category combination
- **Dynamic Results**: Real-time search updates
- **Category Autocomplete**: Suggests existing categories

### 4. User Profile
- **Editable Fields**: First name, last name, email
- **Avatar Display**: Initial-based avatar
- **Profile Updates**: Update profile information

### 5. Dark Mode
- **Toggle Switch**: Sun/moon icon in navbar
- **Persistent**: Saved in localStorage
- **Complete Coverage**: All pages support dark theme
- **Smooth Transition**: Animated theme switching

### 6. UX Enhancements
- **Toast Notifications**: Success/error/info messages
- **Loading Spinners**: Visual feedback during operations
- **Responsive Design**: Mobile, tablet, desktop support
- **Form Validation**: Client and server-side validation
- **Keyboard Navigation**: Tab, Enter shortcuts

## 🔒 Security Implementation

### JWT Authentication
```java
// Token generation
String token = jwtUtil.generateToken(username);

// Token validation
if (jwtUtil.validateToken(token)) {
    // Proceed with request
}
```

### Password Security
- BCrypt hashing (strength 10)
- No plain-text storage
- Secure password validation

### CORS Configuration
```java
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsConfig implements Filter {
    // Allows cross-origin requests from frontend
}
```

### Request Authorization
- JWT token required for protected endpoints
- User ownership validation on all operations
- Stateless session management

## 📝 Logging

### Configuration
Logs stored in: `logs/taskapp.log` (rolling daily, 30-day retention)

### Log Levels
- **Controllers**: DEBUG level (request/response tracking)
- **Security**: DEBUG level (auth events)
- **Hibernate**: DEBUG level (SQL queries)
- **Application**: INFO level (business logic)

### Sample Log Output
```
2025-12-31 14:40:15.469 [main] INFO  c.n.taskapp.TaskAppApplication - Started TaskAppApplication
2025-12-31 14:40:22.982 [nio-8080-exec-1] INFO  c.n.t.controller.AuthController - Login attempt for username: john
2025-12-31 14:40:23.123 [nio-8080-exec-1] INFO  c.n.t.controller.AuthController - User logged in successfully: john
```

## 🚀 Production Deployment

### Backend Deployment
```bash
# Build production JAR
mvn clean package -DskipTests

# Run with production profile
java -jar target/taskapp-1.0.0.jar --spring.profiles.active=prod
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Output in dist/ folder
# Deploy to Netlify, Vercel, or any static host
```

### Environment Variables
```bash
# Backend
export JWT_SECRET=your-secret-key-change-in-production
export DB_URL=jdbc:postgresql://your-db-host:5432/taskdb
export DB_USERNAME=taskuser
export DB_PASSWORD=secure-password

# Frontend
VITE_API_URL=https://your-backend-api.com/api
```

## 🧪 Testing

```bash
# Backend unit tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test

# Integration tests
mvn verify
```

## 📈 Performance Optimizations

- **Database Indexing**: Indexed on user_id, status, priority
- **Lazy Loading**: JPA relationships lazy-loaded
- **Connection Pooling**: HikariCP for efficient connections
- **Frontend Code Splitting**: React lazy loading
- **Caching**: Browser caching for static assets

## 🐛 Known Issues & Limitations

- File upload not yet implemented
- No real-time updates (WebSocket)
- Single-user task ownership (no sharing)
- Basic pagination (loads all tasks)

## 🔮 Future Enhancements

- [ ] File attachments for tasks
- [ ] Task sharing and collaboration
- [ ] Email notifications
- [ ] Calendar view integration
- [ ] Task templates
- [ ] Subtasks and checklists
- [ ] Time tracking
- [ ] Export to PDF/CSV
- [ ] Mobile native apps

## 📖 Development Best Practices Followed

✅ **Clean Architecture**: Layered structure (Controller → Service → Repository)  
✅ **SOLID Principles**: Single responsibility, dependency injection  
✅ **RESTful Design**: Proper HTTP methods, status codes  
✅ **Error Handling**: Global exception handlers, validation  
✅ **Security**: JWT, password hashing, CORS  
✅ **Logging**: Comprehensive application logging  
✅ **Documentation**: Clear README, inline comments  
✅ **Git**: Meaningful commits, feature branches  
✅ **Responsive**: Mobile-first design approach  
✅ **UX**: Loading states, error messages, confirmations  

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack development with Spring Boot + React
- RESTful API design and implementation
- JWT authentication and authorization
- Database design and ORM (JPA/Hibernate)
- Modern frontend development (hooks, routing)
- State management in React
- CSS frameworks (Tailwind CSS)
- Data visualization (charts)
- Application logging and monitoring
- Git version control workflow

## 👨‍💻 Developer

Developed as part of a full-stack development assessment.

## 📄 License

This project is created for educational and assessment purposes.

---

**🔔 Important Notes:**
- Change JWT secret in production
- Update database credentials
- Enable HTTPS in production
- Configure proper CORS origins
- Set up monitoring and alerts

**Happy Coding! 🚀**
