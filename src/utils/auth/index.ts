import history from "../../routes/history";

const getAuth = () => {
  if (!localStorage) {
    return;
  }

  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (!accessToken || !refreshToken) {
    console.log("errrr");
    return;
  }

  try {
    return {
      access_token: JSON.parse(accessToken as string),
      refresh_token: JSON.parse(refreshToken as string),
    };
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
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("current_user");
    localStorage.removeItem("organizer_id");
    window.location.href = "/login";
  }
};

export { getAuth, handleLogout, getOrganizer };
