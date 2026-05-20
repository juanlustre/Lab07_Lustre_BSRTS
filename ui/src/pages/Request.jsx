import { useState } from "react";
import axios from "axios";

export default function Request() {

  const [requestType, setRequestType] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/requests/", {
        user_id: 1,
        request_type: requestType,
        details,
        status: "Pending"
      });

      setMessage("Request Submitted!");
    } catch (error) {
      setMessage("Failed to submit request");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <h2 className="text-2xl font-bold mb-4">Submit Request</h2>

      <select className="border p-2 w-full mb-2"
        onChange={(e) => setRequestType(e.target.value)}>
        <option>Select Service</option>
        <option>Barangay Clearance</option>
        <option>Certificate of Residency</option>
        <option>Business Permit</option>
      </select>

      <textarea className="border p-2 w-full mb-2"
        placeholder="Details"
        onChange={(e) => setDetails(e.target.value)} />

      <button onClick={handleSubmit}
        className="bg-green-600 text-white p-2 w-full">
        Submit
      </button>

      {message && <p className="mt-3">{message}</p>}

    </div>
  );
}