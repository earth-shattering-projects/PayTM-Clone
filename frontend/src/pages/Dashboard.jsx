import React, { useEffect, useState } from "react";
import Appbar from "../UI/Appbar";
import Balance from "../UI/Balance";
import Users from "../UI/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setBalance(response.data.balance))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Appbar />
      <Balance value={balance} />
      <Users />
    </div>
  );
};

export default Dashboard;
