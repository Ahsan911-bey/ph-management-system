# 🏥 Pharmacy Management System (E-Commerce)

A full-stack, production-ready Pharmacy E-Commerce Storefront and Admin Dashboard. This project was built to demonstrate robust Database Systems principles, including complex relational mapping, strict CRUD operations, and transaction-safe order processing.

![Pharmacy Dashboard Mockup](https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200&auto=format&fit=crop) *(Example aesthetics)*

## ✨ Features

### 🛍️ Public E-Commerce Storefront
- **Modern UI**: A clean, medical-themed interface using Tailwind CSS and Lucide Icons.
- **Product Catalog**: Browse medicines by category or search. Real-time stock indicators.
- **Dynamic Shopping Cart**: Client-side persistent cart using React Context and `localStorage`.
- **Secure Checkout Flow**: Processes orders securely via Prisma `$transaction` to ensure database integrity (verifies live prices, prevents ordering out-of-stock items, and atomically decrements inventory).
- **Custom Authentication**: Cookie-based server-side session management (built strictly without NextAuth or JWTs for transparency and simplicity).

### 🛡️ Secure Admin Dashboard
- **Dashboard Analytics**: Real-time aggregated statistics (total revenue, low-stock warnings, total orders).
- **Medicines CRUD**: Full capability to Create, Read, Update, and Delete products with image URLs.
- **Categories CRUD**: Manage nested categories and relationships.
- **Order Management**: View detailed historical orders, track customer spending, and mark orders as "Completed" (safely deleting them).
- **Customer Tracking**: View lifetime value and order histories for registered users.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Server Components)
- **Database**: [MySQL 8](https://www.mysql.com/) (Running safely via Docker)
- **ORM**: [Prisma](https://www.prisma.io/) (Schema modeling, migrations, seeding, transactions)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### 1. Prerequisites
Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Must be running)

### 2. Installation & Setup

**Clone the repository:**
```bash
git clone <your-repo-url>
cd ph-management-system
```

**Install dependencies:**
```bash
npm install
```

### 3. Database Configuration

**Start the MySQL Database via Docker Compose:**
```bash
# This will pull MySQL 8 and start the database container in the background
docker compose up -d
```

**Configure Environment Variables:**
Ensure you have a `.env` file in the root directory. It should point to the Docker database:
```env
DATABASE_URL="mysql://root:root@localhost:3306/pharmacy"
```

### 4. Prisma ORM Setup

Sync the Prisma schema to the newly created database:
```bash
npx prisma db push
```

Populate the database with default categories, medicines, and the Admin user:
```bash
npx prisma db seed
```

### 5. Run the Application

Start the Next.js development server:
```bash
npm run dev
```

The application is now running at: **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Default Credentials

The `prisma/seed.ts` script automatically creates an admin account for you. 
Navigate to `http://localhost:3000/login` to access the Admin Dashboard.

- **Username**: `admin`
- **Password**: `admin123`

---

## 🏗️ Architecture & Database Notes

- **Transactions**: The checkout process uses `prisma.$transaction`. If a user attempts to buy a medicine but the stock decrement fails, the entire order is rolled back safely.
- **Cascading Deletes**: To maintain referential integrity, deleting a `Sale` (marking an order as completed) automatically cascades and deletes the associated `SaleItem` records. However, deleting a `Medicine` is restricted if it is actively linked to an existing order.
- **Auth Flow**: Uses HTTP-Only cookies to store session roles. The `middleware.ts` intercepts all requests to `/admin`, `/checkout`, and `/orders` to prevent unauthorized access, allowing seamless redirects to the login page via `callbackUrl`.

---
*Built as a Database Systems University Project.*
