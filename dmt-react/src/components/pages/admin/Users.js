import React, { useEffect, useState } from "react";
import UserCard from "../../common/UserCard";
import { HiChevronUpDown } from "react-icons/hi2";
import SearchBar from "../../common/SearchBar";
import { useAuth } from "../../../Auth/AuthContext";
import Loader from "../../common/Loader";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  //const createWorker = createWorkerFactory(() => import("./Users"));
  //const worker = useWorker(createWorker);

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  //const [confirm, setConfirm] = useState(false);
  //const [isOpen, setIsOpen] = useState(false);

  const { getUsers, adminUpdateUser, deleteUser } = useAuth();
  const [filteredUsers, setFilteredUsers] = useState(null);
  let input = "";
  let role = -1;

  const style = {
    container:
      "px-8 py-5 w-full h-full absolute flex flex-col items-center justify-center",
    tableContainer: "relative h-full flex w-full overflow-y-auto",
    table: "absolute w-full border-collapse",
    headerRow: "text-gray-400 h-12 text-left",
    header: "sticky top-0 bg-white",
  };

  const onSubmit = async (newuser, email, role) => {
    debugger;
    setLoading(true);
    const user = { ...newuser, role: role, email: email };
    const data = await adminUpdateUser(user);
    if (data.success.length > 0) {
      toast.success(data.success, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (data.modelState) {
      const e =
        data.error.role.length > 0
          ? data.error.role
          : data.error.email.length > 0
          ? data.error.email
          : "";
      toast.error(e[0], {
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

    setLoading(false);
    loadUsers();
  };

  const loadUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    //const data = await worker.UserWorker()
    setUsers(data);
    setFilteredUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const onSearch = (e) => {
    input = e.target.value;
    if (role == -1) setFilteredUsers(users);
    if (input === "") {
      setFilteredUsers(filteredUsers);
    } else {
      input = e.target.value;
      setFilteredUsers(
        users.filter((u) => {
          return u.id.includes(input);
        })
      );
    }
  };

  const onChangeRole = (e) => {
    role = e.target.value;
    if (role == 0)
      setFilteredUsers(
        users.filter((u) => {
          return u.role == 0;
        })
      );
    else if (role == 1)
      setFilteredUsers(
        users.filter((u) => {
          return u.role == 1;
        })
      );
    else {
      if (input === "") setFilteredUsers(users);
      else setFilteredUsers(filteredUsers);
    }
  };
  useEffect(() => {
    setLoading(false);
  }, [filteredUsers]);

  const onDelete = async (id) => {
    setLoading(true);
    const data = await deleteUser(id);
    if (data.success.length > 0) {
      toast.success(data.success, {
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
    await loadUsers();
    setLoading(false);
  };

  return !loading ? (
    <div className={style.container}>
      <div className="mb-3 w-full">
        <SearchBar onChangeRole={onChangeRole} onSearch={onSearch} />
      </div>
      <div className="w-full h-full">
        <div className={style.tableContainer}>
          <table className={style.table}>
            <thead className={style.header}>
              <tr className={style.headerRow}>
                <th className="pl-2">
                  <div className="flex items-center">
                    <p>Name</p>
                    <HiChevronUpDown />
                  </div>
                </th>
                <th>
                  <div className="flex items-center">
                    <p>Role</p>
                    <HiChevronUpDown />
                  </div>
                </th>
                <th>Email</th>
                <th>Contact</th>
                <th>
                  <div className="flex items-center">
                    <p>Actions</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filteredUsers &&
                filteredUsers.map((user) => {
                  return (
                    <UserCard
                      key={user.id}
                      user={user}
                      onSubmit={onSubmit}
                      onDelete={onDelete}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Users;
