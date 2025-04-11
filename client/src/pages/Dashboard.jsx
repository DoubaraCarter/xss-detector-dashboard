import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch XSS logs every 3 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:5000/api/logs')  // Ensure the endpoint is correct
        .then(response => {
          setLogs(response.data);  // Update state with logs
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching logs", err);
          setLoading(false);
        });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Data for the chart (XSS severity over time)
  const chartData = logs.map(log => ({
    time: log.timestamp,  // Assuming timestamp is in the log
    high: log.severity === 'high' ? 1 : 0,
    medium: log.severity === 'medium' ? 1 : 0,
    low: log.severity === 'low' ? 1 : 0,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-center mb-5">XSS Attack Detector Dashboard</h1>

      {loading ? (
        <div className="text-center text-xl">Loading logs...</div>
      ) : (
        <>
          {/* Chart for XSS attacks over time */}
          <div className="mb-8">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="high" stroke="#ff0000" dot={false} />
                <Line type="monotone" dataKey="medium" stroke="#ffa500" dot={false} />
                <Line type="monotone" dataKey="low" stroke="#008000" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* List of recent XSS attempts */}
          <div className="overflow-auto max-h-60 mb-5">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-200">Time</th>
                  <th className="px-4 py-2 bg-gray-200">IP</th>
                  <th className="px-4 py-2 bg-gray-200">Severity</th>
                  <th className="px-4 py-2 bg-gray-200">Matches</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2">{log.ip}</td>
                    <td className="px-4 py-2">{log.severity}</td>
                    <td className="px-4 py-2">{log.matches.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
