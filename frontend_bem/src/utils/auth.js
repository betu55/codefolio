export const isAdminLoggedIn = () => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  return Boolean(token) && (role === "ADMIN" || role === "SUPERUSER");
};
