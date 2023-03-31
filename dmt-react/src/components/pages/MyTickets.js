import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TransactionHistory from "../MyTickets/TransactionHistory";
import { ActiveTickets } from "../MyTickets/ActiveTickets";
import { useAuth } from "../../Auth/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../common/Loader";

const MyTickets = () => {
  const style = {
    indicator: `absolute bottom-0 bg-[#30D5C8] h-[2px]`,
    btn: `p-2 hover:bg-[#30D5C8] hover:text-white rounded-t-lg`,
    tabs: "space-x-3 flex text-sm px-3 pt-2 border-b w-full relative",
  };

  const { getTickets, handleRefund } = useAuth();

  const [selected, setSelected] = useState(1);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [indicatorPrevPosition, setIndicatorPrevPosition] = useState(0);
  const offset = 12;

  const [activeSlide, setActiveSlide] = useState(0);
  const swiper = useRef(null);

  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  //const activeSlideClass = "swiper-slide swiper-slide-active";

  const setSlide = (index) => {
    setActiveSlide(index);
  };
  const loadTickets = async () => {
    const tk = await getTickets();
    if (tk.transactions) setTickets(tk.transactions);
    else {
      setTickets(null);
    }
    setLoading(false);
  };
  // useEffect(() => {
  //     console.log(activeSlide)
  // }, [activeSlide])

  useEffect(() => {
    if (!loading) {
      if (selected === 1) {
        setIndicatorWidth(ref1.current.offsetWidth);
        setIndicatorPosition(ref1.current.offsetLeft - offset);
        setIndicatorPrevPosition(ref2.current.offsetLeft - offset);
      }
      if (selected === 2) {
        setIndicatorWidth(ref2.current.offsetWidth);
        setIndicatorPosition(ref2.current.offsetLeft - offset);
        setIndicatorPrevPosition(ref1.current.offsetLeft - offset);
      }
    }
  }, [selected, loading]);

  useEffect(() => {
    loadTickets();
  }, []);

  const onTabClick = (index) => {
    setSelected(index);
  };
  const onRefund = async (id) => {
    const data = await handleRefund(id);
    if (data.code === "200") {
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      loadTickets();
    } else {
      toast.error(data.error, {
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
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col absolute w-full h-full p-8">
      <div className={style.tabs} style={{ flex: "0 1 auto" }}>
        <motion.div
          initial={{ x: indicatorPrevPosition }}
          animate={{ x: indicatorPosition }}
          transition={{ duration: 0.4 }}
          className={style.indicator}
          style={{ width: `${indicatorWidth}px` }}
        />
        <button
          ref={ref1}
          className={`${style.btn} ${selected === 1 ? "font-semibold" : ""}`}
          onClick={() => onTabClick(1)}
        >
          Active Tickets
        </button>
        <button
          ref={ref2}
          className={`${style.btn} ${selected === 2 ? "font-semibold" : ""}`}
          onClick={() => onTabClick(2)}
        >
          Transaction History
        </button>
      </div>
      <div className="flex relative h-full w-full overflow-hidden">
        {selected === 1 && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center h-full w-full"
          >
            <ActiveTickets
              tickets={tickets}
              swiper={swiper}
              activeSlide={activeSlide}
              setActiveSlide={setSlide}
              onRefund={onRefund}
            />
          </motion.div>
        )}
        {selected === 2 && (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute h-full w-full"
          >
            <TransactionHistory />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
