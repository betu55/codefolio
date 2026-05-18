import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TEN_MINUTES = 10 * 60 * 1000;
const LAST_ACTIVITY_KEY = "adminLastActivity";

const useAutoLogout = (isAdmin) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isAdmin) return;

    const logout = () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      localStorage.removeItem(LAST_ACTIVITY_KEY);

      navigate("/login");
    };

    const hasExpired = () => {
      const lastActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY));

      if (!lastActivity) return false;

      return Date.now() - lastActivity >= TEN_MINUTES;
    };

    const scheduleLogout = () => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (hasExpired()) {
          logout();
        } else {
          scheduleLogout();
        }
      }, TEN_MINUTES);
    };

    const resetTimer = () => {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      scheduleLogout();
    };

    const checkExpiration = () => {
      if (hasExpired()) {
        logout();
      }
    };

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "touchmove",
      "click",
      "pointerdown",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    window.addEventListener("focus", checkExpiration);
    window.addEventListener("pageshow", checkExpiration);
    document.addEventListener("visibilitychange", checkExpiration);

    resetTimer();

    return () => {
      clearTimeout(timeoutRef.current);

      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });

      window.removeEventListener("focus", checkExpiration);
      window.removeEventListener("pageshow", checkExpiration);
      document.removeEventListener("visibilitychange", checkExpiration);
    };
  }, [isAdmin, navigate]);
};

export default useAutoLogout;