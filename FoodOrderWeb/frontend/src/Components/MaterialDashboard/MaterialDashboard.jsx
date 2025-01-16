import React, { useEffect, useState } from "react";
import "./MaterialDashboard.css";
const MaterialDashboard = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMaterials(data);
        };

        return () => ws.close();
    }, []);

    return (
        <div>
            <h1>Material Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Current Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.length > 0 ? (
                        materials.map((material) => (
                            <tr key={material.id}>
                                <td>{material.id}</td>
                                <td>{material.name}</td>
                                <td>{material.current_weight} kg</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialDashboard;
