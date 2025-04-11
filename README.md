# Real-Time XSS Attack Detector Dashboard

## Overview
The **Real-Time XSS Attack Detector Dashboard** is a powerful tool designed to detect and visualize **Cross-Site Scripting (XSS)** attacks in real time. It features an interactive **React.js** frontend that dynamically displays attack data, severity levels, and other relevant metrics. The backend is built with **Node.js** and serves as the core system for processing and detecting XSS payloads.

The dashboard provides insightful visualizations and allows users to track attack patterns and trends over time, giving security teams actionable data to mitigate vulnerabilities.

---

## Features

- **Real-time XSS Detection**: Monitor and detect XSS attacks as they occur in real time.
- **Interactive Dashboard**: Visualize attack data through charts, including severity distribution (high, medium, low).
- **Logs Table**: View recent XSS attempts with detailed information (timestamp, IP, severity, matches).
- **Severity Classification**: Automatic classification of attacks into high, medium, or low severity based on the number of matches.
- **Real-Time Updates**: Periodically refresh the data every 3 seconds to keep the dashboard up-to-date.
- **Responsive Design**: Optimized for both desktop and mobile use with Tailwind CSS.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js
- **XSS Detection**: Regular expressions for pattern matching and attack detection
- **Database**: In-memory storage (could be expanded to use a persistent database like MongoDB)
- **Real-time Features**: Periodic fetching using `setInterval` for live updates

---

   
