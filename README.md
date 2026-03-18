-# 🛍️ Ecommerce Website - School Essentials 🎒📚

## 📌 Overview

This is an eCommerce website designed for selling school uniforms, accessories, and stationery items. The platform provides an easy shopping experience for students, parents, and schools looking for high-quality educational supplies.

## Preview

![Shree Namrata Desktop preview](https://res.cloudinary.com/de4cxdtfv/image/upload/v1761470724/front_1_ztjuch.png "Front view")
![Shree Namrata Desktop preview](https://res.cloudinary.com/de4cxdtfv/image/upload/v1761470724/front_2_x9xe0r.png "Front view")
![Shree Namrata Desktop preview](https://res.cloudinary.com/de4cxdtfv/image/upload/v1761470729/front_3_tykh53.png "Front view")
![Shree Namrata Desktop preview](https://res.cloudinary.com/de4cxdtfv/image/upload/v1761470742/product_preview_dl9sn5.png "Product view")
![Shree Namrata Error-page preview](https://res.cloudinary.com/de4cxdtfv/image/upload/v1761494580/Screenshot_2025-10-26_212744_m1ybwv.png "Error Dyanmic Page")
![Shree Namrata Mobile preview](https://res.cloudinary.com/de4cxdtfv/image/upload/v1761470735/mobile_view_ypgldz.png "Mobile view")
![Shree Namrata Mobile sidebar preview](https://res.cloudinary.com/de4cxdtfv/image/upload/v1761470746/sidebar_phvqts.png "Mobile Sidebar view")

## ✨ Features

- **📱 Responsive Design**: The website is optimized for desktop and mobile devices.
- **📦 Product Categories**: Users can browse through school uniforms, accessories,stationery items etc.
- **🔎 Search Functionality**: A responsive search bar allows users to quickly find products.
- **🔐 User Authentication**: Login and Sign-up options for personalized experiences.
- **🛒 Shopping Cart**: Easily add and manage items before checkout.
- **🚚 Order Tracking**: Users can track their orders in real-time.
- **💳 Secure Payment Options**: Supports multiple payment methods.
- **📩 Newsletter Subscription**: Stay updated with the latest school essentials and offers.
- **🌍 Multi-Language Support**: Reach a wider audience with language options.
- **📊 Admin Dashboard**: Manage orders, products, and customers efficiently.
- **🎁 Discount & Offers**: Special promotions and discounts available for students.
- **🛠️ 24/7 Customer Support**: Get help anytime with dedicated support.
- **💬 Live Chat Feature**: Instant communication with customers.

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript , JQuery , EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB,Cloudinary
- **DevOps**: Git,Github,Docker
- **Icons**: Ionicons
- **Styling**: Poppins Font, Gradient Backgrounds

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/nileshpratapsingh/School-Essential-website-E-commerce.git
   ```
2. Navigate to the project folder:
   ```sh
   cd <clone-directory-name>
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Then navigate to backend folder and install dependencies:
   ```sh
   cd backend
   npm install
   ```
5. Start the server:
   ```sh
   npm run express
   ```
   or
   ```
   npm run start
   ```

## Project Structure

```
School-Essential-Ecommerce-Website:.
│   │
│   ├───.gitignore
│   ├───Dockerfile
│   ├───favicon.ico
│   ├───git-logs.txt
│   ├───LICENSE
│   ├───package-lock.json
│   ├───package.json
│   ├───structure.txt
│   ├───website logg.txt
│   └───README.md
│
├───backend
│   │
│   ├───.env
│   ├───debug.log
│   ├───express-server.mjs
│   ├───package-lock.json
│   ├───package.json
│   ├───server.mjs
│   ├───testing.mjs
│   │
│   ├───config
│   │   ├───cloudinary.mjs
│   │   ├───config.mjs
│   │   ├───data.mjs
│   │   ├───database.mjs
│   │   ├───passport.mjs
│   │   ├───pgsql.mjs
│   │   ├───razorpay.mjs
│   │   ├───redis.mjs
│   │   └───sessionId.mjs
│   │
│   ├───controller
│   │   ├───admin.controller.mjs
│   │   ├───auth.controller.mjs
│   │   ├───cart.controller.mjs
│   │   ├───message.controller.mjs
│   │   ├───order.controller.mjs
│   │   ├───payment.controller.mjs
│   │   ├───product.controller.mjs
│   │   └───views.controller.mjs
│   │
│   ├───middleware
│   │   ├───404notFoundhandler.mjs
│   │   ├───adminProtectedPath.mjs
│   │   ├───cloudinaryUpload.mjs
│   │   ├───errorHandler.mjs
│   │   ├───loginProtectedPath.mjs
│   │   └───loginRestriction.mjs
│   │
│   ├───models
│   │   ├───cart.model.mjs
│   │   ├───message.model.mjs
│   │   ├───order.model.mjs
│   │   ├───product.model.mjs
│   │   └───user.model.mjs
│   │
│   ├───pgsqlModels
│   │   ├───baseModel.js
│   │   ├───cartModel.js
│   │   ├───order.model.js
│   │   ├───productModel.js
│   │   └───userModel.js
│   │
│   ├───routes
│   │   ├───admin.mjs
│   │   ├───auth.mjs
│   │   ├───cart.mjs
│   │   ├───order.mjs
│   │   ├───product.mjs
│   │   └───views.mjs
│   │
│   └───utility
│       ├───registerMiddleware.mjs
│       ├───registerRouter.mjs
│       └───tokenUtility.mjs
│
└───Frontend
    │
    ├───scripts
    │   ├───adminData.js
    │   ├───api.js
    │   ├───cart.js
    │   ├───Chat-Bot-script.js
    │   ├───data-sets.js
    │   ├───jQuery-Script.js
    │   ├───payment-processing.js
    │   ├───refreshdata.js
    │   ├───script.js
    │   └───searchBar.js
    │
    ├───styles
    │   └───style.css
    │
    └───views
        ├───admin
        │   ├───add-admin.ejs
        │   ├───add-product.ejs
        │   ├───admin-dashboard.ejs
        │   ├───edit-product.ejs
        │   ├───message.ejs
        │   ├───remove-product.ejs
        │   └───users-list.ejs
        │
        ├───pages
        │   ├───about.ejs
        │   ├───account.ejs
        │   ├───cart.ejs
        │   ├───chatbot.ejs
        │   ├───checkout.ejs
        │   ├───contact.ejs
        │   ├───edit-profile.ejs
        │   ├───error.ejs
        │   ├───feedback.ejs
        │   ├───index.ejs
        │   ├───login.ejs
        │   ├───order.ejs
        │   ├───product-preview.ejs
        │   ├───product.ejs
        │   ├───profile.ejs
        │   ├───signUp.ejs
        │   ├───stationary.ejs
        │   ├───uniform-ui.ejs
        │   └───uniform.ejs
        │
        ├───partials
        │   ├───chatbot-footer.ejs
        │   ├───chatbot-head.ejs
        │   ├───chatbot-header.ejs
        │   ├───footer.ejs
        │   ├───head.ejs
        │   ├───header.ejs
        │   ├───loading-screen.ejs
        │   ├───other-service-list.ejs
        │   ├───product-list.ejs
        │   ├───service-list.ejs
        │   └───sidebar.ejs
        │
        └───school-components
            ├───school-list.ejs
            ├───school-selection.ejs
            └───uniform-selection.ejs
```

### 📂 backend

- `config/` – Configuration files like DB, environment setup.
- `controller/` – Request handlers (business logic).
- `middleware/` – Protected,admin protected routes etc, definitions.
- `models/` – MongoDB or Mongoose schemas.
- `routes/` – API route definitions.
- `utility/` – Utility functions files (genrate token, genrate access token etc.)

### 📂 frontend/public

- `Animation/` – Lottie or SVG animation files.
- `Images/` – Static images.
- `scripts/` – JavaScript frontend logic.
- `styles/` – CSS files.
- `views/` – EJS Template
  - `admin/` – Admin panel templates.
  - `pages/` – Site pages (home, about, etc.).
  - `partials/` – Reusable template components.
  - `school-components/` – Custom components for school use.

## 🤝 Contributing

We welcome contributions! Feel free to submit pull requests for improvements.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

## 🌟 Contact

For any queries or suggestions, feel free to reach out:

- 📧 Email: nileshpratap190902@gmail.com
- 🌐 Website: [www.ShreeNamrataDressesandTailors.com](https://school-essential-website-e-commerce.onrender.com/)
- 📱 Social Media: [![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100025358221368) [![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/ShriNamrata7951) [![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/nilesh_pratap_singh666?igsh=MTlwMHVqMmJlZ2puOA==)
