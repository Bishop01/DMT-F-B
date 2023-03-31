import React, { useEffect, useState } from "react";
import { ImTicket } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

const Ticket = ({ route, station1, station2, price, key }) => {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };
  const style = {
    container: `text-gray-700 w-full ${
      hover ? "bg-[#DEE8FD] shadow-none" : "bg-[#30D5C8] shadow-lg"
    } px-4 py-2 rounded-lg font-semibold text-sm divide-y divide-gray-700`,
  };

  return (
    <div className={style.container}>
      <div
        className="flex items-center h-[40px] "
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <ImTicket className="w-4 h-4 mr-2" />
        <div className="">
          From: {station1}&emsp;<span>To: {station2}</span>
        </div>
        <div className="ml-auto pb-1">
          {/*<button
            type="button"
            class="inline-block px-4 py-2 bg-[#30D5C8] border-2 border-gray-700 text-gray-700 font-bold text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[#b6cbf8] hover: hover:shadow-lg hover:text-gray-700"
          >
            Buy Now
          </button>*/}
        </div>
      </div>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ height: 0, padding: "0" }}
            animate={{ height: "150px" }}
            transition={{ duration: 0.8 }}
            exit={{ height: 0, transition: { duration: 0.5 } }}
            className="whitespace-nowrap overflow-hidden flex h-0 relative w-full"
          >
            <div className="flex flex-col space-y-1 w-[60%] pl-4">
              <div className="space-y-1">
                <div className="text-base font-bold pt-2">
                  Location Details-
                </div>
                <div>
                  <div>Pickup Station - {station1}</div>
                  <div>Destination Station - {station2}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-base text-gray-700 font-bold">
                  Ticket Details-
                </div>
                <div>
                  <div>Route ID - {route}</div>
                  <div>Price - {price} BDT</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Ticket;
