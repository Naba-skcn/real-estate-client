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
import Dashboard from './components/Dashboard.jsx';
import Wishlist from './components/Wishlist.jsx';
import MakeOffer from './components/MakeOffer.jsx';
import MyProfile from './components/MyProfile.jsx';
import ManageUsers from './components/ManageUsers.jsx';
import ManageProperties from './components/ManageProperties.jsx';
import AddProperty from './AddProperty.jsx';
import MyAddedProperties from './components/MyAddedProperties.jsx';
import UpdateProperty from './components/UpdateProperty.jsx';
import PropertyBought from './components/PropertyBought.jsx';
import MyReviews from './components/MyReviews.jsx';
import RequestedProperty from './components/RequestedProperty.jsx';
import PaymentPage from './components/PaymentPage.jsx';
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
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>
  }, 
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        index: true,
        path: "/dashboard/profile",
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/wishlist",
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/offer",
        element:<PrivateRoute><MakeOffer></MakeOffer></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/manage-users",
        element:<PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/manage-properties",
        element:<PrivateRoute><ManageProperties></ManageProperties></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/add-property",
        element:<PrivateRoute><AddProperty></AddProperty></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/my-properties",
        element:<PrivateRoute><MyAddedProperties></MyAddedProperties></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/bought",
        element:<PrivateRoute><PropertyBought></PropertyBought></PrivateRoute>
      },
       {
        index: true,
        path: "/dashboard/update-property/:id",
        element:<PrivateRoute><UpdateProperty></UpdateProperty></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/my-reviews",
        element:<PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/requested-properties",
        element:<PrivateRoute><RequestedProperty></RequestedProperty></PrivateRoute>
      },
      {
        index: true,
        path: "/dashboard/payment/:id",
        element:<PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
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
