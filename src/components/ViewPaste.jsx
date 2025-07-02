import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { addToPaste, updateToPastes } from "../redux/pasteSlice";


const ViewPaste = () => {
  
  const {id} = useParams();

  const allPastes = useSelector((state)=>state.paste.pastes);
  
  const paste = allPastes.filter((p)=>p._id===id)[0];

  return (
    <div>
      <div>
        <input
          className="p-1 rounded-md text-center mt-3"
          type="text"
          placeholder="Type your Title here!"
          value={paste.title}
          disabled
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* <button className="flex flex-row p-2 m-3 mx-auto " onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create new Paste"}
        </button> */}
      </div>

      <div>
        <textarea className="rounded-md p-2 m-2 mx-auto min-w-[400px]"
          value={paste.content}
          placeholder="Enter your content here!"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={10}
          disabled
        />
      </div>
    </div>    
  )
}

export default ViewPaste
