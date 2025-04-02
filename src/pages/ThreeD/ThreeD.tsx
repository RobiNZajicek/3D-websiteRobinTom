// File: ThreeD.tsx
import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!file) {
      setMessage("Vyberte soubor, než ho nahrajete.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.text();
        setMessage(`Soubor úspěšně nahrán: ${result}`);
      } else {
        const error = await response.text();
        setMessage(`Chyba při nahrávání souboru: ${error}`);
      }
    } catch (error) {
      setMessage("Nastala chyba při připojení k serveru.");
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white y-100 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Nahraj 3D model
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".stl,.gcode"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Nahrát
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("úspěšně")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
