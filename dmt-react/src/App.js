import { Routes, Route } from "react-router-dom";
import Store from "./components/pages/Store";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Layout from "./components/Layout/Layout";
import MyTickets from "./components/pages/MyTickets";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Users from "./components/pages/admin/Users";
import Transactions from "./components/pages/admin/Transactions";
import Reset from "./components/pages/Reset";
import Topup from "./components/pages/Topup";
import Support from "./components/pages/Support";
import Train from "./components/pages/Train";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import Misc from "./components/pages/admin/Misc";
import TicketVerify from "./components/pages/admin/TicketVerify";

import IsAdmin from "./Auth/IsAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="reset" element={<Reset />} />
        <Route path="train" element={<Train />} />
        <Route path="/ticketverify/:id" element={<TicketVerify />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} exact />
          <Route path="store" element={<Store />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myTickets" element={<MyTickets />} />
          <Route path="topup" element={<Topup />} />
          <Route path="support" element={<Support />} />
        </Route>

        <Route element={<Layout />}>
          <Route element={<IsAdmin />}>
            <Route path="admin">
              <Route path="users" element={<Users />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="misc" element={<Misc />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
