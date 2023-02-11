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
    instructions: parseInstructionsString(file.content),
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
  const [circuit, setCircuit] = React.useState(null);
  const [files, setFiles] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [project, setProject] = React.useState(null);
  const [activeFile, setActiveFile] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (preview === true) {
        setProject({
          id: 1,
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
            project_id: 1,
            file_index: 1,
            title: "New file",
            content:
              "S[0]; H[1]; T+[2]; I[2]; CX[0,2]; X[1]; SX[2]; Tfl[1,0,3]; X[2]; I[0]; I[1]; I[1]; SWAP[1,3]; SX+[1]; X[0]; X[0]; S+[0]; RX[3]; H[0]; CX[2,0]",
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
