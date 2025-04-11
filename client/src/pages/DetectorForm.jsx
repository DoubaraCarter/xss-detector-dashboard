import { useState } from "react";

function DetectorForm() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, ip: "127.0.0.1" }),
      });

      const data = await res.json();
      setResponse(data.log);
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2 font-semibold">Test Input:</label>
        <textarea
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type or paste suspicious input..."
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Scan
        </button>
      </form>

      {response && (
        <div className="p-4 bg-gray-100 border rounded">
          <p><strong>IP:</strong> {response.ip}</p>
          <p><strong>Severity:</strong> {response.severity}</p>
          <p><strong>Malicious:</strong> {response.isMalicious ? "Yes" : "No"}</p>
          <p><strong>Detected At:</strong> {new Date(response.detectedAt).toLocaleString()}</p>
          <p><strong>Matched Patterns:</strong></p>
          <ul className="list-disc list-inside">
            {response.matchedPatterns.map((match, i) => <li key={i}>{match}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DetectorForm;
