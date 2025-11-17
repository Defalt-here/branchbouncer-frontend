"use client";

import { saveAs } from "file-saver";

export default function DownloadButton({ blob }: { blob: Blob }) {
  return (
    <button
      onClick={() => saveAs(blob, "branchbouncer-setup.zip")}
      style={{
        marginTop: 20,
        background: "#0070f3",
        color: "white",
        padding: "12px 20px",
        borderRadius: 6
      }}
    >
      Download Setup ZIP
    </button>
  );
}
