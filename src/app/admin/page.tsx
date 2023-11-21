"use client";

import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [fileContent, setFileContent] = useState("");
  let fileRef = useRef();

  const readFile = (event: { target: { files: any } }) => {
    const fileReader = new FileReader();
    const { files } = event.target;

    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = (e) => {
      const content = e.target!.result;
      console.log(content);
      setFileContent(JSON.parse(content as string));
    };
  };

  const uploadData = async () => {
    const toastId = toast("Uploading data...", {
      type: "info",
      isLoading: true,
      autoClose: false,
    });
    const res = await fetch("/api/import", {
      method: "POST",
      body: JSON.stringify(fileContent),
    });
    console.log(res);
    if (res.ok) {
      toast.update(toastId, {
        render: "Data uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(toastId, {
        render: "Data upload failed!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center bg-gray-50">
      <div className="shadow bg-white p-8 flex flex-col gap-2 items-center">
        <span className="text-lg font-semibold">JSON Data Upload</span>
        {/* @ts-ignore */}
        <input ref={fileRef} type="file" onChange={readFile} />
        {/* @ts-ignore */}
        <button onClick={() => uploadData()}>Upload</button>
      </div>
    </div>
  );
};

export default AdminPage;
