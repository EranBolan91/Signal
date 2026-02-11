import { MonitorHeartOutlined } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SMS Monitor
          </Typography>
          <MonitorHeartOutlined sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
