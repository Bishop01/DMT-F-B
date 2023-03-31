import { useState } from "react";
import { TbDiscount2 } from "react-icons/tb";
import { GiWallet } from "react-icons/gi";
import { useAuth } from "../../Auth/AuthContext";
import ReactModal from "react-modal";

/* <LoaderAnim />*/

const Topup = () => {
  const style = {
    container:
      "container flex flex-col w-full justify-center items-center pt-2",
  };
  const [isOpen, setIsOpen] = useState(false);
  const { handleRecharge, paymentdetails, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(true);
    console.log();
    const paymentdata = {
      user_id: currentUser.id,
      amount: e.currentTarget.id,
    };
    const response = await handleRecharge(paymentdata);
    console.log(response);
  };
  return (
    <div className="px-4 pt-8">
      {paymentdetails.method === "wallet_recharge" && (
        <ReactModal
          isOpen={isOpen}
          contentLabel="Example Modal"
          onRequestClose={() => setIsOpen(false)}
          className="w-[30%] h-[90%] mx-auto mt-16 p-3 bg-[#67aeff] rounded-lg shadow-lg"
        >
          <iframe
            className="w-full h-full"
            src={paymentdetails.payment_url}
          ></iframe>
        </ReactModal>
      )}

      <div className="flex flex-wrap justify-evenly">
        <div className="mb-8 rounded bg-[#7675dd] px-4 pb-6 shadow-md hover:scale-110 w-full md:w-[70%] group-hover:transition delay-150 duration-300 ease-in-out">
          <div className="flex-1 justify-center">
            <div className="pt-4 text-lg font-semibold text-[#ffffff]">
              Subscribe Prime
            </div>
            <div className="inline-flex items-center pt-1 pb-3 text-base text-[#ffffff]">
              <TbDiscount2 size={25} /> &nbsp;Upto 10% off
            </div>
            <br />
            <button
              type="button"
              className="inline-block rounded border-2 border-[#ffffff] px-6 py-2 text-xs font-bold uppercase leading-tight text-[#ffffff] transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly">
        <div className="mb-8 rounded bg-[#918fe0] px-4 pb-6 shadow-md hover:bg-[#585899] hover:scale-105 md:w-[31%] group-hover:transition delay-150 duration-300 ease-in-out">
          <div className="flex-1 items-center">
            <div className="pt-4 text-lg font-semibold text-[#e3f6f5]">
              Fast Recharge
            </div>
            <div className="inline-flex items-center pt-3 text-lg text-[#e3f6f5] font-bold">
              <GiWallet size={40} />
              &nbsp;BDT 200
            </div>
            <div className="flex justify-between ">
              <div className="pt-2 text-xs text-[#e3f6f5]">
                *No Refund available
              </div>
              <button
                onClick={handleSubmit}
                id="200"
                type="button"
                className="inline-border rounded border-2 border-[#ffffff] px-3 py-2 text-xs font-bold uppercase leading-tight text-[#ffffff] transition duration-150 ease-in-out hover:bg-[#757aaf] hover:bg-opacity-45 focus:outline-none focus:ring-0"
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8 rounded bg-[#918fe0] px-4 pb-6 shadow-md hover:bg-[#585899] hover:scale-105 md:w-[31%] group-hover:transition delay-150 duration-300 ease-in-out">
          <div className="flex-1 items-center">
            <div className="pt-4 text-lg font-semibold text-[#e3f6f5]">
              Fast Recharge
            </div>
            <div className="inline-flex items-center pt-3 text-lg text-[#e3f6f5] font-bold">
              <GiWallet size={40} />
              &nbsp;BDT 300
            </div>
            <div className="flex justify-between ">
              <div className="pt-2 text-xs text-[#e3f6f5]">
                *No Refund available
              </div>
              <button
                onClick={handleSubmit}
                id="300"
                type="button"
                className="inline-border rounded border-2 border-[#ffffff] px-3 py-2 text-xs font-bold uppercase leading-tight text-[#ffffff] transition duration-150 ease-in-out hover:bg-[#9ca4fc] hover:bg-opacity-45 focus:outline-none focus:ring-0"
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8 rounded bg-[#918fe0] px-4 pb-6 shadow-md hover:bg-[#585899] hover:scale-105 md:w-[31%] group-hover:transition delay-150 duration-300 ease-in-out">
          <div className="flex-1 items-center">
            <div className="pt-4 text-lg font-semibold text-[#e3f6f5]">
              Fast Recharge
            </div>
            <div className="inline-flex items-center pt-3 text-lg text-[#e3f6f5] font-bold">
              <GiWallet size={40} />
              &nbsp;BDT 500
            </div>
            <div className="flex justify-between ">
              <div className="pt-2 text-xs text-[#e3f6f5]">
                *No Refund available
              </div>
              <button
                onClick={handleSubmit}
                id="500"
                type="button"
                className="inline-border rounded border-2 border-[#ffffff] px-3 py-2 text-xs font-bold uppercase leading-tight text-[#ffffff] transition duration-150 ease-in-out hover:bg-[#9ca4fc] hover:bg-opacity-45 focus:outline-none focus:ring-0"
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8 rounded bg-[#918fe0] px-4 pb-6 shadow-md hover:bg-[#585899] hover:scale-105 md:w-[31%] group-hover:transition delay-150 duration-300 ease-in-out">
          <div className="flex-1 items-center">
            <div className="pt-4 text-lg font-semibold text-[#e3f6f5]">
              Fast Recharge
            </div>
            <div className="inline-flex items-center pt-3 text-lg text-[#e3f6f5] font-bold">
              <GiWallet size={40} />
              &nbsp;BDT 1000
            </div>
            <div className="flex justify-between ">
              <div className="pt-2 text-xs text-[#e3f6f5]">
                *No Refund available
              </div>
              <button
                onClick={handleSubmit}
                id="1000"
                type="button"
                className="inline-border rounded border-2 border-[#ffffff] px-3 py-2 text-xs font-bold uppercase leading-tight text-[#ffffff] transition duration-150 ease-in-out hover:bg-[#9ca4fc] hover:bg-opacity-45 focus:outline-none focus:ring-0"
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8 rounded bg-[#918fe0] px-4 pb-6 shadow-md hover:bg-[#585899] hover:scale-105 md:w-[31%] group-hover:transition delay-150 duration-300 ease-in-out">
          <div className="flex-1 items-center">
            <div className="pt-4 text-lg font-semibold text-[#e3f6f5]">
              Fast Recharge
            </div>
            <div className="inline-flex items-center pt-3 text-lg text-[#e3f6f5] font-bold">
              <GiWallet size={40} />
              &nbsp;BDT 1500
            </div>
            <div className="flex justify-between ">
              <div className="pt-2 text-xs text-[#e3f6f5]">
                *No Refund available
              </div>
              <button
                onClick={handleSubmit}
                id="1500"
                type="button"
                className="inline-border rounded border-2 border-[#ffffff] px-3 py-2 text-xs font-bold uppercase leading-tight text-[#ffffff] transition duration-150 ease-in-out hover:bg-[#9ca4fc] hover:bg-opacity-45 focus:outline-none focus:ring-0"
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8 rounded bg-[#918fe0] px-4 pb-6 shadow-md hover:bg-[#585899] hover:scale-105 md:w-[31%] group-hover:transition delay-150 duration-300 ease-in-out">
          <div className="flex-1 items-center">
            <div className="pt-4 text-lg font-semibold text-[#e3f6f5]">
              Fast Recharge
            </div>
            <div className="inline-flex items-center pt-3 text-lg text-[#e3f6f5] font-bold">
              <GiWallet size={40} />
              &nbsp;BDT 2000
            </div>
            <div className="flex justify-between ">
              <div className="pt-2 text-xs text-[#e3f6f5]">
                *No Refund available
              </div>
              <button
                onClick={handleSubmit}
                id="2000"
                type="button"
                className="inline-border rounded border-2 border-[#ffffff] px-3 py-2 text-xs font-bold uppercase leading-tight text-[#ffffff] transition duration-150 ease-in-out hover:bg-[#9ca4fc] hover:bg-opacity-45 focus:outline-none focus:ring-0"
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topup;
