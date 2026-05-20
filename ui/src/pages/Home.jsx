export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        BSRTS System
      </h1>

      <p className="mb-6">
        Barangay Service Request and Tracking System
      </p>

      <div className="space-x-4">
        <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </a>

        <a href="/request" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit Request
        </a>
      </div>
    </div>
  );
}