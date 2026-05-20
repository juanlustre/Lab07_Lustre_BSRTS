import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        name,
        email,
        password
      });

      setMessage("Registration Successful!");
    } catch (error) {
      setMessage("Registration Failed!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input className="border p-2 w-full mb-2" placeholder="Name"
        onChange={(e) => setName(e.target.value)} />

      <input className="border p-2 w-full mb-2" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />

      <input type="password" className="border p-2 w-full mb-2" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}
        className="bg-blue-600 text-white p-2 w-full">
        Register
      </button>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}