import * as React from "react";
import { createContext, useContext } from "react";
import axios from "./axios";
import { useRouter } from "next/router";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [appState, setAppState] = React.useState({
    statusChecked: false,
    isLoggedIn: null,
    user: null,
  });

  const [projectMemo, setProjectMemo] = React.useState(null);
  const [shouldUpdateProject, setShouldUpdateProject] = React.useState(true);

  const checkStatus = async () => {
    axios
      .get("/auth/status")
      .then((res) => {
        setAppState({
          ...appState,
          statusChecked: true,
          isLoggedIn: res.data.is_logged_in,
          user: res.data.user,
        });
      })
      .catch((err) => {
        setAppState({
          ...appState,
          statusChecked: true,
          isLoggedIn: err.response.data.is_logged_in,
          user: err.response.data.user,
        });
      });
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    axios.defaults.headers["Authorization"] = `Bearer`;
    setAppState({
      ...appState,
      statusChecked: false,
      isLoggedIn: false,
      user: null,
    });
    checkStatus();
  };

  const getNext = () => {
    const router = useRouter();
    return router.asPath.startsWith("/auth") ? "/" : router.asPath;
  };

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "jwt"
      )}`;
    }
    checkStatus();
  }, []);

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
        checkStatus,
        logOut,
        projectMemo,
        setProjectMemo,
        shouldUpdateProject,
        setShouldUpdateProject,
        getNext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
