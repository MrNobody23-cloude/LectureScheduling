import { useState, useEffect } from "react";
import API from "../../api";

export default function AddLecture() {
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [instructorId, setInstructorId] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        fetch(API + "/courses")
            .then((res) => res.json())
            .then((data) => setCourses(Array.isArray(data) ? data : []))
            .catch(() => setCourses([]));

        fetch(API + "/instructors")
            .then((res) => res.json())
            .then((data) => setInstructors(Array.isArray(data) ? data : []))
            .catch(() => setInstructors([]));
    }, []);

    const add = async () => {
        if (!courseId || !instructorId || !date) {
            alert("Please fill all fields");
            return;
        }

        const res = await fetch(API + "/lectures", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                course_id: Number(courseId),
                instructor_id: Number(instructorId),
                lecture_date: date,
            }),
        });

        const data = await res.json();
        alert(data.msg);

        if (res.ok) {
            setCourseId("");
            setInstructorId("");
            setDate("");
        }
    };

    return (
        <div>
            <h2>Add Lecture</h2>
            <div>
                <label>Course</label><br />
                <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                    <option value=""> Select Course </option>
                    {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <br />
            <div>
                <label>Instructor</label><br />
                <select value={instructorId} onChange={(e) => setInstructorId(e.target.value)}>
                    <option value=""> Select Instructor </option>
                    {instructors.map((i) => (
                        <option key={i.id} value={i.id}>{i.name}</option>
                    ))}
                </select>
            </div>
            <br />
            <div>
                <label>Lecture Date</label><br />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <br />
            <button onClick={add}>Assign Lecture</button>
        </div>
    );
}