export const colorToken = (mode: "light" | "dark") => {
  return mode == "light"
    ? {
        background: {
          main: "#f2fffbb0",
        },
        sidebar: {
          background: "#fff",
          border: "#ccc",
          bgselect: "#52A186",
          bghover: "#52a18652",
        },
        button: {
          primary: "#52A186",
          error: "#CA0000",
          info: "#ECA800",
          success: "#D2FFE4",
        },
      }
    : {
        background: {
          main: "#003e49",
        },
        sidebar: {
          background: "#002c34",
          border: "#00414c",
          bgselect: "#00677a",
          bghover: "#005463",
        },
        button: {
          primary: "#00B3D5",
          error: "#CA0000",
          info: "#ECA800",
          success: "#D2FFE4",
        },
      };
};
