A full-stack food delivery application built with the MERN stack. This platform allows users to browse menus, manage their carts, and place orders, while providing a comprehensive admin panel for restaurant management.

🔗 **Live Demo:** (https://food-dev-client.vercel.app/)
**⚠️ Note on Initial Load:** This application is hosted on a free Render instance. The server may go to sleep after periods of inactivity. If the app seems slow to load initially, please allow **up to 1 minute** for the backend services to wake up.

## Features

### User Features
* **Secure Authentication:** User login and registration system secured with **JWT (JSON Web Tokens)**.
* **Menu Filtering:** dynamic menu filtering allowing users to sort dishes by category (e.g., Salad, Rolls, Deserts).
* **Dynamic Cart:** Users can easily add items, adjust quantities, or remove items from their cart in real-time.
* **Order Placement:** Seamless checkout process.

### Admin Panel
* **Product Management:** Admins can add new dishes (with images) and delete existing dishes.
* **Order Management:** Real-time order tracking with the ability to update statuses:
    * *Processing* → *Out for Delivery* → *Delivered*.

## Tech Stack

**Frontend:**
* React.js
* Vite
* Context API (State Management)
* CSS / CSS Modules

**Backend:**
* Node.js
* Express.js
* JWT (Authentication)
* Multer (Image Uploads)

**Database:**
* MongoDB (NoSQL)

### Prerequisites
* Node.js installed
* MongoDB installed or a MongoDB Atlas connection string


