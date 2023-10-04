import history from "../../routes/history";

const getAuth = () => {
  if (!localStorage) {
    return;
  }

  const lsValue = localStorage.getItem("access_token");
  if (!lsValue) {
    return;
  }

  try {
    const auth = JSON.parse(lsValue);
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const getOrganizer = () => {
  if (!localStorage) {
    return;
  }

  const lsValue = localStorage.getItem("organizer_id");
  if (!lsValue) {
    return;
  }

  try {
    const organizer = JSON.parse(lsValue);
    if (organizer) {
      return organizer;
    }
  } catch (error) {
    console.error("Get organizer error", error);
  }
};

const handleLogout = () => {
  if (window.location.pathname !== "/login") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("current_user");
    localStorage.removeItem("organizer_id");
    window.location.href = "/login";
  }
};

export { getAuth, handleLogout, getOrganizer };
