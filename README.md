# X Clone (Twitter Clone)

A full-stack clone of Twitter (now known as X) using the MERN stack. This project replicates core functionalities of the social media platform, including user authentication, profile management, post creation, and follow/like interactions.

## Features

- **User Authentication** with JWT tokens
- **Password Security** using bcryptjs
- **Profile Management** for user avatars and information
- **Posts (Tweets)** with create, view, and delete features
- **Likes and Follows** for social interaction
- **Real-time Feed** with posts from followed users
- **Responsive UI** for mobile and desktop

## Tech Stack

- **Frontend**: React, TanStack, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## Setup

### Prerequisites

- **Node.js** and **npm**
- **MongoDB** (local or hosted)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ravi0529/X-clone.git
   ```

2. **Navigate to the project directory**: After cloning the repository, change into the project directory using:

   ```bash
   cd X-clone
   ```

3. **Install dependencies**: X-clone has both a frontend and a backend. You will need to install dependencies for both parts of the application.

   - For the **frontend**, navigate to the client folder and run:

   ```bash
   cd client
   npm install
   ```

   - For the **backend**, navigate to the main folder and run:

   ```bash
   cd ..
   npm install
   ```

4. **Set up environment variables**: In the main folder, create a `.env` file:

   Replace the necessary elements found in the `.env.sample` file.

5. **Run the application**: You will need to start both the frontend and backend servers.

- To start the **backend**, navigate to the main folder and run:

  `npm run dev`




  `npm run dev`
