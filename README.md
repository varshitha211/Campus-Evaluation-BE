24PA5A4501

Overview

This repository contains the backend solutions developed for the Campus Evaluation assessment. The repository includes independent modules for logging middleware, notification processing, vehicle scheduling, and system design documentation.

Repository Structure

Campus-Evaluation-BE/
├── logging-middleware/
├── notification-app-be/
├── vehicle-scheduler-be/
├── notification_system_design.md
├── README.md
└── .gitignore

Projects

Logging Middleware

A reusable middleware component for logging API requests and responses to improve debugging and monitoring.

Notification App Backend

Retrieves notifications from the evaluation service, filters unread notifications, prioritizes them based on business rules, and displays the highest-priority notifications.

Vehicle Scheduler Backend

Implements the 0/1 Knapsack Dynamic Programming algorithm to optimize vehicle maintenance scheduling based on available mechanic hours and impact scores.

Technologies Used

- Node.js
- JavaScript (ES6)
- Axios

Installation

Clone the repository and install dependencies for each project.

git clone <repository-url>
cd Campus-Evaluation-BE

cd logging-middleware
npm install

cd ../notification-app-be
npm install

cd ../vehicle-scheduler-be
npm install

Running the Projects

Logging Middleware

cd logging-middleware
node index.js

Notification App Backend

cd notification-app-be
node index.js

Vehicle Scheduler Backend

cd vehicle-scheduler-be
node index.js

Documentation

The repository includes "notification_system_design.md", which covers:

- Stage 1 – Requirements Gathering
- Stage 2 – High-Level Design
- Stage 3 – Database Design
- Stage 4 – API Design
- Stage 5 – Scalability
- Stage 6 – Security & Monitoring

Author

Submitted as part of the Campus Evaluation Backend Assessment.
