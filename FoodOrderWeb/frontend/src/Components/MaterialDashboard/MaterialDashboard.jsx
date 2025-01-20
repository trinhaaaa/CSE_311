import React, { useEffect, useState } from "react";
import "./MaterialDashboard.css";

const MaterialDashboard = () => {
    const [materials, setMaterials] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState("Connecting...");

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081");

        ws.onopen = () => {
            console.log("WebSocket connected!");
            setConnectionStatus("Connected");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMaterials(data);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected!");
            setConnectionStatus("Disconnected");
        };

        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
            setConnectionStatus("Error");
        };

        return () => ws.close();
    }, []);

    return (
        <div>
            <h1>Material Dashboard</h1>
            <p>Status: {connectionStatus}</p>
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
