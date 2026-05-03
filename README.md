# MathHelper

A fun and educational math practice application for kids, built with a modern full-stack architecture.

## 🏗 Project Structure

- **`/frontend`**: React + TypeScript + Vite + Tailwind CSS. A unified UI with a landing page and various math domains.
- **`/backend`**: Python + FastAPI. The engine for math logic, problem generation, and (future) progress tracking.

---

## 🚀 Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🛠 CI/CD & Deployment (GitHub Actions)

To enable automated deployments to Azure, you must configure the following in your GitHub Repository under **Settings > Secrets and variables > Actions**.

### 🔐 Secrets
| Name | Description |
| :--- | :--- |
| `AZURE_CREDENTIALS` | The JSON output from the Azure CLI command for Service Principal authentication. |
| `FRONTEND_STATIC_WEB_APPS_API_TOKEN` | The deployment token for your Azure Static Web App. |

### 📋 Variables
| Name | Example Value | Description |
| :--- | :--- | :--- |
| `BACKEND_APP_NAME` | `mathhelper-api` | Unique name for the Azure App Service (Python). |
| `RESOURCE_GROUP` | `MathHelper-RG` | Your Azure Resource Group name. |
| `LOCATION` | `eastus` | The Azure region for deployment. |

---

## ❤️ Features
- [x] Fun Landing Page
- [x] Customizable Multiplication Practice
- [x] Printable Practice Sheets & Answer Keys
- [x] Full-Stack Ready (FastAPI + React)
- [ ] Addition (Coming Soon)
- [ ] Subtraction (Coming Soon)
- [ ] Division (Coming Soon)
- [ ] High Score System (Coming Soon)
