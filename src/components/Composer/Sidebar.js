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
} from "@mui/material";
import theme from "../../themes/default";
import { styled } from "@mui/material/styles";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    px: 1,
    minWidth: "auto",
  },
});

const CustomList = styled(List)({
  "& .MuiListItemButton-root": {
    padding: theme.spacing(0.5, 1),
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

const ProjectContent = (props) => {
  const { projectTab } = props;

  const Circuits = () => {
    return (
      <Box>
        <CustomList component="nav" aria-label="circuits">
          {[...Array(10)].map((_, index) => {
            return (
              <ListItemButton selected={index == 0} key={index}>
                <ListItemIcon>
                  <ArticleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">
                      My circuit #{index + 1}
                    </Typography>
                  }
                />
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

  return (
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
      <Box
        sx={{
          height: `calc((100vh - ${
            theme.constants.menuHeight
          }px - ${theme.spacing(6 * 2)} ) / 2)`,
        }}
      ></Box>
    </Box>
  );
};

export default Sidebar;
