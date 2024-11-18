import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import User from './getUser/User';
import Add from './addUser/AddUser';
import UpdateUserForm from "./updateUser/Update"

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },{
    path: "/add",
    element: <Add />,
  },
  {
    path: "/update/:id",
    element: <UpdateUserForm />,
  }
 
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
