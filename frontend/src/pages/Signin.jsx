import React from "react";
import Heading from "../UI/Heading";
import SubHeading from "../UI/SubHeading";
import InputBox from "../UI/InputBox";
import Button from "../UI/Button";
import BottomWarning from "../UI/BottomWarning";
import Landing from "../UI/Landing";

const Signin = () => {
  return (
    <Landing>
      <Heading label={"Sign In"} />
      <SubHeading label={"Enter your credentials to access your account"} />
      <InputBox label={"Email"} placeholder={"johndoe@example.com"} />
      <InputBox label={"Password"} placeholder={"123456"} />
      <Button label={"Sign In"} />
      <BottomWarning
        label={"Don't have an account?"}
        buttonText={"Sign Up"}
        to={"/signup"}
      />
    </Landing>
  );
};

export default Signin;
