import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import theme from "../themes/default";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";

const Footer = (props) => {
  return (
    <Box sx={{ boxShadow: theme.shadowsCustom[1] }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 2 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()}{" "}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary[600],
                fontWeight: 500,
              }}
              component={Link}
              href="/"
            >
              KetBy.com
            </Typography>{" "}
            | All right reserved.
            <Box
              component="br"
              sx={{ display: { xs: "block", md: "none" } }}
            />{" "}
            Contact us at{" "}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary[600],
                textDecoration: "none",
              }}
              component={Link}
              href="mailto:ketby.com@gmail.com"
              target="_blank"
            >
              ketby.com@gmail.com{" "}
              <ForwardToInboxRoundedIcon sx={{ fontSize: "14px", mb: -0.25 }} />
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
