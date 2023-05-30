import React from "react";
import { saveAs } from "file-saver";

const DownloadButtons = ({
  data,
  fileName,
}: {
  data: any;
  fileName: string;
}) => {
  const downloadCSV = () => {
    const csvData = convertToCSV(data); // Implement the convertToCSV function
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${fileName}.csv`);
  };

  const downloadJSON = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, `${fileName}.json`);
  };

  return (
    <div className="btn-group">
      <button
        className="btn-outline btn-primary btn-sm btn"
        onClick={downloadCSV}
      >
        Download CSV
      </button>
      <button
        className="btn-outline btn-primary btn-sm btn"
        onClick={downloadJSON}
      >
        Download JSON
      </button>
    </div>
  );
};
const convertToCSV = <T extends Record<string, unknown>>(data: T[]) => {
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((item) => Object.values(item).join(",")).join("\n");
  return header + rows;
};
export default DownloadButtons;
