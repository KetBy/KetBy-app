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
import { css, keyframes } from "@emotion/react";
import theme from "../../themes/default";
import { styled } from "@mui/material/styles";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { gatesMap as getGatesMap } from "../../utils/gates";

const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    px: 1,
    minWidth: "auto",
  },
});

const activeFileTabEffect = keyframes`
  0% {
    height: 0;
    top: 50%;
  }
  100% {
    height: 100%;
    top: 0;
  }
`;

const CustomList = styled(List)({
  "& .MuiListItemButton-root": {
    padding: theme.spacing(0.25, 0.25, 0.25, 1),
    position: "relative",
    transitionDuration: "0.2s",
    "&:after": {
      position: "absolute",
      content: "''",
      left: 0,
      top: "50%",
      width: "2px",
      height: 0,
      background: theme.palette.darkGrey.main,
      transitionDuration: "0.2s",
    },
    "&.Mui-selected": {
      background: "transparent",
      "&:after": {
        animation: `${activeFileTabEffect} 0.2s normal forwards ease-in`,
      },
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
  const { projectTab, setProjectTab } = props;

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
        </CustomTabs>
      </Grid>
      {projectTab === "circuits" && (
        <Grid item xs={4}>
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
    <ListItemIcon>
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

const ProjectContent = (props) => {
  const { projectTab } = props;

  const [active, setActive] = React.useState(0);

  const Circuits = () => {
    return (
      <Box>
        <CustomList component="nav" aria-label="circuits">
          {[...Array(10)].map((_, index) => {
            return (
              <ListItemButton
                selected={index == active}
                key={index}
                disableRipple
              >
                <ListItemIcon onClick={() => setActive(index)}>
                  <ArticleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  onClick={() => setActive(index)}
                  primary={
                    <Typography variant="subtitle2">
                      My circuit #{index + 1}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" className="meta">
                      <Typography
                        variant="body2"
                        component="span"
                        className="user"
                      >
                        <MuiLink href="#!">alexhodo</MuiLink>
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        className="time"
                      >
                        – 2h ago
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

  return (
    <Box
      sx={{
        height: `calc((100vh - ${
          theme.constants.menuHeight
        }px - ${theme.spacing(6 * 2)} ) / 2)`,
        overflow: "auto",
      }}
    >
      {projectTab === "circuits" && <Circuits />}
      {projectTab === "settings" && <Settings />}
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

const ExportContent = (props) => {
  const { circuit } = props;
  let gatesMap = getGatesMap();

  return (
    <Box
      sx={{
        height: `calc((100vh - ${
          theme.constants.menuHeight
        }px - ${theme.spacing(6 * 2)} ) / 2)`,
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

const Sidebar = (props) => {
  const [projectTab, setProjectTab] = React.useState("circuits");
  const { collapsed, circuit } = props;

  return collapsed ? null : (
    <Box
      sx={{
        width: `calc(2px + ${theme.spacing(31)})`,
        borderLeft: `1px solid ${theme.palette.grey[200]}`,
        height: `calc(100vh - ${theme.constants.menuHeight})`,
      }}
    >
      <ProjectHeader projectTab={projectTab} setProjectTab={setProjectTab} />
      <ProjectContent projectTab={projectTab} />
      <ExportHeader />
      <ExportContent circuit={circuit} />
    </Box>
  );
};

export default Sidebar;
