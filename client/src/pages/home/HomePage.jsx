import { useState } from "react";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");

	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen max-w-full md:flex-[3_3_0] lg:flex-[4_4_0]'>
				
				<div className='flex w-full border-b border-gray-700'>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative md:p-4 lg:p-5'
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary md:w-12 lg:w-16'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative md:p-4 lg:p-5'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary md:w-12 lg:w-16'></div>
						)}
					</div>
				</div>
				<CreatePost />
				<Posts feedType={feedType} />
			</div>
		</>
	);
};
export default HomePage;
