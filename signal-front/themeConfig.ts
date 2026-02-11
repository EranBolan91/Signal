import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",

    background: {
      default: "#0B1623",
      paper: "#111F33",
    },

    primary: {
      main: "#1EA7E1",
      light: "#4FC3F7",
      dark: "#0B7FB3",
    },

    secondary: {
      main: "#00C2B8",
    },

    success: {
      main: "#22C55E",
    },

    error: {
      main: "#EF4444",
    },

    warning: {
      main: "#F59E0B",
    },

    text: {
      primary: "#E5EDF5",
      secondary: "#9FB3C8",
      disabled: "#6B7280",
    },

    divider: "#1F3A5A",
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    body1: { fontSize: 14 },
    body2: { fontSize: 13 },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#111F33",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#111F33",
          border: "1px solid #1F3A5A",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#162A45",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #1F3A5A",
        },
        head: {
          color: "#9FB3C8",
          fontWeight: 600,
        },
      },
    },
  },
});
