import React, { useState } from "react";
import TagInput from "../../components/Navbar/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

function AddEditNotes({ noteData, type, onClose, getAllNotes }) {
 const [title, setTitle] = useState(noteData?.title || "");
 const [content, setContent] = useState(noteData?.content || "");
 const [tags, setTags] = useState(noteData?.tags || []);
 const [error, setError] = useState(null);

 // Add note
 const addNewNote = async () => {
  try {
   const response = await axiosInstance.post("/add-note", {
    title,
    content,
    tags,
   });

   if (response.data.note) {
    getAllNotes();
    onClose();
   } else {
    console.log("Unexpected response");
   }
  } catch (error) {
   console.log(error);
   if (error.response?.data?.message) {
    setError(error.response.data.message);
   }
  }
 };

 // Edit note
 const editNote = async () => {
  const noteKey = noteData?._id;

  try {
   const response = await axiosInstance.put(`/edit-note/${noteKey}`, {
    title,
    content,
    tags,
   });

   if (response.data.note) {
    getAllNotes();
    onClose();
   } else {
    console.log("Unexpected response");
   }
  } catch (error) {
   console.log(error);
   if (error.response?.data?.message) {
    setError(error.response.data.message);
   }
  }
 };

 const handleAddNote = () => {
  if (!title) {
   setError("Please enter the title");
   return;
  }

  if (!content) {
   setError("Please enter the content");
   return;
  }
  setError("");

  if (type === "edit") {
   editNote();
  } else {
   addNewNote();
  }
 };

 return (
  <div className="relative bg-black text-green-400 p-6 rounded-md border border-green-600">
   <button
    className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-green-700"
    onClick={onClose}
   >
    <MdClose className="text-xl text-green-300" />
   </button>

   <div className="flex flex-col gap-2">
    <label className="text-green-300 font-medium">TITLE</label>
    <input
     type="text"
     className="text-2xl text-green-400 bg-black border border-green-600 p-2 rounded outline-none"
     placeholder="Solve leetcode potd"
     value={title}
     onChange={({ target }) => setTitle(target.value)}
    />
   </div>

   <div className="flex flex-col gap-2 mt-4">
    <label className="text-green-300 font-medium">CONTENT</label>
    <textarea
     className="text-sm text-green-400 bg-black border border-green-600 p-2 rounded outline-none"
     placeholder="Content"
     rows={10}
     value={content}
     onChange={({ target }) => setContent(target.value)}
    />
   </div>

   <div className="mt-3">
    <label className="text-green-300 font-medium">TAGS</label>
    <TagInput tags={tags} setTags={setTags} />
   </div>

   {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

   <button
    className="bg-green-600 text-black hover:bg-green-500 py-2 px-4 rounded mt-5 font-medium"
    onClick={handleAddNote}
   >
    {type === "edit" ? "UPDATE" : "ADD"}
   </button>
  </div>
 );
}

export default AddEditNotes;
