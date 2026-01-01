# Setup Instructions

## Database Configuration

1. Copy the template configuration:
   ```bash
   cp backend/src/main/resources/application.yml.example backend/src/main/resources/application.yml
   ```

2. Edit `application.yml` with your actual credentials:
   ```yaml
   spring:
     datasource:
       username: taskuser
       password: taskpass
   
   jwt:
     secret: your-secure-secret-key
   ```

3. Make sure PostgreSQL is running:
   ```bash
   sudo service postgresql start
   ```

4. Create the database (if not exists):
   ```sql
   CREATE DATABASE taskdb;
   CREATE USER taskuser WITH PASSWORD 'taskpass';
   GRANT ALL PRIVILEGES ON DATABASE taskdb TO taskuser;
   ```

## Running the Application

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Security Notes

- Never commit `application.yml` to Git (it's in .gitignore)
- Use strong passwords and secrets in production
- Change default credentials before deployment
