import { useEffect, useState } from "react";
import API from "../../api";

export default function InstructorList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(API + "/instructors")
            .then((res) => res.json())
            .then((d) => setData(Array.isArray(d) ? d : []))
            .catch(() => setData([]));
    }, []);

    return (
        <div>
            <h2>Instructors</h2>
            {data.length === 0 ? (
                <p>No instructors found.</p>
            ) : (
                <table width="100%" border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((i) => (
                            <tr key={i.id}>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}