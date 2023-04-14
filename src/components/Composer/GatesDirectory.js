import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import theme from "../../themes/default";
import Gate from "./Gate";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
import ExpandOutlinedIcon from "@mui/icons-material/ExpandRounded";
import CompressOutlinedIcon from "@mui/icons-material/CompressRounded";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const gatesMap = getGatesMap();

const GatesDirectory = (props) => {
  const [display, setDisplay] = React.useState("default"); // default / compact / detailed
  const { circuit, setCircuit, openMobile, setOpenMobile, project } = props;

  return (
    <>
      <Box
        sx={{
          width: {
            xs: "100%",
            md: `calc(2px + ${theme.spacing(display === "compact" ? 11 : 31)})`,
          },
          borderRight: {
            xs: "none",
            md: `1px solid ${theme.palette.grey[200]}`,
          },
          position: {
            xs: "fixed",
            md: "relative",
          },
          zIndex: 999,
          background: "white",
          display: {
            xs: openMobile ? "block" : "none",
            md: "block",
          },
        }}
      >
        <Grid
          container
          sx={{
            px: 1,
            pr: 1,
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            height: theme.spacing(6),
            background: theme.palette.primary[50],
          }}
          alignItems="center"
        >
          <Grid
            item
            xs={6}
            sx={{
              display: display == "compact" ? "none" : "flex",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid
                item
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
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
              <Grid item>
                <Typography
                  variant="subtitle1"
                  sx={{
                    ml: {
                      xs: 1,
                      md: 0,
                    },
                  }}
                >
                  {display === "compact" ? "" : "Gates"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={display == "compact" ? 12 : 6}
            sx={{
              textAlign: "right",
            }}
          >
            {display == "default" && (
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "right",
                }}
              >
                <Tooltip title="Show details">
                  <IconButton
                    onClick={() => {
                      setDisplay("detailed");
                    }}
                    size="small"
                    sx={{
                      borderRadius: 0,
                    }}
                    disableTouchRipple
                  >
                    <ViewListOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Grid
                  item
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <Tooltip title="Compress gates" placement="bottom-end">
                    <IconButton
                      onClick={() => {
                        setDisplay("compact");
                      }}
                      size="small"
                      sx={{
                        borderRadius: 0,
                      }}
                      disableTouchRipple
                    >
                      <CompressOutlinedIcon
                        sx={{
                          transform: "rotate(90deg)",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            )}
            {display == "detailed" && (
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "right",
                }}
              >
                <Tooltip title="Hide details">
                  <IconButton
                    onClick={() => {
                      setDisplay("default");
                    }}
                    size="small"
                    sx={{
                      borderRadius: 0,
                    }}
                    disableTouchRipple
                  >
                    <ViewModuleOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Grid
                  item
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <Tooltip title="Compress gates" placement="bottom-end">
                    <IconButton
                      onClick={() => {
                        setDisplay("compact");
                      }}
                      size="small"
                      sx={{
                        borderRadius: 0,
                      }}
                      disableTouchRipple
                    >
                      <CompressOutlinedIcon
                        sx={{
                          transform: "rotate(90deg)",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            )}
            {display == "compact" && (
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "right",
                }}
              >
                <Tooltip title="Expand gates">
                  <IconButton
                    onClick={() => {
                      setDisplay("default");
                    }}
                    size="small"
                    sx={{
                      borderRadius: 0,
                      width: "100%",
                    }}
                    disableTouchRipple
                  >
                    <ExpandOutlinedIcon
                      sx={{
                        transform: "rotate(90deg)",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            height: `calc(100vh - ${
              theme.constants.menuHeight
            }px - ${theme.spacing(6)})`,
            overflowY: "auto",
          }}
        >
          {display !== "compact" &&
            gates.map((category, categoryIndex) => {
              return (
                <Box
                  key={`gates-${category.name}`}
                  sx={{
                    p: 1,
                  }}
                >
                  <Grid container spacing={1} rowSpacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        {category.name}
                      </Typography>
                    </Grid>
                    {category.gates.map((gate, gateIndex) => {
                      return display === "default" ? (
                        <Grid
                          item
                          key={`gates-${category.name}-${gate.name}-wrapper`}
                        >
                          <Gate
                            gate={gatesMap[gate.name]}
                            key={`gates-${category.name}-${gate.name}`}
                            preview
                            circuit={circuit}
                            setCircuit={setCircuit}
                            setGatesDirectoryOpenMobile={setOpenMobile}
                            project={project}
                          />
                        </Grid>
                      ) : (
                        <Grid
                          item
                          key={`gates-${category.name}-${gate.name}-wrapper`}
                          xs={12}
                        >
                          <Grid container alignItems="center">
                            <Grid item width="auto">
                              <Gate
                                gate={gatesMap[gate.name]}
                                key={`gates-${category.name}-${gate.name}`}
                                preview
                                circuit={circuit}
                                setCircuit={setCircuit}
                                setGatesDirectoryOpenMobile={setOpenMobile}
                              />
                            </Grid>
                            <Grid
                              item
                              sx={{
                                pl: 1,
                              }}
                            >
                              <Typography variant="body2">
                                {gate.title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              );
            })}
          {display === "compact" && (
            <Grid container spacing={1} rowSpacing={1} p={1}>
              {gates.map((category, categoryIndex) => {
                return category.gates.map((gate, gateIndex) => {
                  return (
                    <Grid
                      item
                      key={`gates-${category.name}-${gate.name}-wrapper`}
                    >
                      <Gate
                        gate={gatesMap[gate.name]}
                        key={`gates-${category.name}-${gate.name}`}
                        preview
                        circuit={circuit}
                        setCircuit={setCircuit}
                        setGatesDirectoryOpenMobile={setOpenMobile}
                      />
                    </Grid>
                  );
                });
              })}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default GatesDirectory;
