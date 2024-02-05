import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import { useEffect, useState } from "react";

const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  return (
    <div className="pl-4 pr-4">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      {users.map((user) => (
        <User user={user} key={user._id} />
      ))}
    </div>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-lg">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          clickHandler={() => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
};

export default Users;
