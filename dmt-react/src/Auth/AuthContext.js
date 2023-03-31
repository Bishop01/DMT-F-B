import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance, InitializeToken } from "./AxiosInstance";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const axios = AxiosInstance;

  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [stations, setStations] = useState(null);
  const [mode, setMode] = useState(0);

  const [routedetails, setRoutedetails] = useState([]);
  const [paymentdetails, setPaymentdetails] = useState([]);

  const navigate = useNavigate();

  const onChangeMode = (mode) => {
    setMode(mode);
  };

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getRoutes = async (e) => {
    try {
      InitializeToken();
      const response = await axios.get("api/routes");
      const data = await response.data;

      return data;
    } catch {
      console.log("station data error");
    }
  };

  const setStationData = async (e) => {
    try {
      InitializeToken();
      const response = await axios.get("api/stations");
      const data = await response.data;
      debugger
      if (data) {
        setStations(data);
        return true;
      }
      return;
    } catch (error) {
      console.log("station data error");
      return false;
    }
  };

  const getRevenues = async (e) => {
    debugger;
    try {
      const response = await axios.get(`api/admin/revenues`);
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  };

  const handleRecharge = async (payment) => {
    //debugger;
    try {
      const response = await axios.post(
        "api/walletrecharge",
        JSON.stringify(payment),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.data;
      //debugger
      if (data) {
        //console.log(data);
        setPaymentdetails(data);
        //console.log(paymentdetails);
        return {
          method: data.method,
          data: data,
          status: response.status,
        };
      }
      return;
    } catch (error) {
      console.log("data error");
      return false;
    }
  };

  const handlePayment = async (payment) => {
    //debugger;
    try {
      const response = await axios.post(
        "api/checkout",
        JSON.stringify(payment),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.data;
      //debugger
      if (data) {
        //console.log(data);
        setPaymentdetails(data);
        //console.log(paymentdetails);
        return {
          method: data.method,
          data: data,
          status: response.status,
        };
      }
      return;
    } catch (error) {
      console.log("data error");
      return false;
    }
  };

  const supportRequest = async (support) => {
    try {
      const response = await axios.post("api/supportcreate", support, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.data;
      if (data) {
        return { message: data.message, code: data.code };
      }
      return;
    } catch (error) {
      return error;
    }
  };

  const sendReset = async (email) => {
    try {
      const response = await axios.post("api/passwordreset", email, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.data;
      if (data) {
        console.log();
        return { message: data.message, status: response.status };
      }
      return;
    } catch (error) {
      return error;
    }
  };
  const passwordUpdate = async (password) => {
    //debugger;
    try {
      const response = await axios.post("api/passwordupdate", password, {
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.data;
      //debugger
      if (data) {
        console.log(data);
        return { message: data.message, code: data.code };
      }
      return;
    } catch (error) {
      //debugger
      //console.log("route data error");
      //return data.message;
    }
  };
  const handleRefund = async (id) => {
    InitializeToken();
    try {
      const response = await axios.get(`api/refund/${id}`);
      const data = await response.data;
      if (data) {
        console.log(data);
        return { message: data.message, code: data.code };
      }
      return;
    } catch (error) {
      //console.log("route data error");
      return false;
    }
  };

  const getSupportRequest = async (id) => {
    InitializeToken();
    try {
      const response = await axios.get(`api/support/${id}`);
      const data = await response.data;
      if (data) {
        //console.log(data);
        return {
          message: data.message,
          supportreq: data.requests,
          code: data.code,
        };
      }
      return;
    } catch (error) {
      //console.log("route data error");
      return false;
    }
  };

  const verifyTicket = async (id) => {
    InitializeToken();
    try {
      const response = await axios.get(`api/verifyticket/${id}`);
      const data = await response.data;
      if (data) {
        console.log(data);
        return { message: data.message, code: data.code };
      }
      return;
    } catch (error) {
      //console.log("route data error");
      return false;
    }
  };

  const setRouteData = async (route) => {
    //debugger;
    InitializeToken();
    try {
      const response = await axios.get(`api/route/${route.id}`);
      const data = await response.data;
      debugger;
      if (data) {
        console.log(data);
        setRoutedetails(data);
        return true;
      }
      return;
    } catch (error) {
      //console.log("route data error");
      return false;
    }
  };

  const setCredentials = () => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    setAccessToken(localStorage.getItem("accessToken"));
  };

  const uploadImage = async (image) => {
    var formdata = new FormData();
    formdata.append("image", image);
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=9d114e45a6fe1705ae2311bc729f758e",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "",
          },
        }
      );
      const data = response.data;
      const user = { ...currentUser, profilePic: data.image.url };
      return updateUser(user);
    } catch {
      return { error: "Error uploading picture" };
    }
  };

  const getTickets = async () => {
    try {
      const response = await axios.get(`api/transactions/${currentUser.id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.post(`api/admin/delete/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  };

  const getTransactions = async () => {
    try {
      const response = await axios.get("api/admin/transactions");
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  };

  const updatePassword = async (user) => {
    InitializeToken();
    try {
      debugger;
      const response = await axios.post("api/updatePassword", user);
      const data = response.data;
      return data;
    } catch {
      return { error: "Error updating password" };
    }
  };

  const updateUser = async (user) => {
    try {
      var response = await axios.post(`api/update`, user);
      const data = await response.data;
      if (data.success.length > 0) {
        setCurrentUser(data.user);
        saveUser(data.user);
      }
      return data;
    } catch (error) {
      return error;
    }
  };

  const adminUpdateUser = async (user) => {
    debugger;
    try {
      var response = await axios.post(`api/update`, user);
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  };

  const getUsers = async () => {
    try {
      //debugger;
      const response = await axios.get(`api/admin/users`);
      const data = await response.data;
      return data;
    } catch (error) {
      //console.log("station data error")
      return null;
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post("api/register", data);
      const message = response.data;
      return message;
    } catch (error) {
      return error;
    }
  };

  const login = async (user) => {
    console.log(user);
    debugger;
    try {
      const response = await axios.post("api/login", user, {
        "content-type": "application/json",
      });
      const data = await response.data;
      debugger;
      if (data.success && data.success.accessToken !== null) {
        setAccessToken(data.success.accessToken);
        setCurrentUser(data.success.user);

        if (data.success.user) {
          localStorage.setItem("user", JSON.stringify(data.success.user));
          localStorage.setItem("accessToken", data.success.accessToken);
          navigate("/");
        }

        return data;
      }
      return data;
    } catch (error) {
      setAccessToken("");
      setCurrentUser("");
      return error;
    }
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    try {
      InitializeToken();
      const response = await axios.post("api/logout");
    } catch (error) { }
    navigate("/login");
  };

  const value = {
    currentUser,
    accessToken,
    register,
    login,
    setCredentials,
    logout,
    setStationData,
    getTickets,
    stations,
    getUsers,
    updateUser,
    getTransactions,
    onChangeMode,
    mode,
    setRouteData,
    routedetails,
    sendReset,
    passwordUpdate,
    handlePayment,
    paymentdetails,
    getRoutes,
    updatePassword,
    adminUpdateUser,
    uploadImage,
    deleteUser,
    getRevenues,
    supportRequest,
    handleRecharge,
    handleRefund,
    verifyTicket,
    getSupportRequest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
