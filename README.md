# Canteen Connect 

Canteen Connect is a full-stack web application designed to digitize and streamline the food ordering process in a college canteen. It allows students to browse a live menu, place orders, and track their order status, while enabling canteen staff to manage incoming orders, update order progress, and control menu availability through a centralized dashboard.

The project focuses on solving real-world inefficiencies such as long queues, order miscommunication, and lack of transparency in traditional canteen systems.

---

##  Features

### Student Features
- View dynamic canteen menu
- Select items and quantities
- Place food orders
- Receive order confirmation
- Track order status in real time

### Canteen/Admin Features
- Secure admin access
- View incoming orders
- Update order status (Placed → Preparing → Ready → Collected)
- Add, edit, or remove menu items
- Toggle item availability

---

## Tech Stack

- **Frontend:** React.js / HTML, CSS, JavaScript  
- **Backend:** Node.js with Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **API Architecture:** RESTful APIs  
- **Version Control:** Git & GitHub  

---

##  System Architecture Overview

- The frontend communicates with the backend using RESTful HTTP APIs.
- The backend handles authentication, business logic, and data validation.
- MongoDB is used for persistent storage of users, menu items, and orders.
- Role-based access control ensures that students and canteen staff have appropriate permissions.

---

##  Core Data Models

### User
- Name
- Email
- Role (Student / Canteen)
- Encrypted Password

### Menu Item
- Item Name
- Price
- Availability Status

### Order
- User Reference
- Ordered Items & Quantities
- Order Status
- Timestamp

---

##  Security Considerations

- Passwords are securely hashed
- JWT-based authentication for protected routes
- Role-based authorization for admin actions
- Input validation and error handling

---

##  Current Status

This project is under active development and represents a functional prototype demonstrating full-stack application design and implementation. Additional features and optimizations can be added to enhance scalability and user experience.

---

##  Future Enhancements

- Online payment integration
- Real-time updates using WebSockets
- Order analytics and reports
- Inventory management
- Notification system (email / push)
- Mobile application support

---

##  Learning Outcomes

This project demonstrates:
- Full-stack web development
- REST API design
- Database modeling
- Authentication & authorization
- Real-world workflow handling
- Clean project structuring and version control

---

##  Author

**Soham Shinde**  
GitHub: [SohamGits](https://github.com/SohamGits)

---

## 📄 License

This project is for educational purposes.
