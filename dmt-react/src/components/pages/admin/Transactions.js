import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Auth/AuthContext";
import Loader from "../../common/Loader";
import SearchBar from "../../common/SearchBar";
import TransactionV2 from "../../common/TransactionV2";

const Transactions = () => {
  const style = {
    table: "absolute w-full border-collapse mt-5",
    tableContainer: "relative h-full flex w-full overflow-y-auto",
    headerRow: "text-gray-400 h-12 text-left",
    header: "sticky top-0 bg-white",
  };

  const { getTransactions } = useAuth();
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = async (e) => {
    debugger;
    const data = await getTransactions();
    if (data.transactions) {
      setTransactions(data.transactions);
      setError("");
    } else setError(data.error);
    setLoading(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return loading ? (
    <Loader />
  ) : error.length > 0 ? (
    <div>error</div>
  ) : (
    <div className="px-8 py-4 flex flex-col w-full h-full">
      <div>
        <SearchBar />
      </div>
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead className={style.header}>
            <tr className={style.headerRow}>
              <th>User ID</th>
              <th>Date</th>
              <th>Invoice ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => {
              return <TransactionV2 key={t.id} transaction={t} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
