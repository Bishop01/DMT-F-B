import React, { useRef, useState } from "react";
import { IoCameraSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useAuth } from "../../Auth/AuthContext";

const Image = ({ imgUpload }) => {
  const [hover, setHover] = useState(false);
  const uploadRef = useRef();
  const { currentUser, uploadImage } = useAuth();

  const [image, setImage] = useState(currentUser.profilePic);

  const style = {
    cover:
      "shadow-lg overflow-hidden absolute flex w-full bg-sky-100 h-[200px] rounded-tl-[70px] z-[-1]",
    profilePic: "w-40 h-40 p-1 rounded-full bg-gray-200 shadow-lg",
    camera: `${
      hover ? "text-white shadow-lg" : ""
    } relative mt-auto mb-2 border-2 rounded-full hover:cursor-pointer hover:bg-[#30D5C8] hover:transition`,
  };
  const animation = {
    hover: {
      rotate: [0, 0, 270, 270, 0],
      scale: [1, 1.5, 1.5, 1, 1],
      transition: {
        times: [],
        repeat: Infinity,
        repeatDelay: 0.5,
        duration: 2,
      },
    },
  };

  const onUpload = async (e) => {
    const reader = new FileReader();
    //reader.readAsDataURL(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]));
    uploadImage(e.target.files[0]);
  };

  const onClick = (e) => {
    uploadRef.current.click();
  };

  return (
    <div className="relative w-full">
      <div className="flex absolute right-0 mr-24 mt-5">
        <img
          className={style.profilePic}
          src={image || "images/dummyProfile.jpg"}
        />
        <input
          ref={uploadRef}
          type="file"
          hidden
          onChange={(e) => onUpload(e)}
        />
        <motion.div
          variants={animation}
          whileHover={"hover"}
          onMouseEnter={(e) => setHover(true)}
          onMouseLeave={(e) => setHover(false)}
          onClick={(e) => onClick(e)}
          className={style.camera}
        >
          <IoCameraSharp className="h-8 w-8 p-1" />
        </motion.div>
      </div>
    </div>
  );
};

export default Image;
