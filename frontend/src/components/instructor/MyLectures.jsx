import { useEffect, useState } from "react";
import API from "../../api";

export default function MyLectures() {
    const [data, setData] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (role === "admin") {
            fetch(API + "/instructors").then(res => res.json()).then(setInstructors);
        } else {
            fetchData(userId);
        }
    }, []);

    const fetchData = (id) => {
        const tid = id || selectedId;
        if (!tid) return;
        fetch(API + "/lectures/" + tid)
            .then(res => res.json())
            .then(setData);
    };

    return (
        <div>
            <h2>{role === "admin" ? "All Lectures" : "My Schedule"}</h2>

            {role === "admin" && (
                <div style={{ marginBottom: "20px" }}>
                    <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                        <option value="">Choose Instructor</option>
                        {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                    </select>
                    <button onClick={() => fetchData()}>View</button>
                </div>
            )}

            {data.length > 0 ? (
                <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f4f4f4" }}>
                            <th>Course Name</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(l => (
                            <tr key={l.id}>
                                <td>{l.course_name}</td>
                                <td>{new Date(l.lecture_date).toDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No lectures found.</p>
            )}
        </div>
    );
}