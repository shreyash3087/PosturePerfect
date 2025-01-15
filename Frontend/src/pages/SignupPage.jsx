import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SignupPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, account: selectedRole }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/";
      } else {
        setError(data.message || "An error occurred. Please try again.");
        localStorage.setItem("isLoggedIn", "false");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-6 bg-[#050722] shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-8">
          <div>
            <a
              href="/"
              className="text-2xl font-extrabold text-[#95bbf5] flex items-center"
            >
              Posture Perfect
            </a>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full flex-1 mt-2">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-100">
                  Choose a Plan
                </h2>
              </div>

              <div className="flex justify-center space-x-4">
                <div
                  className={`cursor-pointer w-1/2 p-6 bg-[#8c95e3] bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 ${
                    selectedRole === "Pro" ? "border-4 border-[#285eaf]" : ""
                  }`}
                  onClick={() => handleRoleSelect("Pro")}
                >
                  <FontAwesomeIcon
                    icon={faUserShield}
                    className="text-[#ffffff] text-3xl mb-4 h-8"
                  />
                  <h3 className="text-xl text-white font-semibold">Pro</h3>
                  <p className="mt-2 text-gray-100 text-sm">
                    Customizable avatars, priority customer support
                  </p>
                </div>
                <div
                  className={`cursor-pointer w-1/2 p-6 bg-[#8c95e3] bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 ${
                    selectedRole === "Pro" ? "border-4 border-[#285eaf]" : ""
                  }`}
                  onClick={() => handleRoleSelect("Free")}
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-[#ffffff] text-3xl mb-4 h-8"
                  />
                  <h3 className="text-xl text-white font-semibold">Free</h3>
                  <p className="mt-2 text-gray-100 text-sm">
                    Regular avatars and limited access to features
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mx-auto mt-8">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 tracking-wide font-semibold bg-[#3c437c] text-white w-full py-4 rounded-lg hover:bg-[#8c95e3] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <FontAwesomeIcon icon={faUsers} className="w-6 h-6 -ml-2" />
                  <span className="ml-2">
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </span>
                </button>
                <p className="mt-6 text-xs text-gray-400 text-center">
                  I agree to abide by Posture Perfect's{" "}
                  <a
                    href="#"
                    className="border-b border-gray-400 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-400 border-dotted"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <p className="mt-4 text-sm text-gray-400 text-center">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[#b4bcfd] hover:text-[#8c95e3] font-semibold"
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="flex bg-[#8c95e3] w-[60%] items-center justify-center text-center lg:flex max-lg:hidden">
          <img src="./background.png" className="w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
