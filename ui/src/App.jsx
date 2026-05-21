import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

/* ================= HOME ================= */
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col justify-center items-center">

      <div className="bg-white/80 shadow-2xl rounded-3xl p-16 text-center w-[90%] max-w-5xl">

        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
          BSRTS System
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Barangay Service Request and Tracking System
        </p>

        <div className="flex flex-row justify-center gap-8 flex-wrap">

          <Link to="/register" className="bg-blue-600 text-white text-2xl px-10 py-6 rounded-2xl">
            Register
          </Link>

          <Link to="/request" className="bg-green-600 text-white text-2xl px-10 py-6 rounded-2xl">
            Submit Request
          </Link>

          <Link to="/view" className="bg-gray-800 text-white text-2xl px-10 py-6 rounded-2xl">
            View Requests
          </Link>

          <Link to="/admin-login" className="bg-red-600 text-white text-2xl px-10 py-6 rounded-2xl">
            Admin Panel
          </Link>

        </div>
      </div>
    </div>
  );
}

/* ================= NAVBAR ================= */
function Navbar() {
  return (
    <div className="bg-gray-900 text-white flex gap-6 p-4 text-lg">

      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/request">Request</Link>
      <Link to="/view">View</Link>
      <Link to="/admin-login">Admin</Link>

    </div>
  );
}

/* ================= REGISTER ================= */
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

      localStorage.setItem("userName", name);

      setMessage("Registration Successful!");

      setName("");
      setEmail("");
      setPassword("");

    } catch {
      setMessage("Registration Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center p-10">

        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">

          <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

          <form autoComplete="off">

            <input
              className="border p-3 w-full mb-4"
              placeholder="Name"
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border p-3 w-full mb-4"
              placeholder="Email"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="border p-3 w-full mb-4"
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />

          </form>

          <button onClick={handleRegister} className="bg-blue-600 text-white w-full p-3">
            Register
          </button>

          <p className="text-center mt-3">{message}</p>

        </div>
      </div>
    </div>
  );
}

/* ================= REQUEST ================= */
function Request() {

  const [requestType, setRequestType] = useState("");
  const [details, setDetails] = useState("");
  const [neededTime, setNeededTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
  try {
    const userName = localStorage.getItem("userName") || "Anonymous";

    await axios.post("http://127.0.0.1:8000/api/requests/", {
  name: userName,
  request_type: requestType,
  details: details,
  needed_time: neededTime,   
  status: "Pending"
});

    setMessage("Request Submitted!");
  } catch {
    setMessage("Failed!");
  }
};

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center p-10">

        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl">

          <h2 className="text-3xl font-bold mb-6 text-center">Submit Request</h2>

          <select className="border p-3 w-full mb-4"
            onChange={(e) => setRequestType(e.target.value)}>
            <option>Select Service</option>
            <option>Clearance</option>
            <option>Residency</option>
          </select>

          <textarea className="border p-3 w-full mb-4"
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details"
          />

          <input type="datetime-local" className="border p-3 w-full mb-4"
            onChange={(e) => setNeededTime(e.target.value)}
          />

          <button onClick={handleSubmit} className="bg-green-600 text-white w-full p-3">
            Submit
          </button>

          <p className="text-center mt-3">{message}</p>

        </div>
      </div>
    </div>
  );
}

/* ================= VIEW ================= */
function ViewRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/requests/view/")
      .then(res => setRequests(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-10">

        {requests.map((r) => (
          <div key={r.id} className="bg-white p-5 mb-4 rounded-xl shadow">
            <p>Requested By: {r.name}</p>
            <p>Service: {r.request_type}</p>
            <p>Status: {r.status}</p>
            <p>Time: {r.needed_time}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

/* ================= ADMIN LOGIN ================= */
function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 
  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  const login = () => {
    if (username === "admin" && password === "admin123") {

      localStorage.setItem("isAdmin", "true");

      setUsername("");
      setPassword("");

      window.location.href = "/admin";

    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">

        <h2 className="text-2xl mb-4 text-center">Admin Login</h2>

        <form autoComplete="off">

          <input
            className="border p-2 w-full mb-3"
            placeholder="Username"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="border p-2 w-full mb-3"
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

        </form>

        <button onClick={login} className="bg-red-600 text-white w-full p-2">
          Login
        </button>

      </div>
    </div>
  );
}

/* ================= ADMIN PAGE ================= */
function AdminPage() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      window.location.href = "/";
    }
  }, []);

  const load = () => {
    axios.get("http://127.0.0.1:8000/api/requests/view/")
      .then(res => setRequests(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const update = (id, status) => {
    axios.put(`http://127.0.0.1:8000/api/requests/${id}/`, { status })
      .then(load);
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-10">

        <div className="flex justify-end mb-4">

          <button onClick={logout} className="bg-black text-white px-4 py-2 rounded">
            Logout
          </button>

        </div>

        <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>

        {requests.map((r) => (
          <div key={r.id} className="bg-white p-5 mb-4 rounded-xl shadow">
            
            <p><b>Requested By:</b> {r.name}</p>
            <p>{r.request_type}</p>
            <p>{r.status}</p>

            <button onClick={() => update(r.id, "Approved")}
              className="bg-green-500 text-white px-3 py-1 mr-2">
              Approve
            </button>

            <button onClick={() => update(r.id, "Rejected")}
              className="bg-red-500 text-white px-3 py-1">
              Reject
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request" element={<Request />} />
        <Route path="/view" element={<ViewRequests />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}