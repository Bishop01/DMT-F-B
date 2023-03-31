import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TfiWallet } from "react-icons/tfi";

import { useAuth } from "../../Auth/AuthContext";
import Loader from "../common/Loader";

const Checkout = ({ routes }) => {
  //const [stations, setStations] = useState([]);
  const [visible, setVisible] = useState(null);
  const [paymentmethodselected, setPaymentmethodselected] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const ref_route_id = useRef(null);
  const ref_user_id = useRef(null);
  const ref_payment_method = useRef(null);
  const ref_price = useRef(null);
  const { setStationData, stations } = useAuth();

  //const { setRouteData, routedetails } = useAuth();
  const [route, setRoute] = useState();
  //const [paymentdetails, setPaymentdetails] = useState([]);

  const { handlePayment, paymentdetails } = useAuth();

  const { currentUser } = useAuth();

  const [data, setData] = useState({
    station1: "",
    station2: "",
  });

  const paymentmethodhandler_wallet = (e) => {
    setPaymentmethodselected("wallet");
  };
  const paymentmethodhandler_gateway = (e) => {
    setPaymentmethodselected("gateway");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setVisible(true);
    const routedata = {
      station1: data.station1,
      station2: data.station2,
    };
    //console.log(e.currentTarget.id);
    if (e.currentTarget.id === "payment") {
      const paymentdata = {
        route_id: ref_route_id.current.value,
        user_id: ref_user_id.current.value,
        payment_method: ref_payment_method.current.value,
        price: ref_price.current.value,
      };
      //const response = await setRouteData(routedata);
      const paymentresponse = await handlePayment(paymentdata);
      console.log(paymentresponse);
      if (paymentresponse.method === "wallet") {
        toast.success("Payment Successful!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (paymentresponse.data.message) {
        setIsOpen(true);
      }
    }

    routes.map((r) => {
      //console.log(r)
      if (
        r.station_1 === routedata.station1 &&
        r.station_2 === routedata.station2
      ) {
        setRoute(r);
      }
    });
    //console.log(routedata);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    //console.log(value)
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const style = {
    container: `w-[75%]  ${
      visible ? "h-auto" : "h-auto"
    } p-3 space-y-6 bg-[#30D5C8] rounded-lg shadow-lg `,
  };
  //console.log(station1);

  const loadStations = async (e) => {
    await setStationData();
    setLoading(false);
  };

  useEffect(() => {
    loadStations();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className={style.container}>
      {paymentdetails.method !== "wallet" && (
        <ReactModal
          isOpen={isOpen}
          contentLabel="Example Modal"
          onRequestClose={() => setIsOpen(false)}
          className="w-[30%] h-[90%] mx-auto mt-16 p-3 bg-[#67aeff93] rounded-lg shadow-lg"
        >
          <iframe
            className="w-full h-full"
            src={paymentdetails.payment_url}
          ></iframe>
        </ReactModal>
      )}
      {console.log(paymentdetails)}
      {paymentdetails.method === "wallet" && (
        <span>
          <ToastContainer
            position="bottom-left"
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
        </span>
      )}
      <div className="flex flex-col space-y-2 divide-y">
        <div className="flex items-center space-x-1 text-gray-700">
          <label className="font-semibold">Quick Buy</label>
        </div>
        <form
          className="flex flex-col justify-start"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label className="font-semibold pt-6">From:</label>
          <select
            name="station1"
            className="text-sm px-2 py-1 border border-teal-400 rounded-lg w-[50%]"
            onChange={(e) => handleChange(e)}
          >
            <option selected>Choose a station</option>
            {stations.map((stations) => (
              <option key={stations.id} value={stations.id}>
                {stations.id}
              </option>
            ))}
          </select>
          <label className="font-semibold">To:</label>
          <select
            name="station2"
            className="text-sm px-2 py-1 border border-teal-400 rounded-lg w-[50%]"
            onChange={(e) => handleChange(e)}
          >
            <option selected>Choose a station</option>
            {stations.map((stations) => (
              <option key={stations.id} value={stations.id}>
                {stations.id}
              </option>
            ))}
          </select>

          <button
            type="submit"
            class="inline-block w-[45%] mt-2 px-4 py-2 bg-[#30D5C8] border-2 border-gray-700 text-gray-700 font-bold text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[#b6cbf8] hover: hover:shadow-lg hover:text-gray-700"
          >
            Buy Now
          </button>
        </form>
        <div>
          {visible && route && (
            <div className="font-semibold text-gray-700">
              <h2>
                Route ID:{" "}
                <input
                  ref={ref_route_id}
                  name="route_id"
                  type="text"
                  className="bg-[#30D5C8] rounded-lg w-[35%]"
                  value={route.id}
                  readOnly
                />
              </h2>
              <h2>
                Price: BDT{" "}
                <input
                  ref={ref_price}
                  name="price"
                  type="text"
                  className="bg-[#30D5C8] rounded-lg w-[35%]"
                  value={route.price}
                  readOnly
                />
              </h2>
              Payment Method:{" "}
              <input
                name="payment_method"
                ref={ref_payment_method}
                type="text"
                className="bg-[#30D5C8] rounded-lg w-[35%]"
                value={paymentmethodselected}
                readOnly
              />
              <input
                name="user_id"
                ref={ref_user_id}
                type="hidden"
                value={currentUser.id}
              />
              <div className="flex justify-end items-center bg-[#15a79f] divide-x rounded-lg py-1 border-2 border-black/40">
                <div
                  className="flex pl-10 m-auto w-[50%] x-3 y-3 hover:scale-110"
                  onClick={paymentmethodhandler_gateway}
                >
                  <span className="text-white/95">aamarpay</span>
                  <RiSecurePaymentFill
                    size={30}
                    className="text-white/95 ml-1"
                  />
                </div>
                <div
                  className="flex pl-10 m-auto x-3 y-3 w-[50%] hover:scale-110"
                  onClick={paymentmethodhandler_wallet}
                >
                  <span className="text-white/95">Wallet</span>
                  <TfiWallet size={30} className="text-white/95 ml-1" />
                </div>
              </div>
              {paymentmethodselected !== null && (
                <button
                  onClick={handleSubmit}
                  //onClick={}
                  id="payment"
                  class="inline-block w-[48%] mt-2 px-4 py-2 bg-[#30D5C8] border-2 border-gray-700 text-gray-700 font-bold text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[#b6cbf8] hover: hover:shadow-lg hover:text-gray-700"
                >
                  Proceed to payment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
