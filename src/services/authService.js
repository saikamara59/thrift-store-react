const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error || data.err) {
      throw new Error(data.error || data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      // Your backend puts the user info in "payload"
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    throw new Error(err);
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error || data.err) {
      throw new Error(data.error || data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      // Your backend puts the user info in "payload"
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    throw new Error(err);
  }
};

const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    // Your backend puts user info in "payload"
    return JSON.parse(atob(token.split(".")[1])).payload;
  } catch {
    return null;
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp) {
      return Date.now() < payload.exp * 1000;
    }
    return true;
  } catch {
    return false;
  }
};

const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.is_admin === true;
};

const signOut = () => {
  localStorage.removeItem("token");
};

const getToken = () => {
  return localStorage.getItem("token");
};

export { 
  signUp, 
  signIn, 
  getCurrentUser,
  isAuthenticated,
  isAdmin,
  signOut,
  getToken
};
