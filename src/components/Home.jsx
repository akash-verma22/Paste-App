import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useDispatch} from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { addToPaste, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const createPaste = () =>{
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleString()
    }

    // The paste already exists
    if(pasteId){
      dispatch(updateToPastes(paste));
    }

    // Creating a new Paste
    else{
      dispatch(addToPaste(paste))
    }

    // Clearing the data on the UI
    // After creating or updating the UI
    setTitle('');
    setValue('');
    setSearchParams({});

  }
  
  return (
    <div>
      <div>
        <input
          className="p-1 rounded-md text-center mt-3"
          type="text"
          placeholder="Type your Title here!"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button className="flex flex-row p-2 m-3 mx-auto " onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create new Paste"}
        </button>
      </div>

      <div>
        <textarea className="rounded-md p-2 m-2 mx-auto min-w-[400px]"
          value={value}
          placeholder="Enter your content here!"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={10}
        />
      </div>
    </div>
  );
};

export default Home;
