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
import { useAppContext } from "../../utils/context";

const Wrapper = (props) => {
  const {
    files,
    setActiveFile,
    activeFile,
    sidebarCollapsed,
    setSidebarCollapsed,
    project,
    setFiles,
  } = props;

  const file = files[activeFile];

  const [circuit, setCircuit] = React.useState({
    meta: file.meta,
    instructions: file.content,
  });

  const [status, setStatus] = React.useState("Loading...");

  const [updateCount, setUpdateCount] = React.useState(0);

  const [newFileDrawerOpen, setNewFileDrawerOpen] = React.useState(false);

  const toggleFileDrawer = (event) => {
    setNewFileDrawerOpen(!newFileDrawerOpen);
  };

  const [probabilities, setProbabilities] = React.useState(null);
  const [probabilitiesError, setProbabilitiesError] = React.useState(null);

  React.useEffect(() => {
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
        if (res.data.results.probabilities) {
          setProbabilities(res.data.results.probabilities);
          setProbabilitiesError(null);
        } else {
          setProbabilities(null);
          if (circuit.meta.qubits > 4) {
            setProbabilitiesError(
              "Probabilities are only computed for circuits with up to 4 qubits."
            );
          } else {
            setProbabilitiesError(
              "Probabilities could have not been computed."
            );
          }
        }
      })
      .catch((res) => {
        if (res.response.data && res.response.data.status) {
          setStatus(res.response.data.status);
        } else {
          setStatus("Could not save changes");
        }
      });
  }, [circuit]);

  const [gatesDirectoryOpenMobile, setGatesDirectoryOpenMobile] =
    React.useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = React.useState(false);

  return (
    <Grid
      container
      sx={{
        height: {
          xs: "-webkit-fill-available",
          md: `calc(100vh - ${theme.constants.menuHeight}px)`,
        },
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
          setSidebarOpenMobile={setSidebarOpenMobile}
          toggleFileDrawer={toggleFileDrawer}
          newFileDrawerOpen={newFileDrawerOpen}
          probabilities={probabilities}
          probabilitiesError={probabilitiesError}
        />
      </Grid>
      <Grid item width="auto">
        <Sidebar
          collapsed={sidebarCollapsed}
          circuit={circuit}
          files={files}
          setFiles={setFiles}
          activeFile={file}
          setActiveFile={setActiveFile}
          openMobile={sidebarOpenMobile}
          setOpenMobile={setSidebarOpenMobile}
          project={project}
          toggleFileDrawer={toggleFileDrawer}
          newFileDrawerOpen={newFileDrawerOpen}
        />
      </Grid>
    </Grid>
  );
};

export default function Composer(props) {
  const { projectToken, fileIndex } = props;

  const { projectMemo, setProjectMemo } = useAppContext();

  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [files, setFiles] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [project, setProject] = React.useState(null);
  const [activeFile, setActiveFile] = React.useState(null);
  const [uniqueKey, setUniqueKey] = React.useState(1);

  React.useEffect(() => {
    if (projectToken && fileIndex) {
      if (projectMemo && projectMemo.token == projectToken) {
        setProject(projectMemo);
        setFiles(projectMemo.files_obj);
        setActiveFile(fileIndex);
        setLoading(false);
        setUniqueKey(uniqueKey + 1);
        return;
      }
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
            setUniqueKey(uniqueKey + 1);
            setProjectMemo({ files_obj: newFiles, ...project });
          } else {
            throw new Exception("Something went wrong.");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [fileIndex]);

  return (
    <Box
      sx={{
        userSelect: "none",
        bgcolor: "white",
        maxHeight: {
          xs: "-webkit-fill-available",
          md: `calc(100vh - ${theme.constants.menuHeight}px)`,
        },
        overflowY: "auto",
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
            project={project}
            files={files}
            setFiles={setFiles}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            key={uniqueKey}
          />
        )}
      </>
    </Box>
  );
}
