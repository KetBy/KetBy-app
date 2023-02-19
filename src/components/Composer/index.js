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
  const {
    preview,
    files,
    file,
    setActiveFile,
    sidebarCollapsed,
    setSidebarCollapsed,
    project,
  } = props;

  const [circuit, setCircuit] = React.useState({
    meta: file.meta,
    instructions: file.content,
  });

  const [status, setStatus] = React.useState(
    preview ? "Log in to save" : "Loading..."
  );

  const [updateCount, setUpdateCount] = React.useState(0);

  React.useEffect(() => {
    if (preview) return;
    if (updateCount > 0) setStatus("Saving changes...");
    axios
      .put(`/project/${project.token}/${file.file_index}`, {
        meta: circuit.meta ? circuit.meta : [],
        content: circuit.instructions ? circuit.instructions : [],
        count: updateCount,
      })
      .then((res) => {
        setStatus(res.data.status);
        setUpdateCount(updateCount + 1);
      })
      .catch((res) => {
        console.log(res);
        if (res.response.data && res.response.data.status) {
          setStatus(res.response.data.status);
        } else {
          setStatus("Could not save changes");
        }
      });
  }, [circuit]);

  const [gatesDirectoryOpenMobile, setGatesDirectoryOpenMobile] =
    React.useState(false);

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
        <GatesDirectory
          circuit={circuit}
          setCircuit={setCircuit}
          openMobile={gatesDirectoryOpenMobile}
          setOpenMobile={setGatesDirectoryOpenMobile}
        />
      </Grid>
      <Grid item xs>
        <Canvas
          circuit={circuit}
          setCircuit={setCircuit}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          status={status}
          project={project}
          files={files}
          activeFile={file}
          setActiveFile={setActiveFile}
          setGatesDirectoryOpenMobile={setGatesDirectoryOpenMobile}
        />
      </Grid>
      <Grid item width="auto">
        <Sidebar
          collapsed={sidebarCollapsed}
          circuit={circuit}
          files={files}
          activeFile={file}
        />
      </Grid>
    </Grid>
  );
};

export default function Composer(props) {
  const { projectToken, fileIndex, preview } = props;

  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  // const [circuit, setCircuit] = React.useState(null);
  const [files, setFiles] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [project, setProject] = React.useState(null);
  const [activeFile, setActiveFile] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (preview === true) {
        setProject({
          id: 0,
          title: "Demo project",
          description: "This is just a demo quantum project",
          thumbnail_url: null,
          public: 1,
          forked_from: null,
          forks_count: 0,
          stars_count: 0,
          next_file_index: 2,
          token: "-",
        });
        setFiles({
          1: {
            id: 1,
            project_id: 0,
            file_index: 1,
            title: "New file",
            content: parseInstructionsString(
              "S[0]; H[1]; T+[2]; I[2]; CX[0,2]; X[1]; SX[2]; Tfl[1,0,3]; X[2]; I[0]; I[1]; I[1]; SWAP[1,3]; SX+[1]; X[0]; X[0]; S+[0]; RX[3]; H[0]; CX[2,0]"
            ),
            file_type_name: "qc",
            meta: {
              qubits: 5,
              bits: 0,
            },
          },
        });
        setActiveFile(1);
        setLoading(false);
      } else {
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
        }
      }
    }, 300);
  }, []);

  return (
    <Box
      sx={{
        userSelect: "none",
        bgcolor: "white",
      }}
    >
      <>
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
            preview={preview}
            project={project}
            files={files}
            file={files[activeFile]}
            setActiveFile={setActiveFile}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
      </>
    </Box>
  );
}
