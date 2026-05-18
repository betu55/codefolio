import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MacCard from "../../components/MacCard";
import { API_BASE_URL } from "../../utils/api.js";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) =>
    setFormData((currentData) => {
      setErrorMessage("");
      return { ...currentData, [e.target.name]: e.target.value };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userEmail", data.email);

      if (data.role === "ADMIN" || data.role === "SUPERUSER") {
        localStorage.setItem("adminToken", data.token);
      } else {
        localStorage.removeItem("adminToken");
      }

      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <MacCard custClass="w-full md:w-[30rem] h-[30rem] flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-left w-full h-full md:p-4 p-1"
        >
          <h2 className="text-3xl text-brand-dark_txt dark:text-brand-light_txt mb-4 mx-auto">
            Login
          </h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E-mail"
            className="input-field"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="input-field"
            required
          />
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          <button type="submit" className="pri-button" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log-in"}
          </button>
          <div>
            <p className="text-sm mt-4 md:text-base text-brand-dark_txt dark:text-brand-light_txt">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </MacCard>
    </div>
  );
};

export default Login;
