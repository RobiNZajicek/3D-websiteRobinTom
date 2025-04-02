// File: GCodeViewer.tsx
import React, { useEffect, useState } from "react";

interface GCodeViewerProps {
  file: File;
}

const GCodeViewer: React.FC<GCodeViewerProps> = ({ file }) => {
  const [gcodeContent, setGcodeContent] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setGcodeContent(reader.result as string);
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div className="p-4 bg-gray-200 h-full overflow-auto">
      <h2 className="text-xl font-bold mb-4">Zobrazení G-code</h2>
      <pre className="bg-black text-green-300 p-4">
        {gcodeContent}
      </pre>
    </div>
  );
};

export default GCodeViewer;
