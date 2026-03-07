import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Register() {



  
  return (
      <form>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
      />
      <input
        type="password"
        placeholder="Password"
      />
        <input
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}