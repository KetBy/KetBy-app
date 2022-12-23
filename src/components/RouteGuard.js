import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useAppContext } from "../utils/context";
import CustomCircularProgress from "./custom/CircularProgress";

export default function RouteGuard(props) {
  const router = useRouter();
  const { asPath } = router;
  const { appState } = useAppContext();

  if (
    typeof window !== "undefined" &&
    appState.statusChecked &&
    !appState.isLoggedIn
  ) {
    router.push(`/auth/login?mustLogIn=true&next=${asPath}`);
  } else if (!appState.statusChecked) {
    return (
      <Box
        sx={{
          minHeight: (theme) => `calc(100vh - ${theme.constants.menuHeight}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomCircularProgress />
      </Box>
    );
  } else {
    return props.children;
  }
}
