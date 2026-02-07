import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import axiosInstance from "../lib/axios";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import ConfirmModal from "../Components/ConfirmModal";

function NoteDetail() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosInstance.get(`/notes/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };
    fetchNote();
  }, [id]);

  const deleteNote = async () => {
    try {
      await axiosInstance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-20 py-4  gap-4 w-1/2 mx-auto rounded shadow-lg mt-10  transition-all duration-300 ease-in-out opacity-100 animate-fadeIn">
      {showConfirmModal && (
        <ConfirmModal
          title="Are you sure you want to delete this note?"
          positiveButtonText="OK"
          negativeButtonText="Cancel"
          onConfirm={deleteNote}
          onClose={() => setShowConfirmModal(false)}
        />
      )}

      <div className="flex justify-between mb-4 gap-20">
        <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon /> Back To Home
        </Link>
        <button
          className="btn btn-ghost text-red-500"
          onClick={() => setShowConfirmModal(true)}
        >
          <Trash2Icon /> Delete
        </button>
      </div>

      <div className="p-4 max-w-md mx-auto rounded shadow-lg mt-10 bg-primary text-primary-content">
        <h1 className="text-2xl font-bold mb-4">Update Note</h1>

        <form onSubmit={updateNote}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Title</label>
            <input
              className="w-full border rounded p-2"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Content</label>
            <textarea
              className="w-full border rounded p-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn outline justify-start">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteDetail;
