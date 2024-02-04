import React from "react";
import Heading from "../UI/Heading";
import SubHeading from "../UI/SubHeading";
import InputBox from "../UI/InputBox";
import Button from "../UI/Button";
import BottomWarning from "../UI/BottomWarning";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Signup"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox label={"First Name"} placeholder={"John"} />
          <InputBox label={"Last Name"} placeholder={"Doe"} />
          <InputBox label={"Email"} placeholder={"johndoe@example.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <Button label={"Sign up"} />
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
