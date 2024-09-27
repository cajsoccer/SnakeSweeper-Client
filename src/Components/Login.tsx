import React, { useState } from "react";
import { LoginValues } from "../Types";

function Login() {
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
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
        <input onChange={handleChange} name="password" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Login;
