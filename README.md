<!-- Delivery Dashboard – Admin Panel

A modern **Admin Dashboard** for managing delivery orders, built with **React**.  
Includes authentication system, protected routes, dark/light mode, loaders, and a clean UI.

 Features

- Admin Authentication
  - Admin Register
  - Admin Login
  - Auto Login using `localStorage`
  - Logout with confirmation modal

- Protected Routes
  - Only authenticated admins can access dashboard pages

- Orders Management
  - View all orders
  - Order details page
  - Order status (Pending / On The Way / Delivered)

- Dashboard Statistics
  - Total Orders
  - Pending Orders
  - On The Way Orders
  - Delivered Orders
  - Skeleton Loading while fetching data

- Theme System
  - Light / Dark mode using Context API

- Loading UX
  - Page Loader on route changes
  - Skeleton Loading for Dashboard

- Modern UI
  - Font Awesome icons
  - Clean & responsive layout

# Tech Stack

- React
- React Router v6
- Context API
- Axios
- JSON Server
- Font Awesome
- CSS

# Project Structure

    bash
src/
├── api/
├── components/
├── context/
├── layouts/
├── pages/
├── routes/
├── styles/
└── App.js

Installation & Setup

Install dependencies
  bash
npm install

Run JSON Server
bash
npx json-server --watch db.json --port 3001

# Start the app
  bash
npm start

# Database (db.json)
    json
{
  "orders": [],
  "admins": []
}
-->