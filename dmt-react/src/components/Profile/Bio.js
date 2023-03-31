import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "./Image";
import { TbEdit } from "react-icons/tb";
import { IoCheckmarkDone } from "react-icons/io5";
import { useAuth } from "../../Auth/AuthContext";
import Loader from "../common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bio = ({ user }) => {
  const style = {
    label: "font-semibold w-[10%]",
    details: "flex w-full items-center",
    input:
      "text-sm border py-2 px-4 rounded-lg w-[30%] mr-5 focus:outline-[#30D5C8]",
    conatiner: "absolute overflow-y-auto flex flex-col w-full p-8 h-full",
    detials_container: "flex flex-col space-y-10 p-8 h-full ml-10",
    icon: "text-gray-400 w-6 h-6 p-1 rounded-lg hover:bg-gray-400 hover:text-white hover:transition hover:cursor-pointer",
    iconCheck:
      "ml-2 text-gray-400 p-1 rounded-lg hover:bg-[#30D5C8] hover:text-white hover:transition hover:cursor-pointer",
  };

  const [currentUser, setCurrentUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();

  const [validation, setValidation] = useState(null);

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const nidRef = useRef(null);

  const onClick = (ref) => {
    ref.current.readOnly = false;
    ref.current.focus();
  };

  const onChange = (e) => {
    setValidation(null);

    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = async () => {
    setLoading(true);
    const msg = await updateUser(currentUser);

    if (msg.modelState) {
      setValidation(msg.error);
    } else if (msg.error.length > 0) {
      setValidation(null);
      toast.error(msg.error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setValidation(null);
      toast.success(msg.success, {
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

    setLoading(false);
  };

  const onUpload = (e) => {};

  return loading ? (
    <Loader />
  ) : (
    <AnimatePresence>
      <motion.div
        key={"bio"}
        initial={{ x: 100, padding: "18px", opacity: 0 }}
        animate={{ x: 0, padding: "20px", opacity: 1 }}
        transition={{ duration: 0.4 }}
        exit={{ x: -100, opacity: 0 }}
        className={style.conatiner}
      >
        <Image imgUpload={"onUpload"} />
        <div className={style.detials_container}>
          <div className={style.details}>
            <label className={style.label}>Username</label>
            <input
              type="text"
              className={style.input}
              defaultValue={user.id}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <div className={style.details}>
              <label className={style.label}>Full Name</label>
              <input
                name="name"
                ref={nameRef}
                type="text"
                className={style.input}
                defaultValue={user.name}
                readOnly
                onChange={onChange}
              />
              <TbEdit className={style.icon} onClick={() => onClick(nameRef)} />
            </div>
            {validation && validation.name && (
              <div className="text-red-500">{validation.name}</div>
            )}
          </div>
          <div className={style.details}>
            <label className={style.label}>Email</label>
            <input
              type="email"
              className={style.input}
              defaultValue={user.email}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <div className={style.details}>
              <label className={style.label}>Contact</label>
              <input
                name="phone"
                ref={phoneRef}
                type="text"
                className={style.input}
                defaultValue={user.phone}
                readOnly
                onChange={(e) => onChange(e)}
              />
              <TbEdit
                className={style.icon}
                onClick={() => onClick(phoneRef)}
              />
            </div>
            {validation && validation.phone && (
              <div className="text-red-500">{validation.phone}</div>
            )}
          </div>
          <div className="flex flex-col">
            <div className={style.details}>
              <label className={style.label}>NID</label>
              <input
                name="nid"
                ref={nidRef}
                type="text"
                className={style.input}
                defaultValue={user.nid}
                readOnly
                onChange={(e) => onChange(e)}
              />
              <TbEdit className={style.icon} onClick={() => onClick(nidRef)} />
            </div>
            {validation && validation.nid && (
              <div className="text-red-500">{validation.nid}</div>
            )}
          </div>
          <div className="flex flex-col">
            <div className={style.details}>
              <label className={style.label}>Date of Birth</label>
              <input
                name="dob"
                type="date"
                className={style.input}
                defaultValue={user.dob.split("T")[0]}
                onChange={(e) => onChange(e)}
              />
            </div>
            {validation && validation.dob && (
              <div className="text-red-500">{validation.dob}</div>
            )}
          </div>

          {validation && validation.other && (
            <div className="text-red-500">{validation.other}</div>
          )}

          <div>
            <button
              onClick={() => onUpdate()}
              className="text-white font-semibold border rounded-xl px-4 py-2 bg-[#30D5C8]"
            >
              Update
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Bio;
