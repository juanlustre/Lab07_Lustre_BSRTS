import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        BSRTS System
      </h1>

      <p className="mb-6 text-gray-600">
        Barangay Service Request and Tracking System
      </p>

      <div className="space-x-4">
        <Link className="bg-blue-600 text-white px-4 py-2 rounded" to="/register">
          Register
        </Link>

        <Link className="bg-green-600 text-white px-4 py-2 rounded" to="/request">
          Submit Request
        </Link>

        <Link className="bg-gray-700 text-white px-4 py-2 rounded" to="/view">
          View Requests
        </Link>
      </div>
    </div>
  );
}


function Register() {

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
    } catch (err) {
      setMessage("Registration Failed!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mb-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white p-2 w-full"
      >
        Register
      </button>

      {message && (
        <p className="mt-3 text-center font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}


function Request() {

  const [requestType, setRequestType] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/requests/", {
        user_id: 1,
        request_type: requestType,
        details: details,
        status: "Pending"
      });

      setMessage("Request Submitted Successfully!");
    } catch (err) {
      setMessage("Request Failed!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <h2 className="text-2xl font-bold mb-4">Submit Service Request</h2>

      <select
        className="border p-2 w-full mb-2"
        onChange={(e) => setRequestType(e.target.value)}
      >
        <option value="">Select Service</option>
        <option>Barangay Clearance</option>
        <option>Certificate of Residency</option>
        <option>Business Permit</option>
      </select>

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Request Details"
        onChange={(e) => setDetails(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white p-2 w-full"
      >
        Submit Request
      </button>

      {message && (
        <p className="mt-3 text-center font-semibold">
          {message}
        </p>
      )}

    </div>
  );
}


function ViewRequests() {

  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/requests/view/");
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">Service Requests</h2>

      {requests.map((req, index) => (
        <div key={index} className="border p-3 mb-2 rounded">
          <p><b>Type:</b> {req.request_type}</p>
          <p><b>Status:</b> {req.status}</p>
        </div>
      ))}

    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <div className="p-2 bg-gray-200 flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/request">Request</Link>
        <Link to="/view">View</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request" element={<Request />} />
        <Route path="/view" element={<ViewRequests />} />
      </Routes>
    </BrowserRouter>
  );
}