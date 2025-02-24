import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      setError("Wrong username or password");
    } else {
      // Redirect to the homepage or a protected page after successful login
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg shadow-black w-full max-w-md">
        <h1 className="text-3xl mb-6 text-center">Sign In</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-300"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          You're a new user?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
