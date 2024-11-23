# **Stationery Shop API**

An Express.js application with TypeScript for managing a Stationery Shop. The API integrates MongoDB using Mongoose for data storage and provides features to manage stationery products and orders. It ensures data validation and includes robust error handling.

---

## **Features**

- **Stationery Product Management:**
  - Create, read, update, and delete stationery products.
  - Search products by name, brand, or category.
- **Order Management:**
  - Place orders for stationery products.
  - Update product inventory and manage stock availability.
  - Handle insufficient stock scenarios gracefully.
- **Revenue Calculation:**
  - Calculate total revenue from all orders using MongoDB aggregation.
- **Data Validation:**
  - Schema-based validation for products and orders.
  - Handles invalid data and returns user-friendly error messages.

---

## **API Endpoints**

### **1. Stationery Product Endpoints**

#### **Create a Product**

- **Endpoint:** `POST /api/products`
- **Request Body:**
  ```json
  {
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true
  }
  ```
- **Response:**
  - Success message with product details.
  - Handles validation errors for required fields and invalid data types.

---

#### **Get All Products**

- **Endpoint:** `GET /api/products`
- **Query:** `searchTerm` (optional - `name`, `brand`, `category`)
- **Response:**
  ```json
  {
    "message": "Products retrieved successfully",
    "status": true,
    "data": [
      // List of products
    ]
  }
  ```

---

#### **Get a Product by ID**

- **Endpoint:** `GET /api/products/:productId`
- **Response:** Success message with the product details or a 404 error if not found.

---

#### **Update a Product**

- **Endpoint:** `PUT /api/products/:productId`
- **Request Body:** Fields to update (e.g., `price`, `quantity`).
- **Response:**
  ```json
  {
    "message": "Product updated successfully",
    "status": true,
    "data": {
      // Updated product details
    }
  }
  ```

---

#### **Delete a Product**

- **Endpoint:** `DELETE /api/products/:productId`
- **Response:** Success message confirming deletion.

---

### **2. Order Endpoints**

#### **Place an Order**

- **Endpoint:** `POST /api/orders`
- **Request Body:**
  ```json
  {
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 36
  }
  ```
- **Response:**
  - Success message with order details.
  - Validates inventory availability before placing the order.

---

#### **Calculate Total Revenue**

- **Endpoint:** `GET /api/orders/revenue`
- **Response:**
  ```json
  {
    "message": "Revenue calculated successfully",
    "status": true,
    "data": {
      "totalRevenue": 720
    }
  }
  ```

---

## **Technologies Used**

- **Backend Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **ODM:** [Mongoose](https://mongoosejs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **API Documentation:** Swagger/OpenAPI

---

## **Setup Instructions**

### **1. Prerequisites**

- Node.js installed on your system (v16+ recommended).
- MongoDB instance running locally or on the cloud.
- Git for version control.

### **2. Clone the Repository**

```bash
git clone https://github.com/ShejanMahamud/stationery-shop-api.git
cd stationery-shop-api
```

### **3. Install Dependencies**

```bash
npm install
```

### **4. Environment Variables**

Create a `.env` file in the project root with the following:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

### **5. Run the Application**

```bash
npm run dev
```

### **6. Access the API**

- Base URL: `http://localhost:3000`
- Swagger Docs: `http://localhost:3000/api-docs`

---

## **Error Handling**

- **Validation Errors:** Ensures all required fields are provided and valid.
- **Resource Not Found:** Returns a 404 error for missing products or orders.
- **Generic Errors:** Returns a standard error response with a stack trace for debugging.

Example Error Response:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price must be a positive number",
        "name": "ValidatorError"
      }
    }
  },
  "stack": "Error: Validation failed..."
}
```

---

## **Testing**

- Use Postman or any API client to test endpoints.
- Mock data is included in the project for testing purposes.

## **Live Demo**

Access the live deployment: [Stationery Shop API](https://stationery-shop-api.vercel.app)
