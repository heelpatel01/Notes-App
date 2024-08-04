import React from "react";

function EmptyCard() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <img
        src="https://i.pinimg.com/originals/7a/fe/01/7afe01d2cc84a926780f70a58857cf70.jpg"
        alt="No notes"
        className="mb-4 w-40 h-40 object-cover"
      />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No Notes Available
      </h2>
      <p className="text-gray-500 mb-4">
        You haven't created any notes yet. Click the button below to add your first note.
      </p>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400">
        Add Note
      </button>
    </div>
  );
}

export default EmptyCard;
