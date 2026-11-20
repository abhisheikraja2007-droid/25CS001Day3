# AgroPulse ERP — Precision IoT & Agri-Ledger Management Platform

[![Java](https://img.shields.io/badge/Java-21-orange.svg?logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue.svg?logo=react&logoColor=white)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/Database-MySQL%208.0-blue.svg?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An enterprise-grade, offline-capable Agricultural Enterprise Resource Planning (ERP) platform combining real-time IoT irrigation telemetry, farm service billing, crop procurement, and double-entry ledger reconciliation.

---

## 📌 System Architecture & Key Capabilities

1. **Agri-Ledger & General Ledger Reconciliation**
   - Automated double-entry book-keeping for seed procurement, fertilizer distribution, and crop sales.
   - Farmer, vendor, and distributor account balance tracking with credit limit validation.

2. **Precision Farm Telemetry & Irrigation Dispatch**
   - Ingestion of soil moisture, ambient temperature, and humidity metrics.
   - Automated irrigation pump activation rules based on agronomic thresholds.

3. **Master Data & Contact Management**
   - Multi-tier contact directory categorizing farmers, suppliers, logistics agents, and buyers.
   - Comprehensive SKU product catalog tracking unit costs, category tags, and dynamic sales pricing.

4. **Modern High-Contrast Operator Dashboard**
   - Fast React + Vite single-page dashboard designed for agronomy field operators.
   - Real-time stock status, telemetry stream indicators, and automated invoice PDF/receipt generation.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Backend Core** | Java 21 LTS, Spring Boot 3, Spring Data JPA, Hibernate |
| **Database** | MySQL 8.0, JDBC Driver (`setup.sql` schema migration) |
| **Frontend UI** | React 18, TypeScript, Tailwind CSS, Vite |
| **API Architecture** | RESTful HTTP JSON with CORS pre-flight handlers |
| **Build Tools** | Apache Maven (Backend), npm / Vite (Frontend) |

---

## 📂 Project Structure

```
day 3 java + dbms/
├── pom.xml                # Spring Boot Maven build definition
├── setup.sql              # MySQL schema & initial seed dataset (40+ contacts & products)
├── package.json           # Frontend dependencies & build scripts
├── vite.config.ts         # Vite bundler configuration
├── src/                   # React frontend application & UI components
└── src/main/java/         # Spring Boot controllers, entities, and repositories
```

---

## 🚀 Getting Started

### 1. Database Setup
Ensure MySQL is running, then execute the schema initialization:
```sql
mysql -u root -p < setup.sql
```

### 2. Backend Service
Configure your database credentials in `src/main/resources/application.properties` and start the server:
```bash
./mvnw clean spring-boot:run
```
The REST API will be accessible at `http://localhost:8080`.

### 3. Frontend Client
```bash
npm install
npm run dev
```
The application UI will launch at `http://localhost:5173`.

---

## 📝 License
This project is licensed under the MIT License.
