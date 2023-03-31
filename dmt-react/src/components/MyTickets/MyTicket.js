import React from "react";

const MyTicket = ({ id, ticket, onRefund }) => {
  return (
    <div className="flex w-full flex-col items-center bg-[#DEE8FD] rounded-lg shadow-lg">
      <div className="bg-[#30D5C8] rounded-b-lg py-2 px-4 font-semibold text-white text-sm uppercase">
        {ticket.transaction_id}
      </div>
      <div className="flex flex-col items-center">
        <div className="p-5">
          <img
            className="h-52"
            src={`http://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=127.0.0.1:3000/ticketverify/${ticket.transaction_id}`}
          />
        </div>
        <div className="space-x-3 pb-5 flex text-xs font-semibold">
          <div>
            <p>Price: {ticket.ticket.route.price} BDT</p>
            <p>Purchased at: {ticket.date.split("T")[0]}</p>
          </div>
          <div>
            <p>Pickup: {ticket.ticket.route.station_1}</p>
            <p>Destination: {ticket.ticket.route.station_2}</p>
          </div>
        </div>
      </div>
      <button
        className="bg-[#30D5C8] rounded-lg py-2 px-4 my-4 font-semibold text-white text-sm"
        onClick={() => onRefund(ticket.ticket.id)}
      >
        Refund
      </button>
    </div>
  );
};

export default MyTicket;
