# MathHelper - Project Memory

## 🏗 Architecture Summary
- **Type:** Full-stack application.
- **Frontend:** React + TypeScript + Vite (located in `/frontend`).
- **Backend:** Python + FastAPI (located in `/backend`).
- **Database:** PostgreSQL running via Docker Compose (`mathhelper-db`).
- **CI/CD:** GitHub Actions configured for Azure Static Web Apps (Frontend) and Azure App Service (Backend/Linux).

## 🧠 Custom Logic & Rules
- **Multiplication:** Standard grid-based generation.
- **Addition:** Standard grid-based generation.
- **Subtraction:** 
    - Rule: Minuend (top) >= Subtrahend (bottom).
    - Validation: UI prevents Subtrahend digits from exceeding Minuend digits.
- **Division:**
    - Layout: Standard "Long Division" (Bus Stop) style.
    - Rule: Divisor (left) <= Quotient (answer). 
    - Generation: Calculated as `divisor * quotient = dividend` to ensure whole numbers with no remainders.
    - Validation: UI prevents Divisor digits from exceeding Dividend digits.

## 🛠 Local Setup Notes
- **Docker:** Postgres container name is `mathhelper-db`.
- **Python:** Virtual environment is located at `backend/.venv`.
- **Port:** Backend runs on `localhost:8000`.

## 🚀 Future Goals
- Add "High Score" or "Progress Tracking" using the Postgres database.
- Add more math domains (Addition, Subtraction, Division logic is already established).
- Maintain clean, printable layouts as the primary output.
