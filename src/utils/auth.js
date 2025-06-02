// utils/auth.js

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));

    return decodedPayload.userId; // change if your token uses a different key
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
