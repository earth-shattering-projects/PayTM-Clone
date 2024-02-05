import React, { useState } from "react";
import Heading from "../UI/Heading";
import SubHeading from "../UI/SubHeading";
import InputBox from "../UI/InputBox";
import Button from "../UI/Button";
import BottomWarning from "../UI/BottomWarning";
import Landing from "../UI/Landing";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Landing>
      <Heading label={"Sign Up"} />
      <SubHeading label={"Enter your information to create an account"} />
      <InputBox
        label={"First Name"}
        placeholder={"John"}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <InputBox
        label={"Last Name"}
        placeholder={"Doe"}
        onChange={(e) => setLastName(e.target.value)}
      />
      <InputBox
        label={"Email"}
        placeholder={"johndoe@example.com"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputBox
        label={"Password"}
        placeholder={"123456"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        label={"Sign Up"}
        clickHandler={async () => {
          try {
            const response = await axios.post(
              "http://localhost:3000/api/v1/user/signup",
              {
                firstName,
                lastName,
                password,
                username: email,
              }
            );
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
          } catch (error) {
            console.log(error.response.data);
          }
        }}
      />
      <BottomWarning
        label={"Already have an account?"}
        buttonText={"Sign in"}
        to={"/signin"}
      />
    </Landing>
  );
};

export default Signup;
