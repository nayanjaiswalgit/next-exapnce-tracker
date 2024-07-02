"use client"
import React, { useState, ChangeEvent } from 'react';

const PdfToJsonConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('/api/em/pdf-to-json', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert PDF to JSON');
      }

      const data = await response.json();
      console.log('PDF to JSON result:', data);
      // Handle JSON data as needed in your application
    } catch (error:any) {
      console.error('Error converting PDF to JSON:', error.message);
    }
  };

  return (
    <div>
      <h1>PDF to JSON Converter</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Convert PDF to JSON</button>
    </div>
  );
};

export default PdfToJsonConverter;
