import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TEN_MINUTES = 10 * 60 * 1000;

const autoLogout = (isAdmin) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isAdmin) return;

    const logout = () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");

      navigate("/login");
    };

    const resetTimer = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(logout, TEN_MINUTES);
    };

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutRef.current);

      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAdmin, navigate]);
};

export default autoLogout;
