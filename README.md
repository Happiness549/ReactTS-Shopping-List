# 🛒 Shopping List App

A full-featured shopping list application built with **React, TypeScript, Redux Toolkit, Tailwind CSS, and JSON Server**.

The application allows users to register and log in, create and manage shopping lists, add items to lists, edit and delete items, and organize items by category.

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Logout functionality
* Protected routes
* Persistent user session using `localStorage`

### 📝 Shopping Lists

* Create shopping lists
* View shopping lists
* Edit existing lists
* Delete lists
* View list information
* Track the number of items in a list
* Lists are associated with the logged-in user

### 🛍️ List Items

* Add items to a shopping list
* Edit existing items
* Delete items
* Add:

  * Title
  * Category
  * Quantity
  * Notes
  * Image
* Images are stored as Base64 data
* Items are associated with their parent shopping list
* Items can be organized by category

### 🔎 Search, Filtering & Sorting

* Search shopping lists
* Filter lists by category
* Sort lists by:

  * Name
  * Category
  * Date created
* Sort in ascending or descending order
* Search and sorting state can be reflected in the URL

### 🎨 UI

* Responsive interface
* Reusable UI components
* Modal-based forms
* Tailwind CSS styling
* Lucide icons
* Custom reusable buttons, inputs, text components and cards

## 🛠️ Technologies

* **React**
* **TypeScript**
* **Redux Toolkit**
* **React Redux**
* **React Router**
* **Tailwind CSS**
* **Lucide React**
* **Vite**
* **JSON Server**
* **Local Storage**

## 📂 Project Structure

```text
src/
├── components/
│   ├── auth/
│   ├── lists/
│   └── ui/
│
├── pages/
│   ├── Home/
│   ├── Login/
│   ├── Profile/
│   └── Signup/
│
├── redux/
│   └── Features/
│       ├── ListSlice.ts
│       ├── ListItemSlice.ts
│       ├── LoginSlice.ts
│       └── SearchSlice.ts
│
├── store.ts
├── App.tsx
└── main.tsx
```

## 🧠 Application Architecture

The application uses **Redux Toolkit** to manage application state.

The main state areas include:

* Authentication/user state
* Shopping lists
* List items
* Search and sorting state
* Modal and editing state

### Shopping List → List Item Relationship

Each list item contains a `listId` that identifies the shopping list it belongs to.

```text
Shopping List
      │
      ├── listId
      │
      └── List Items
            ├── Carrots
            ├── Cabbage
            └── Spinach
```

This relationship allows items to be fetched specifically for the selected shopping list.

## 🔄 CRUD Operations

The application follows the CRUD pattern:

| Operation  | Functionality                            |
| ---------- | ---------------------------------------- |
| **Create** | Create shopping lists and add list items |
| **Read**   | Fetch lists and items from JSON Server   |
| **Update** | Edit shopping lists and list items       |
| **Delete** | Delete shopping lists and list items     |

## 🌐 API

The project uses **JSON Server** as a mock REST API.

Example endpoints:

```text
GET    /lists
POST   /lists
PATCH  /lists/:id
DELETE /lists/:id

GET    /itemList?listId=:listId
POST   /itemList
PATCH  /itemList/:id
DELETE /itemList/:id
```

List items are connected to their parent list through `listId`.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate into the project

```bash
cd shopping-list-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start JSON Server

```bash
npx json-server --watch db.json --port 3000
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available through the local development URL provided by Vite.

## 📋 Example Data

A shopping list can contain information such as:

```json
{
  "id": "example-id",
  "userId": "user-id",
  "category": "Groceries",
  "numberOfItem": 3,
  "dateCreated": "2026-08-30"
}
```

An item can contain:

```json
{
  "id": "item-id",
  "listId": "example-id",
  "title": "Carrots",
  "category": "Vegetables",
  "Quantity": "2",
  "notes": "Fresh carrots",
  "image": ""
}
```

## 💡 Key Implementation Concepts

### Redux Toolkit

Redux Toolkit is used to manage global application state and asynchronous API operations through `createAsyncThunk`.

### Protected Routes

Authenticated pages are protected so users cannot access application functionality without being logged in.

### Reusable Components

The UI is built using reusable components such as:

* `Button`
* `Input`
* `Text`
* `ListCard`
* `ListItemCard`
* `ListForm`

### Modal Forms

The same form logic supports both creating and editing items.

The form determines whether it is creating a new item or updating an existing item based on the current Redux editing state.

## 🎯 Project Goals

This project was built to strengthen practical understanding of:

* React component architecture
* TypeScript
* Redux Toolkit
* CRUD operations
* REST APIs
* State management
* Authentication flows
* Protected routes
* URL query parameters
* Reusable components
* Responsive UI development

## 🔮 Future Improvements

Potential future improvements include:

* Better image storage
* Backend authentication
* Persistent database
* Form validation
* Loading states and skeletons
* Improved error handling
* Category-based item cards
* Drag-and-drop list organization
* Deployment with a production backend

## 👩🏽‍💻 Author

**Happiness Mhlongo**

Built as part of an ongoing journey to strengthen frontend development and application architecture skills.

---

⭐ If you find the project useful or interesting, feel free to explore the code and follow the development journey.





