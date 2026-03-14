import { useState } from "react";
import API from "../../api";

export default function AddCourse() {
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");
    const [description, setDescription] = useState("");
    const [imageName, setImageName] = useState("");

    const add = async () => {
        if (!name || !level || !description) {
            alert("Please fill all fields");
            return;
        }

        const res = await fetch(API + "/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                level,
                description,
                image: imageName,
            }),
        });

        const data = await res.json();
        alert(data.msg || "Done");

        setName("");
        setLevel("");
        setDescription("");
        setImageName("");
    };

    return (
        <div>
            <h2>Add Course</h2>
            <div>
                <label>Name</label><br />
                <input
                    value={name}
                    placeholder="Course Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <br />
            <div>
                <label>Level</label><br />
                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value=""> Select Level </option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            <br />
            <div>
                <label>Description</label><br />
                <textarea
                    value={description}
                    placeholder="Course Description"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <br />
            <div>
                <label>Image</label><br />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageName(e.target.files[0] ? e.target.files[0].name : "")}
                />
            </div>
            <br />
            <button onClick={add}>Add Course</button>
        </div>
    );
}