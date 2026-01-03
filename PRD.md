# MERN E-Commerce Store - Phase-Wise PRD

---

## Phase 1: MVP – Core E-Commerce Functionality (No Auth)

**Goal:** Build a fully functional e-commerce platform with basic CRUD operations and cart functionality.  

### Backend
- **Products API**
  - Create, Read, Update, Delete products  
  - Product fields: `title`, `description`, `price`, `category`, `image`  
- **Cart API**
  - Add product to cart  
  - Remove product from cart  
  - View cart  
- **Orders API**
  - Place order  
  - Fetch order details (basic)  

### Frontend
- **Home / Product Listing**
  - Display all products with image, title, price  
- **Product Detail Page**
  - Show product info  
  - Add to cart button  
- **Cart Page**
  - Display products added to cart  
  - Remove products  
  - Proceed to checkout button  
- **Checkout Page**
  - Confirm products and place order (no payment integration for MVP)  

### Deliverables
- Fully functional backend APIs for products, cart, and orders  
- React frontend pages integrated with backend  
- MongoDB collections: `products`, `cart`, `orders`  

---

## Phase 2: Authentication & User Management

**Goal:** Secure certain features and allow personalized experiences.  

### Backend
- **User API**
  - Signup and login endpoints  
  - Password hashing with bcrypt  
  - JWT authentication  
- Protect checkout and cart APIs so only logged-in users can access them  
- Optional: Role-based access (admin vs user)  

### Frontend
- **Auth Pages**
  - Signup form  
  - Login form  
- Update frontend pages to:
  - Show “Login/Signup” if user is not logged in  
  - Allow only logged-in users to add to cart or checkout  
- Optional: Admin panel for product management  

### Deliverables
- JWT-based authentication  
- Protected routes for checkout and admin actions  
- Frontend login/signup integrated with backend  

---

## Phase 3: Enhancements & Polish

**Goal:** Add advanced features for a more production-ready e-commerce experience.  

### Backend Enhancements
- Search products by name, category, or price  
- Update orders with status (`pending` → `completed`)  
- Optional: Email notifications using Nodemailer (order confirmation)  

### Frontend Enhancements
- Search bar and filters on product listing page  
- Order history page for logged-in users  
- Admin panel:
  - Add/Edit/Delete products  
  - View all orders  
- Optional: Responsive UI tweaks, animations, loading states  

### Deployment
- Frontend: Vercel  
- Backend: Render / Heroku / Railway  
- Database: MongoDB Atlas  

### Deliverables
- Fully functional e-commerce store with search, filter, and order history  
- Admin panel for product/order management  
- Deployed live project  

---

## Optional Phase 4: Advanced Features
- Payment gateway integration (Stripe/PayPal)  
- Product reviews and ratings  
- Wishlist feature  
- Cart quantity adjustments with live price updates  

---

