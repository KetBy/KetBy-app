import { Box, Grid, Typography, Divider } from "@mui/material";
import theme from "../../themes/default";
import Gate from "./Gate";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";

const gatesMap = getGatesMap();

const GatesDirectory = (props) => {
  return (
    <Box
      sx={{
        width: `calc(2px + ${theme.spacing(31)})`,
        borderRight: `1px solid ${theme.palette.grey[200]}`,
      }}
    >
      <Box
        sx={{
          p: 1,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Typography variant="subtitle1">Gates</Typography>
      </Box>
      {gates.map((category, categoryIndex) => {
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
                return (
                  <Grid
                    item
                    key={`gates-${category.name}-${gate.name}-wrapper`}
                  >
                    <Gate
                      gate={gatesMap[gate.name]}
                      key={`gates-${category.name}-${gate.name}`}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};

export default GatesDirectory;
