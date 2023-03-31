import { useState, useEffect } from "react";
import Ticket from "../Store/Ticket";
import Quickbuy from "../Store/Quickbuy";
import { useAuth } from "../../Auth/AuthContext";
import Loader from "../common/Loader";

const style = {
  table: "table-auto h-full w-[70%] text-gray-700 divide-y border text-center",
  btn: "bg-sky-500 text-white font-semibold rounded-lg px-5 py-2",
  container: "w-full flex items-center justify-center mt-10",
};

const Store = () => {

  const [routes, setRoutes] = useState([]);
  const { getRoutes } = useAuth();

  const [loading, setLoading] = useState(true);

  const load = async (e) => {
    var data = await getRoutes();
    setRoutes(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex w-full h-full px-3 py-6">
      <div className="w-[30%]">
        <Quickbuy routes={routes} />
      </div>
      <div className="relative ml-auto w-[40%] mr-8 overflow-scroll hover:cursor-pointer">
        <div className="absolute space-y-5 h-full overflow-y-auto w-full pr-2">
          <label className="bg-[#30D5C8] rounded-lg shadow-lg px-4 py-2 font-semibold text-sm divide-gray-700">
            All Tickets
          </label>
          {routes.map((route) => (
            <Ticket
              route={route.id}
              station1={route.station_1}
              station2={route.station_2}
              price={route.price}
              key={route.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
