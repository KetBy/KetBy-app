import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Tab,
  Tabs,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  Menu,
  MenuItem,
  Drawer,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import theme from "../../themes/default";
import { styled } from "@mui/material/styles";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "../../utils/axios";

import { gatesMap as getGatesMap } from "../../utils/gates";

const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    px: 1,
    minWidth: "auto",
  },
});

const CustomList = styled(List)({
  "& .MuiListItemButton-root": {
    padding: theme.spacing(0.25, 0.25, 0.25, 1),
    position: "relative",
    "&:after": {
      position: "absolute",
      content: "''",
      left: 0,
      top: "50%",
      width: "2px",
      height: 0,
      background: theme.palette.darkGrey.main,
    },
    "&.Mui-selected": {
      background: theme.palette.primary[50],
      "&:after": {
        top: 0,
        height: "100%",
      },
    },
    "&.Mui-focusVisible": {
      background: "transparent",
    },
    "& .MuiTypography-root": {
      lineHeight: 1.1,
      "&.meta": {
        "& .user, & .time": {
          fontSize: theme.spacing(1.5),
          fontWeight: 400,
          display: "inline-block",
        },
        "& .user": {
          marginRight: theme.spacing(0.5),
        },
        "& .time": {
          fontStyle: "italic",
        },
      },
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const ProjectHeader = (props) => {
  const {
    projectTab,
    setProjectTab,
    setOpenMobile,
    project,
    setFiles,
    setActiveFile,
  } = props;

  const handleChange = (event, newValue) => {
    setProjectTab(newValue);
  };

  const [newFileDrawerOpen, setNewFileDrawerOpen] = React.useState(false);

  const toggleFileDrawer = (event) => {
    setNewFileDrawerOpen(!newFileDrawerOpen);
  };

  return (
    <>
      <NewFileDrawer
        {...{
          toggleDrawer: toggleFileDrawer,
          open: newFileDrawerOpen,
          project,
          setFiles,
          setActiveFile,
        }}
      />
      <Grid
        container
        sx={{
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          height: theme.spacing(6),
          pr: 1,
          background: theme.palette.primary[50],
        }}
        alignItems="center"
      >
        <Grid item xs={8}>
          <CustomTabs value={projectTab} onChange={handleChange} sx={{ m: 0 }}>
            <Tab
              label={<Typography variant="subtitle1">Circuits</Typography>}
              value="circuits"
              sx={{
                px: 1,
              }}
            />
            <Tab
              label={<Typography variant="subtitle1">Settings</Typography>}
              value="settings"
              sx={{
                px: 1,
              }}
            />
            <Tab
              label={<Typography variant="subtitle1">Export</Typography>}
              value="export"
              sx={{
                px: 1,
                display: {
                  md: "none",
                },
              }}
            />
          </CustomTabs>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            sx={{
              dispaly: "flex",
              justifyContent: "right",
            }}
          >
            {projectTab === "circuits" && (
              <Grid item>
                <Grid
                  container
                  sx={{
                    justifyContent: "right",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      toggleFileDrawer();
                    }}
                    size="small"
                    sx={{
                      borderRadius: 0,
                    }}
                    disableTouchRipple
                  >
                    <PostAddOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )}
            <Grid
              item
              sx={{
                display: {
                  md: "none",
                },
              }}
            >
              <Grid
                container
                sx={{
                  justifyContent: "right",
                }}
              >
                <IconButton
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                  size="small"
                  sx={{
                    borderRadius: 0,
                  }}
                  disableTouchRipple
                >
                  <ClearRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const FileOptionsMenu = (props) => {
  const { file } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItemIcon onClick={(e) => e.stopPropagation()}>
      <IconButton aria-label="more" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`file-options--${file.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteOutlineRoundedIcon
              sx={{
                fontSize: "1.25rem",
                color: theme.palette.error.main,
              }}
            />
          </ListItemIcon>
          <Typography variant="body2" color="error">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </ListItemIcon>
  );
};

const ExportContent = (props) => {
  const { circuit } = props;
  let gatesMap = getGatesMap();

  return (
    <Box
      sx={{
        height: {
          xs: `calc((100vh - ${theme.constants.menuHeight}px - ${theme.spacing(
            6
          )} ))`,
          md: `calc((100vh - ${theme.constants.menuHeight}px - ${theme.spacing(
            6 * 2
          )} ) / 2)`,
        },
        overflowY: "auto",
      }}
      p={1}
    >
      <Typography variant="body2" mb={1}>
        Internal representation
      </Typography>
      <Box
        sx={{
          background: theme.palette.grey[50],
          color: theme.palette.grey[700],
          p: 1,
        }}
      >
        {circuit.instructions.map((ins, index) => {
          return (
            <Typography
              key={index}
              variant="body2"
              sx={{ fontFamily: "monospace" }}
            >
              <Box
                component="span"
                sx={{
                  color: gatesMap[ins.gate].color.main,
                  fontWeight: 600,
                }}
              >
                {ins.gate}
              </Box>
              [{ins.qubits.join(",")}]
              {ins.params.length > 0 && `[${ins.params.join(",")}]`}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

const NewFileDrawer = ({
  open,
  toggleDrawer,
  project,
  setFiles,
  setActiveFile,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const router = useRouter();

  const defaultInput = {
    title: "",
  };

  const defaultError = {
    title: null,
  };

  const [input, setInput] = React.useState(defaultInput);
  const [error, setError] = React.useState(defaultError);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: null });
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setSuccess(null);
    axios
      .post(`/project/${project.token}`, input)
      .then((res) => {
        //setMessage(res.data.message);
        //setSuccess(true);
        let newFiles = {};
        res.data.files.map((file, index) => {
          newFiles[file.file_index] = file;
        });
        setFiles(newFiles);
        // setActiveFile(res.data.file.file_index);
        router.push(`/composer/${project.token}/${res.data.file.file_index}`);
        toggleDrawer();
        setLoading(false);
        setInput(defaultInput);
      })
      .catch((err) => {
        setSuccess(false);
        let res = err.response;
        try {
          if (res.data.message) {
            setMessage(res.data.message);
          }
          if (res.data.field_errors) {
            setError(res.data.field_errors);
          }
        } catch (err) {
          setMessage(`Something went wrong. Please try again later.`);
        }
        setLoading(false);
      });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          width: "300px !important",
          maxWidth: (theme) => `calc(100vw - ${theme.spacing(8)})`,
        },
      }}
    >
      <Grid
        container
        sx={{ p: 2 }}
        rowSpacing={2}
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <Typography variant="h6">Create a new circuit</Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
            Create a new circuit for the current project.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="new-project-title"
            name="title"
            label="Title"
            variant="outlined"
            size="small"
            type="text"
            placeholder="New circuit's title"
            fullWidth
            required
            value={input.title}
            onChange={handleInput}
            error={Boolean(error.title)}
            helperText={error.title}
          />
        </Grid>
        {Boolean(message) && (
          <Grid item xs={12}>
            <Alert
              severity={success ? "success" : "error"}
              sx={{
                border: (theme) => `1px solid ${theme.palette.grey.main}`,
              }}
            >
              {message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth onClick={toggleDrawer}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <LoadingButton
            variant="contained"
            type="submit"
            fullWidth
            loading={loading}
          >
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </Drawer>
  );
};

const ProjectContent = (props) => {
  const { projectTab, files, activeFile, setActiveFile, circuit, project } =
    props;

  const [active, setActive] = React.useState(0);

  const router = useRouter();

  const Circuits = () => {
    return (
      <Box>
        <CustomList component="nav" aria-label="circuits">
          {Object.entries(files).map(([index, file]) => {
            return (
              <ListItemButton
                selected={activeFile.file_index == index}
                key={index}
                disableRipple
                sx={{
                  "&:hover": {
                    background: "white",
                  },
                }}
                component={Link}
                href={`/composer/${project.token}/${index}`}
                scroll={false}
              >
                <ListItemIcon>
                  <ArticleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">{file.title}</Typography>
                  }
                  secondary={
                    <Typography variant="body2" className="meta">
                      <Typography
                        variant="body2"
                        component="span"
                        className="time"
                      >
                        edited 2h ago
                      </Typography>
                    </Typography>
                  }
                />
                <FileOptionsMenu file={{ id: index }} />
              </ListItemButton>
            );
          })}
        </CustomList>
      </Box>
    );
  };

  const Settings = () => {
    return <Box sx={{ p: 1 }}>Settings coming soon...</Box>;
  };

  const Export = (props) => {
    const { circuit } = props;

    return !circuit ? null : <ExportContent circuit={circuit} />;
  };

  return (
    <Box
      sx={{
        height: {
          xs: `calc((100vh - ${theme.constants.menuHeight}px - ${theme.spacing(
            6
          )} ))`,
          md: `calc((100vh - ${theme.constants.menuHeight}px - ${theme.spacing(
            6 * 2
          )} ) / 2)`,
        },
        overflow: "auto",
      }}
    >
      {projectTab === "circuits" && <Circuits />}
      {projectTab === "settings" && <Settings />}
      {projectTab === "export" && <Export circuit={circuit} />}
    </Box>
  );
};

const ExportHeader = (props) => {
  return (
    <Grid
      container
      sx={{
        px: 1,
        pr: 0.5,
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        height: theme.spacing(6),
        background: theme.palette.primary[50],
      }}
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="subtitle1">Export</Typography>
      </Grid>
    </Grid>
  );
};

const Sidebar = (props) => {
  const [projectTab, setProjectTab] = React.useState("circuits");
  const {
    collapsed,
    circuit,
    files,
    setFiles,
    activeFile,
    setActiveFile,
    openMobile,
    setOpenMobile,
    project,
  } = props;

  return (
    <>
      {/* Desktop sidebar */}
      {collapsed ? null : (
        <Box
          sx={{
            width: `calc(2px + ${theme.spacing(31)})`,
            borderLeft: `1px solid ${theme.palette.grey[200]}`,
            height: `calc(100vh - ${theme.constants.menuHeight}px)`,
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <ProjectHeader
            projectTab={projectTab}
            setProjectTab={setProjectTab}
            setOpenMobile={setOpenMobile}
            project={project}
            setFiles={setFiles}
            setActiveFile={setActiveFile}
          />
          <ProjectContent
            projectTab={projectTab}
            files={files}
            activeFile={activeFile}
            setActiveFile={setActiveFile}
            project={project}
          />

          <ExportHeader />
          <ExportContent circuit={circuit} />
        </Box>
      )}
      {/* Mobile sidebar */}
      {openMobile && (
        <>
          <style>{"html,body{overflow-y:hidden !important;}"}</style>
          <Box
            sx={{
              width: "100%",
              height: `calc(100vh - ${theme.constants.menuHeight}px)`,
              position: "fixed",
              zIndex: 999,
              display: {
                md: "none",
              },
              top: `${theme.constants.menuHeight}px`,
              right: 0,
              background: "white",
            }}
            className="mobile-sidebar"
          >
            <ProjectHeader
              projectTab={projectTab}
              setProjectTab={setProjectTab}
              setOpenMobile={setOpenMobile}
              project={project}
              setFiles={setFiles}
              setActiveFile={setActiveFile}
            />
            <ProjectContent
              projectTab={projectTab}
              files={files}
              activeFile={activeFile}
              circuit={circuit}
              setActiveFile={setActive}
              project={project}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Sidebar;
