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
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AllProperties from './components/AllProperties.jsx';
import PrivateRoute from './components/routes/PrivateRoute.jsx';
import ViewDetails from './components/ViewDetails.jsx';
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
      {
       path: "/all",
       element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
      },
      {
        path: "/property/:id",
        element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/property/${params.id}`)
      },
      
    
    ]
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <QueryClientProvider client={queryClient}>
 <HelmetProvider> 
  <AuthProvider> 
    <RouterProvider router={router} />
     </AuthProvider>
     </HelmetProvider>
 </QueryClientProvider>
  </React.StrictMode>,
)
