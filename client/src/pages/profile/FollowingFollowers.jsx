import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const FollowingFollowers = () => {
    const { username, type } = useParams();
    const navigate = useNavigate();

    // State to manage toggle between followers and following
    const [currentType, setCurrentType] = useState(type || 'followers');

    const { data, isLoading, error } = useQuery({
        queryKey: [`${currentType}`, username],
        queryFn: async () => {
            const res = await axios.get(`/api/users/${username}/${currentType}`);
            if (res.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            return res.data;
        },
    });

    const handleToggle = (newType) => {
        setCurrentType(newType);
        navigate(`/profile/${username}/${newType}`); // Update the URL based on type
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-black text-white rounded-md shadow-md">
            <div className="flex justify-center space-x-4 border-b border-gray-700 pb-2">
                <button
                    className={`px-4 py-2 font-semibold ${currentType === 'followers' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-blue-400'
                        }`}
                    onClick={() => handleToggle('followers')}
                >
                    Followers
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${currentType === 'following' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-blue-400'
                        }`}
                    onClick={() => handleToggle('following')}
                >
                    Following
                </button>
            </div>

            <h1 className="text-xl font-semibold mb-4 mt-4">
                {currentType === 'following' ? "Following" : "Followers"} of {username}
            </h1>

            {data?.length > 0 ? (
                <ul className="space-y-2">
                    {data.map((user) => (
                        <li key={user._id} className="flex items-center gap-4 p-2 bg-secondary rounded-md">
                            <img
                                src={user.profileImg || "/avatar-placeholder.png"}
                                alt={`${user.username}'s avatar`}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <Link to={`/profile/${user.username}`} className="text-sm text-white">
                                    {user.fullName}
                                </Link>
                                <p className="text-sm text-slate-500">@{user.username}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No {currentType} found for {username}.</p>
            )}
        </div>
    );
};

export default FollowingFollowers;
