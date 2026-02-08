import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Home from "./Home";
import { useNavigate, Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import axiosInstance from "../lib/axios";

function Creat() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const navigate = useNavigate();

  const AddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await axiosInstance.post("/notes", {
        title,
        content,
      });
      toast.success("Note added successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error("You are being rate limited. Please try again later.");
      } else {
        toast.error("Failed to add note.");
      }
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto display-flex flex-col gap-4 align-center border border-white-200 rounded shadow-lg mt-10 bg-primary text-primary-content transition-all duration-300 ease-in-out opacity-100 animate-fadeIn">
      <div>
        <Link to={`/`} className="btn btn-ghost"><ArrowLeftIcon />Back To Home</Link>
      </div>
      <div className="p-4 max-w-md mx-auto display-flex flex-col gap-4 align-center border border-white-200 rounded shadow-lg mt-10 bg-primary text-primary-content">
        <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
        <div>
          <form onSubmit={AddNote}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block mb-2 text-gray-700 font-semibold text-lg hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Title
              </label>
              <input
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-20 shadow"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="content"
                className="block mb-2 text-gray-700 font-semibold text-lg hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Content
              </label>
              <textarea
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-3000 shadow-inner"
                name="content"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn outline">
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Creat;
