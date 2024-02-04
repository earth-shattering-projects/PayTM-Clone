import React from "react";
import Heading from "../UI/Heading";
import SubHeading from "../UI/SubHeading";
import InputBox from "../UI/InputBox";
import Button from "../UI/Button";
import BottomWarning from "../UI/BottomWarning";

const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
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
        </div>
      </div>
    </div>
  );
};

export default Signin;
