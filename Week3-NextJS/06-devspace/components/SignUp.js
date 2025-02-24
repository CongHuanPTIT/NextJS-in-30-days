import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [realName, setRealName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload-profile-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setProfileImage(data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, realName, bio, profileImage }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg shadow-black w-full max-w-md">
        <h1 className="text-3xl mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="realName"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Real name
            </label>
            <input
              type="text"
              placeholder="Real name"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Bio
            </label>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg min-h-[100px] focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Profile image
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-300"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
