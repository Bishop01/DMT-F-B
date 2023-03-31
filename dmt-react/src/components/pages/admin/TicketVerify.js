import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Auth/AuthContext";
import Loader from "../../common/Loader";

const MyTicket = () => {
  let { id } = useParams();
  const { verifyTicket } = useAuth();
  const [isverified, setIsverified] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async (e) => {
    const data = await verifyTicket(id);
    if (data.code === "200") {
      setIsverified(true);
      setLoading(false)
    } else {
      setIsverified(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div class="flex items-center justify-center bg-white h-screen w-100 h-100">
      <div>
        <div class="flex flex-col items-center space-y-2">
          {isverified && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-green-600 w-28 h-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 class="text-4xl font-bold">Ticket Verification Success!</h1>
            </>
          )}
          {!isverified && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                class="text-red-600 w-28 h-28"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <h1 class="text-4xl font-bold">Ticket Verification Failed!</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTicket;
