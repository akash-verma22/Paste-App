import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {
  
  const pastes = useSelector((state)=>
  state.paste.pastes);

  const [searchTerm,setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste)=>
  paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  function deletePaste(paste){
    dispatch(removeFromPastes(paste));
  }

  
  return (
    <div>
      <input className='m-2 p-1.5 rounded-md text-center min-w-[300px]' type='search' placeholder='Search Paste' value={searchTerm}
        onChange={(e)=>{setSearchTerm(e.target.value)}}
      />
      <div className='flex flex-col m-2 gap-4 min-w-[600px]'>
        {
          filteredData.length >0 ? filteredData.map(
            (paste)=>{
              return(
                <div className='border min-h-[100px]' key={paste._id} >
                  <div className='text-xl font-bold' >
                    {paste.title}
                  </div>
                  <div className='m-2 text-xl'>
                    {paste.content}
                  </div>
                  <div className='flex flex-row p-2 place-content-evenly'>
                    <button>View</button>
                    <button>Edit</button>
                    <button onClick={()=>{deletePaste(paste)}}>Delete</button>
                    <button onClick={()=>{
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to Clipboard")
                    }}>Copy</button>
                    <button>Share</button>




                  </div>
                </div>
              )
            }) : <div>No Pastes Found</div>
        }
      </div>
    </div>
  )
}

export default Pastes
