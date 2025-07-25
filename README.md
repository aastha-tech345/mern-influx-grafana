# MERN + InfluxDB + Grafana Realtime Monitoring Project

Is project me MERN Stack, InfluxDB aur Grafana ko integrate kiya gaya hai, jisme tum real-time temperature ya sensor data ko log karke easily visualize kar sakte ho.

## Tech Stack

- MongoDB - Application database
- Express.js - Backend API server
- React.js - Frontend UI
- Node.js - Backend runtime
- InfluxDB 2.x - Time-series database for metrics
- Grafana - Dashboards and monitoring
- Docker Compose - Container orchestration

---

## Features

- Real-time data logging to InfluxDB
- Grafana dashboards for beautiful visualizations
- Complete MERN stack for application management
- Fully Dockerized for easy deployment

---

## How to Run the Project

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/mern-influx-grafana.git
cd mern-influx-grafana
Step 2: Start All Services Using Docker
bash
Copy
Edit
docker compose up -d
Check Services:

InfluxDB UI → http://localhost:8087

Grafana UI → http://localhost:3000

Default Credentials:

InfluxDB → Username: admin | Password: admin123

Grafana → Username: admin | Password: admin123

Step 3: Generate InfluxDB Token
Open InfluxDB UI: http://localhost:8087

Login using admin credentials

Navigate to → Data → API Tokens → Generate Token

Copy the generated token

Step 4: Start Backend Server
bash
Copy
Edit
cd backend
npm install
INFLUX_URL=http://localhost:8087 INFLUX_TOKEN=YAHAN_TUMHARA_TOKEN npm start
Backend API runs at: http://localhost:5000

Step 5: Start Frontend React Application
cd frontend
npm install

REACT_APP_BACKEND_URL=http://localhost:5000 npm start
Frontend runs at: http://localhost:3001

Edit
docker compose up -d           # Start all containers
docker compose down -v         # Stop & remove containers & volumes
docker logs <container_name>   

mern-influx-grafana/
├── backend/           # Node.js Express API
├── frontend/          # React UI
├── docker-compose.yml
├── README.md
