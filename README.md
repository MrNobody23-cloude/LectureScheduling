# Lecture Scheduling System (MERN Assessment)

Hi! This is my project for the MERN Stack Internship assessment. It is a simple website where an Admin can schedule lectures for different instructors, and instructors can log in to check their own schedule.

## Main Features

### 1. Unified Login
I made a single login page for everyone. The system is smart enough to know if you are an Admin or an Instructor based on your username.

### 2. Admin Panel
- **Add Courses**: Create new courses with names, levels (Beginner/Expert), and descriptions.
- **Add Lectures**: Pick a course, pick an instructor, and pick a date. The system checks if the instructor is already busy on that day to avoid double-booking.
- **Instructor List**: View all registered instructors.

### 3. Instructor Panel
- **My Schedule**: Once an instructor logs in, they see their own assigned lectures in a clean table with the date and course name. They don't see other instructors' data.

---

## Tech Stack Used
- **Frontend**: React.js (Vite)
- **Backend**: Node.js & Express
- **Database**: MySQL
- **Styling**: Vanilla CSS / Inline Styles

---

## How to Setup

### Backend Setup
1. Go to the `backend` folder.
2. Run `npm install`.
3. Create a `.env` file and add your MySQL details:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=lecturedb
   ```
4. Run the SQL commands (provided below) to create your tables.
5. Start the server: `npm start`.

### Frontend Setup
1. Go to the `frontend` folder.
2. Run `npm install`.
3. Create a `.env` file:
   ```env
   VITE_API=http://localhost:5000/api
   ```
4. Start the frontend: `npm run dev`.

---

## Database Tables (SQL)
You need two main tables for this to work:

```sql
CREATE TABLE instructors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  level VARCHAR(50),
  description TEXT,
  image VARCHAR(255)
);

CREATE TABLE lectures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  instructor_id INT,
  lecture_date DATE
);
```

---

## Login Credentials (For Testing)

- **Admin Login**:
  - Username: `admin`
  - Password: `admin123`

- **Instructor Login**:
  - Use any `name` and `password` you added to the `instructors` table.
  - (Example: If you add "John" with password "pass", use those).

---

## API Routes (Backend)

| Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/login` | Handles both Admin and Instructor logins |
| `GET` | `/api/courses` | Fetch all courses |
| `POST` | `/api/courses` | Add a new course |
| `GET` | `/api/instructors` | Fetch list of instructors |
| `POST` | `/api/lectures` | Schedule a new lecture |
| `GET` | `/api/lectures/:id` | Get lectures for a specific instructor |

---
*Created by Aaryan Patel for IdeaMagix Internship Assessment.*
