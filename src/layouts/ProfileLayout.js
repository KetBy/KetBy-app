import * as React from "react";
import {
  Box,
  Grid,
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useAppContext } from "../../src/utils/context";

const ProfileCard = (props) => {
  const { appState } = useAppContext();

  const { userId } = props;
  let user = null;
  if (appState.isLoggedIn) {
    user = appState.user;
  }

  return (
    <Card sx={{ boxShadow: (theme) => theme.shadowsCustom[2] }}>
      <CardMedia
        sx={{ height: 120 }}
        image={user.cover_url}
        title="green iguana"
      />
      <CardContent
        sx={{
          textAlign: "center",
          position: "relative",
          pt: (theme) => theme.spacing(6),
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: (theme) => theme.spacing(10),
            height: (theme) => theme.spacing(10),
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            borderRadius: "50%",
            boxShadow: (theme) => theme.shadowsCustom[1],
            border: "2px solid white",
          }}
          component="img"
          src={user.avatar_url}
        />
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontSize: "1rem",
            mb: 0,
          }}
        >
          @{user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${user.first_name} ${user.last_name}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 0, display: "block" }}>
        <List compact>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Overview" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding selected>
            <ListItemButton>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </CardActions>
    </Card>
  );
};
export default function ProfileLayout({ children, ...props }) {
  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} rowSpacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <ProfileCard userId={props.userId} />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
