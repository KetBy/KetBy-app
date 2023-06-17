import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
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
import ErrorPage from "../ErrorPage";
import { useRouter } from "next/router";

const Wrapper = (props) => {
  const {
    files,
    setActiveFile,
    activeFile,
    sidebarCollapsed,
    setSidebarCollapsed,
    project,
    setProject,
    setFiles,
  } = props;

  const file = files[activeFile];

  const [circuit, setCircuit] = React.useState({
    meta: file.meta,
    instructions: file.content,
  });

  const [previousCircuit, setPreviousCircuit] = React.useState({
    meta: file.meta,
    instructions: file.content,
  });

  const [status, setStatus] = React.useState("Loading...");

  const [updateCount, setUpdateCount] = React.useState(0);

  const [newFileDrawerOpen, setNewFileDrawerOpen] = React.useState(false);

  const toggleFileDrawer = (event) => {
    setNewFileDrawerOpen(!newFileDrawerOpen);
  };

  const [undoList, setUndoList] = React.useState([]);
  const [redoList, setRedoList] = React.useState([]);

  const handleUndo = () => {
    const lastCircuit = undoList[undoList.length - 1];
    // setRedoList([...redoList, circuit]);
    setUndoList(undoList.slice(0, -1));
    setCircuit({ ...lastCircuit, _undone: true });
  };

  React.useEffect(() => {
    if (!project) return;

    if (updateCount == 0) {
      // It is no longer necessary to call it when a file is opened because all the data is already in the project object
      setUpdateCount(updateCount + 1);
      setStatus(
        project.permissions == 2 ? (
          "All changes saved"
        ) : (
          <>
            <Typography
              variant="link"
              target="_blank"
              component="a"
              href={`/u/${project.author.username}`}
              sx={{
                color: (theme) => theme.palette.primary.main,
                textDecoration: "none",
                fontStyle: "normal",
              }}
            >
              @{project.author.username}
            </Typography>
          </>
        )
      );
      return;
    }
    setStatus("Saving changes...");

    if (!circuit._undone) {
      // TODO
      /*
      setUndoList((prevUndoList) => [
        ...prevUndoList,
        { ...previousCircuit, _undone: false },
      ]);
      setPreviousCircuit({ ...circuit });
      */
    } else {
      /*
      delete circuit._undone;
      */
    }

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
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.status) {
          setStatus(err.response.data.status);
        } else {
          setStatus("Could not save changes");
        }
      });
  }, [circuit, project]);

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
      {project.permissions == 2 && (
        <Grid item width="auto">
          <GatesDirectory
            circuit={circuit}
            setCircuit={setCircuit}
            openMobile={gatesDirectoryOpenMobile}
            setOpenMobile={setGatesDirectoryOpenMobile}
            project={project}
          />
        </Grid>
      )}
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
          updateCount={updateCount}
          undoList={undoList}
          setUndoList={setUndoList}
          redoList={redoList}
          setRedoList={setRedoList}
          handleUndo={handleUndo}
        />
      </Grid>
      <Grid item width="auto">
        <Sidebar
          project={project}
          setProject={setProject}
          collapsed={sidebarCollapsed}
          circuit={circuit}
          files={files}
          setFiles={setFiles}
          activeFile={file}
          setActiveFile={setActiveFile}
          openMobile={sidebarOpenMobile}
          setOpenMobile={setSidebarOpenMobile}
          toggleFileDrawer={toggleFileDrawer}
          newFileDrawerOpen={newFileDrawerOpen}
        />
      </Grid>
    </Grid>
  );
};

export default function Composer(props) {
  const { isReady } = useRouter();
  const { projectToken, fileIndex } = props;

  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [files, setFiles] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [project, setProject] = React.useState(null);
  const [activeFile, setActiveFile] = React.useState(null);
  const [uniqueKey, setUniqueKey] = React.useState(1);

  const { appState, shouldUpdateProject } = useAppContext();

  React.useEffect(() => {
    if (projectToken && fileIndex) {
      axios
        .get(`/project/${projectToken}`, {
          fileIndex: parseInt(fileIndex),
        })
        .then((res) => {
          let data = res.data;
          if (data.success) {
            setTimeout(() => {
              setProject({
                ...data.project,
                permissions: data.permissions ?? 0, // 0 - restricted access, 1 - readonly, 2 - editable
                author: data.author ?? null,
              });
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
            }, 150);
          } else {
            throw new Exception("Something went wrong.");
          }
        })
        .catch((err) => {
          if (err.response) {
            setError({
              code: err.response.status, // 404 - not found, 403 - unauthorized
            });
          } else {
            setError({
              code: 500, // server error
            });
          }
        });
    }
  }, [fileIndex, appState.user, shouldUpdateProject]);

  return (
    <>
      {error ? (
        <ErrorPage code={error.code} />
      ) : (
        <Box
          sx={{
            bgcolor: "white",
          }}
        >
          <>
            {loading || !appState.statusChecked || !isReady ? (
              <Box
                sx={{
                  minHeight: {
                    xs: "-webkit-fill-available",
                    md: `calc(100vh - ${theme.constants.menuHeight}px)`,
                  },
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
                setProject={setProject}
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
      )}
    </>
  );
}
