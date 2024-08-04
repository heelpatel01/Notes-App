import moment from "moment";
import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-gray-900 text-green-400 hover:shadow-lg transition-all ease-in-out">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h6 className="text-lg font-medium font-mono">{title}</h6>
          <span className="text-xs text-gray-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn cursor-pointer ${isPinned ? "text-yellow-500" : "text-gray-500"
            }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-sm text-gray-300 mt-2">{content?.slice(0, 80)}...</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-500 space-x-1">
          {tags.map((item, index) => (
            <span key={index}>{`#${item}`}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn cursor-pointer hover:text-green-300 transition-colors duration-200"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn cursor-pointer hover:text-red-400 transition-colors duration-200"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
