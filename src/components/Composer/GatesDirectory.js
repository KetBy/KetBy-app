import * as React from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import theme from "../../themes/default";
import Gate from "./Gate";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
import ExpandOutlinedIcon from "@mui/icons-material/ExpandRounded";
import CompressOutlinedIcon from "@mui/icons-material/CompressRounded";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";

const gatesMap = getGatesMap();

const GatesDirectory = (props) => {
  const [display, setDisplay] = React.useState("default"); // default / compact / detailed
  const { circuit, setCircuit } = props;

  return (
    <Box
      sx={{
        width: `calc(2px + ${theme.spacing(display === "compact" ? 11 : 31)})`,
        borderRight: `1px solid ${theme.palette.grey[200]}`,
      }}
    >
      <Grid
        container
        sx={{
          px: 1,
          pr: 0.5,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          height: theme.spacing(6),
        }}
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            {display === "compact" ? "Gts." : "Gates"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
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
              <Grid item>
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
                <ExpandOutlinedIcon
                  sx={{
                    transform: "rotate(90deg)",
                  }}
                />
              </IconButton>
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
                    <Typography variant="subtitle2">{category.name}</Typography>
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
                    />
                  </Grid>
                );
              });
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default GatesDirectory;
