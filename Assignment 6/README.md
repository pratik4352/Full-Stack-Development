# Assignment 6 - Used Item E-commerce + Appointment Booking

This project is a simple combination of used-item listing (car/bike etc.) and appointment booking using Node.js, Express, and a local JSON database (lowdb).

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Ensure local DB path exists:
   - `mkdir C:\data\db` (not required for lowdb; data file is `Assignment 6/db.json`)

3. Run server:

   ```bash
   npm run dev
   ```

4. Open browser:

   `http://localhost:5000`

## Features

- CRUD for used items
- Appointment booking per item
- Front-end in `public/`
- REST API endpoints under `/api/`

## API

- GET `/api/items`
- POST `/api/items`
- GET `/api/items/:id`
- PUT `/api/items/:id`
- DELETE `/api/items/:id`
- POST `/api/items/:id/book`
- GET `/api/bookings`
