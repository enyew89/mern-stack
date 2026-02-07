import React from "react";
import NavBar from "../Components/Nav";
import { useEffect, useState } from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { useNavigate, Link } from "react-router";
import formatDate from "../lib/utlities";
import axiosInstance from "../lib/axios";
import ConfirmModal from "../Components/ConfirmModal";
import toast from "react-hot-toast";
import NotesNotFound from "../Components/NoteNotFound";
import RateLimitedUI from "../Components/RateLimiter";

function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (note) => {
    navigate(`/notes/${note._id}`);
  };

  const handleDelete = async () => {
    if (!noteToDelete) return;
    try {
      await axiosInstance.delete(`/notes/${noteToDelete}`);
      setNotes(notes.filter((note) => note._id !== noteToDelete));
      toast.success("Note deleted successfully!");

      setShowConfirmModal(false);
      setNoteToDelete(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);
      }
      console.error("Error fetching notes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 px-20 py-4">
      <NavBar />

      {showConfirmModal && (
        <ConfirmModal
          id="delete-modal"
          title="Are you sure you want to delete this note?"
          positiveButtonText="Yes"
          negativeButtonText="No"
          onConfirm={handleDelete}
          onClose={() => setShowConfirmModal(false)}
        />
      )}

      {loading && (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="ml-4 text-lg font-semibold">Loading...</p>
        </div>
      )}

      {isRateLimited && (
        <RateLimitedUI />
      )}
      {!loading && !isRateLimited && notes.length === 0 && (
         <NotesNotFound />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 justify-items-center transition-all duration-300 ease-in-out opacity-100 animate-fadeIn">
        {notes.map((note) => (
          <Link
            to={`/notes/${note._id}`}
            key={note._id}
            className="card bg-primary text-primary-content w-full sm:w-80 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">{note.title}</h2>
              <p>{note.content}</p>
              <div className="card-actions flex justify-between mt-4 items-center">
                <p className="text-sm text-gray-400">{formatDate(note.createdAt)}</p>
                <div className="flex gap-2">
                  <Trash2Icon
                    className="text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmModal(true);
                      setNoteToDelete(note._id);
                      e.stopPropagation();
                    }}
                  />
                  <PenSquareIcon
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(note);
                      e.stopPropagation();
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
