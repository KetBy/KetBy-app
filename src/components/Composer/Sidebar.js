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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import theme from "../../themes/default";
import { styled } from "@mui/material/styles";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
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
  const { projectTab, setProjectTab, setOpenMobile } = props;

  const handleChange = (event, newValue) => {
    setProjectTab(newValue);
  };

  return (
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
                  onClick={() => {}}
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

const ProjectContent = (props) => {
  const { projectTab, files, activeFile, circuit } = props;

  const [active, setActive] = React.useState(0);

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
                onClick={() => setActive(index)}
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
  const { collapsed, circuit, files, activeFile, openMobile, setOpenMobile } =
    props;

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
          />
          <ProjectContent
            projectTab={projectTab}
            files={files}
            activeFile={activeFile}
          />

          <ExportHeader />
          <ExportContent circuit={circuit} />
        </Box>
      )}
      {/* Mobile sidebar */}
      {openMobile && (
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
          />
          <ProjectContent
            projectTab={projectTab}
            files={files}
            activeFile={activeFile}
            circuit={circuit}
          />
        </Box>
      )}
    </>
  );
};

export default Sidebar;
