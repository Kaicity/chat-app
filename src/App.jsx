import { useState } from "react";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoom from "./components/Modals/AddRoom";
import InviteMember from "./components/Modals/InviteMember";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
          <AddRoom />
          <InviteMember />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
