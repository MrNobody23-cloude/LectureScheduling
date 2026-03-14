import { useState, useEffect } from "react";

import AddCourse from "./components/admin/AddCourse";
import CourseList from "./components/admin/CourseList";
import InstructorList from "./components/admin/InstructorList";
import AddLecture from "./components/admin/AddLecture";
import MyLectures from "./components/instructor/MyLectures";
import Login from "./components/Login";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(r);
      if (r === "instructor") setPage("myLectures");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole("");
    setPage("home");
  };

  if (!isLoggedIn) {
    return <Login onLogin={(r) => { 
      setIsLoggedIn(true); 
      setRole(r); 
      if (r === "instructor") setPage("myLectures");
    }} />;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{role === "admin" ? "Admin Dashboard" : "Instructor Panel"}</h1>
        <button onClick={logout} style={{ color: "red" }}>Logout</button>
      </div>

      {role === "admin" && (
        <>
          <div style={{ marginBottom: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={() => setPage("addCourse")}>Add Course</button>
            <button onClick={() => setPage("courseList")}>Course List</button>
            <button onClick={() => setPage("instructors")}>Instructors</button>
            <button onClick={() => setPage("addLecture")}>Add Lecture</button>
          </div>
          <hr />
        </>
      )}

      {page === "addCourse" && role === "admin" && <AddCourse />}
      {page === "courseList" && role === "admin" && <CourseList />}
      {page === "instructors" && role === "admin" && <InstructorList />}
      {page === "addLecture" && role === "admin" && <AddLecture />}
      {page === "myLectures" && <MyLectures />}

    </div>
  );
}

export default App;