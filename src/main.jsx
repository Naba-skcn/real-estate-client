import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './components/providers/AuthProvider.jsx';
import Root from './components/Root.jsx';
import Home from './components/Home.jsx';
import Error from './components/Error.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>
      },
    
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider> <RouterProvider router={router} /> </AuthProvider>
  </React.StrictMode>,
)
