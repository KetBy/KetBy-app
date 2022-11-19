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
  const [display, setDisplay] = React.useState("default");

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
          <Typography variant="subtitle1">Gates</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textAlign: "right",
          }}
        >
          {display == "default" && (
            <>
              <IconButton
                onClick={() => {
                  setDisplay("detailed");
                }}
                size="small"
              >
                <ViewListOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setDisplay("compact");
                }}
                size="small"
              >
                <CompressOutlinedIcon
                  sx={{
                    transform: "rotate(90deg)",
                  }}
                />
              </IconButton>
            </>
          )}
          {display == "detailed" && (
            <>
              <IconButton
                onClick={() => {
                  setDisplay("default");
                }}
                size="small"
              >
                <ViewModuleOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setDisplay("compact");
                }}
                size="small"
              >
                <CompressOutlinedIcon
                  sx={{
                    transform: "rotate(90deg)",
                  }}
                />
              </IconButton>
            </>
          )}
          {display == "compact" && (
            <>
              <IconButton
                onClick={() => {
                  setDisplay("default");
                }}
                size="small"
              >
                <ExpandOutlinedIcon
                  sx={{
                    transform: "rotate(90deg)",
                  }}
                />
              </IconButton>
            </>
          )}
        </Grid>
      </Grid>
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
                          />
                        </Grid>
                        <Grid
                          item
                          sx={{
                            pl: 1,
                          }}
                        >
                          <Typography variant="body2">{gate.title}</Typography>
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
                <Grid item key={`gates-${category.name}-${gate.name}-wrapper`}>
                  <Gate
                    gate={gatesMap[gate.name]}
                    key={`gates-${category.name}-${gate.name}`}
                    preview
                  />
                </Grid>
              );
            });
          })}
        </Grid>
      )}
    </Box>
  );
};

export default GatesDirectory;
