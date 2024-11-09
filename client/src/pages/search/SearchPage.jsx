import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import RightPanel from "../../components/common/RightPanel";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["searchUsers", query],
    queryFn: async () => {
      if (!query) return [];
      const response = await axios.get(`/api/search?query=${query}`);
      return response.data.users;
    },
    enabled: !!query,
  });

  return (
    <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen p-6 ml-[-15px]">
      <h1 className="text-3xl font-semibold mb-6 text-center">Search Users</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xl p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">An error occurred while fetching users.</p>}

      <div className="space-y-2">
        {users.length > 0 ? (
          users.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user?.username}`}
              className="card shadow-md bg-base-100 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user?.profileImg || "/avatar-placeholder.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-md font-medium">{user.fullName}</p>
                  <p className="text-sm font-medium text-gray-500">@{user.username}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          query && <p className="text-center text-gray-600">No users found.</p>
        )}
      </div>

      <section className="block lg:hidden">
        <RightPanel />
      </section>
    </div>
  );
};

export default SearchPage;
