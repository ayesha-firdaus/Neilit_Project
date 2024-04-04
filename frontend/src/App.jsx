import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Navbar from './Components/NavBar/Navbar';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Pages/Profile/Profile';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import UserForm from './Pages/IndentForm/User/NewUserForm/UserForm';
import NewItem from './Pages/Items/NewItem/NewItem';
import ViewItem from './Pages/Items/ViewItem/ViewItem';
import Admin from "./Pages/AdminPanel/Admin";
import ViewUserFormList from './Pages/IndentForm/User/ViewUserForm/ViewUserFormList/ViewUserFormList';
import ApprovalList from './Pages/IndentForm/DepartmentHead/ApprovalList/ApprovalList';
import ApproveIndent from './Pages/IndentForm/DepartmentHead/ApproveIndent/ApproveIndent';
import ViewUserFormitem from './Pages/IndentForm/User/ViewUserForm/ViewUserFormitem/ViewUserFormitem';
import { useDispatch } from 'react-redux';
import { getItemStart, getItems, getItemError } from './Components/redux/Item/itemSlice'; // Update the import path

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(getItemStart());

        const res = await fetch(`/api/item/viewitem`);
        const data=await res.json();
     
        dispatch(getItems(data.item))
     
      } catch (err) {
        dispatch(getItemError());
      }
    }

    fetchData();
  }, [ dispatch]);

  return (
    <BrowserRouter>
      <>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/newuserform" element={<UserForm />} />
            <Route path="/viewuserform" element={<ViewUserFormList />} />
            <Route path="/viewuserform/:id" element={<ViewUserFormitem />} />
            <Route path="/newitem" element={<NewItem />} exact />
            <Route path="/viewitem" element={<ViewItem />} exact />
            <Route path="/approvallist" element={<ApprovalList />} />
            <Route path="/indentapproval/:id" element={<ApproveIndent />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;