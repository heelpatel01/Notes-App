import React, { useEffect, useState } from "react";
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState([]);

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/fetch-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Unexpected error occurred. Please try again later.");
    }
  };

  // Handle edit note
  const handleEditNote = (noteDetail) => {
    setOpenAddEditModal({ isShown: true, data: noteDetail, type: "edit" });
  };

  //handle delete note

  const handleDeleteNote = async (noteData) => {
    const noteKey = noteData?._id;
  
    try {
     const response = await axiosInstance.delete(`/delete-note/${noteKey}`);
  
     if (response.data) {
      getAllNotes();
     } else {
      console.log("Unexpected response");
     }
    } catch (error) {
     console.log(error);
     if (error.response?.data?.message) {
        console.log("Error Occured in Deletion")
    }
    }
   };

  useEffect(() => {
    getUserInfo();
    handleDeleteNote();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="bg-gray-900 text-green-400 min-h-screen p-6">
        
        {allNotes.length>0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEditNote(item)}
              onDelete={() => handleDeleteNote(item)}
              onPinNote={() => {}}
            />
          ))}
        </div> ): (<EmptyCard />)}

        <button
          className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 absolute right-10 bottom-10 shadow-lg transition-transform transform hover:scale-105"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-black" />
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.75)",
            },
          }}
          contentLabel=""
          className="w-[40%] max-h-[80vh] mx-auto mt-14 p-4 overflow-hidden"
        >
          <div className="w-full h-full overflow-hidden">
            <AddEditNotes
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={() => {
                setOpenAddEditModal({ isShown: false, type: "add", data: null });
              }}
              getAllNotes={getAllNotes}
            />
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Home;
