import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MacCard from "../../components/MacCard";
import { API_BASE_URL } from "../../utils/api.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userEmail", data.email);

      if (data.role === "ADMIN" || data.role === "SUPERUSER") {
        localStorage.setItem("adminToken", data.token);
      } else {
        localStorage.removeItem("adminToken");
      }

      setSuccessMessage("Registration successful. Redirecting to projects...");
      navigate("/projects");
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      <MacCard custClass="w-[94%] md:w-1/2 h-fit flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-left w-full h-full md:p-4"
        >
          <h2 className="text-3xl text-brand-dark_txt dark:text-brand-light_txt mb-4 mx-auto">
            Register
          </h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input-field"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="input-field"
            required
          />

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm text-green-600">{successMessage}</p>
          )}

          <button type="submit" className="pri-button" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          <div>
            <p className="text-sm md:text-base text-brand-dark_txt dark:text-brand-light_txt">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </MacCard>
    </div>
  );
};

export default Register;
