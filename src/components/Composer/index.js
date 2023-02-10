import * as React from "react";
import { Box, Grid } from "@mui/material";
import "katex/dist/katex.min.css";
import Canvas from "./Canvas";
import GatesDirectory from "./GatesDirectory";
import Sidebar from "./Sidebar";
import parseInstructionsString from "../../utils/parseInstructionsString";
import generateCanvasMatrix from "../../utils/generateCanvasMatrix";
import theme from "../../themes/default";
import axios from "../../utils/axios";
import CustomCircularProgress from "../custom/CircularProgress";

const Wrapper = (props) => {
  const { files, file, setActiveFile, sidebarCollapsed, setSidebarCollapsed } =
    props;

  const [circuit, setCircuit] = React.useState({
    meta: file.meta,
    instructions:
      file.content == null
        ? []
        : [
            file.content.map((instruction, index) => {
              return { ...instruction, uid: index };
            }),
          ],
  });

  return (
    <Grid
      container
      sx={{
        height: `calc(100vh - ${theme.constants.menuHeight}px) !important`,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Grid item width="auto">
        <GatesDirectory circuit={circuit} setCircuit={setCircuit} />
      </Grid>
      <Grid item xs>
        <Canvas
          circuit={circuit}
          setCircuit={setCircuit}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      </Grid>
      <Grid item width="auto">
        <Sidebar collapsed={sidebarCollapsed} circuit={circuit} />
      </Grid>
    </Grid>
  );
};

export default function Composer(props) {
  const { projectToken, fileIndex } = props;

  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [circuit, setCircuit] = React.useState(null);
  const [files, setFiles] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [project, setProject] = React.useState(null);
  const [activeFile, setActiveFile] = React.useState(null);

  React.useEffect(() => {
    if (projectToken && fileIndex) {
      axios
        .get(`/project/${projectToken}`, {
          fileIndex: parseInt(fileIndex),
        })
        .then((res) => {
          let data = res.data;
          if (data.success) {
            setProject(data.project);
            let newFiles = {};
            data.files.map((file, index) => {
              newFiles[file.file_index] = file;
            });
            setFiles(newFiles);
            if (typeof newFiles[fileIndex] == "undefined") {
              throw new Exception("This file does not exist");
            }
            setActiveFile(fileIndex);
            setLoading(false);
          } else {
            throw new Exception("Something went wrong.");
          }
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        });
    } else {
      let startCircuit = {
        meta: {
          qubits: 1,
          bits: 0,
        },
        instructions: [],
      };
      setCircuit(startCircuit);
    }
  }, []);

  return (
    <Box
      sx={{
        userSelect: "none",
        bgcolor: "white",
      }}
    >
      {loading ? (
        <Box
          sx={{
            minHeight: `calc(100vh - ${theme.constants.menuHeight}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomCircularProgress />
        </Box>
      ) : (
        <Wrapper
          files={files}
          file={files[activeFile]}
          setActiveFile={setActiveFile}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      )}
    </Box>
  );
}
