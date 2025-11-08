import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;
    if (trimmedSearch.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    // search by fullName or username (case-insensitive)
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(trimmedSearch.toLowerCase()) ||
      c.username.toLowerCase().includes(trimmedSearch.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found");
    }
  };

  return (
    <form className="flex items-center gap-2 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full w-full max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-sky-500 text-white hover:bg-sky-600"
      >
        <IoSearchSharp className="w-6 h-6" />
      </button>
    </form>
  );
}

export default SearchInput;
