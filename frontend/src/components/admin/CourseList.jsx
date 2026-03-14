import { useEffect, useState } from "react";
import API from "../../api";

export default function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch(API + "/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data));
    }, []);

    return (
        <div>
            <h2>Course List</h2>

            {courses.map((c) => (
                <div key={c.id}>
                    <p>Name: {c.name}</p>
                    <p>Level: {c.level}</p>
                    <p>Description: {c.description}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}