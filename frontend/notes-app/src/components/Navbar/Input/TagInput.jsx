import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="text-green-400">
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm bg-gray-800 text-green-400 px-3 py-1 rounded border border-green-600"
            >
              # {tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose className="text-red-400 hover:text-red-300" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-gray-900 text-green-400 border border-green-600 px-3 py-2 rounded outline-none placeholder-green-500"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-green-600 hover:bg-green-600"
          onClick={() => addNewTag()}
        >
          <MdAdd className="text-2xl text-green-600 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
