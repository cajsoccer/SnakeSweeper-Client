import React, { useState } from "react";
import { RegisterValues } from "../Types";

function Register() {
  const [values, setValues] = useState<RegisterValues>({
    email: "",
    password1: "",
    password2: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={handleChange} name="email" />
        <input onChange={handleChange} name="password1" />
        <input onChange={handleChange} name="password2" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Register;
