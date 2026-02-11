import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Select,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import { useActivation } from "../hooks/useActivation";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import { formatDate } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const ActivationsTable = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { useGetActivationsDetails } = useActivation();
  const { data: activations, isLoading } = useGetActivationsDetails();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activations;
    return activations?.filter((row) => [row.environment, row.activationId.toString()].some((cell) => cell.toLowerCase().includes(q)));
  }, [query, isLoading]);

  return (
    <Box sx={{ p: 3, bgcolor: "background.default", flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box mb={2} display="flex" flexDirection={"column"} alignItems={"end"} gap={2}>
        <Typography variant="h5">אירועים</Typography>
        <Box sx={{ display: "flex", width: "100%", gap: 1, justifyContent: "flex-end" }}>
          <Select size="small" defaultValue={1}>
            <MenuItem value={1}>הכל</MenuItem>
            <MenuItem value={2}>תקין</MenuItem>
            <MenuItem value={3}>ממתין</MenuItem>
            <MenuItem value={4}>שגיאה</MenuItem>
          </Select>
          <TextField
            dir="rtl"
            sx={{ width: "30%" }}
            size="small"
            placeholder="חיפוש אירוע ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      {isLoading === true ? (
        <LinearProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="events table">
            <TableHead>
              <TableRow>
                <TableCell>תאריך</TableCell>
                <TableCell>סביבה</TableCell>
                <TableCell>לא התקבלו</TableCell>
                <TableCell>נשלחו</TableCell>
                <TableCell>סה"כ טלפונים</TableCell>
                <TableCell>סטטוס</TableCell>
                <TableCell>מזהה הפעלה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered?.map((row) => (
                <TableRow key={row.id} sx={{ cursor: "pointer" }} onClick={() => navigate(`/activation/${row.activationId}`)}>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell>{row.environment}</TableCell>
                  <TableCell>{row.totalPhones - row.success}</TableCell>
                  <TableCell>{row.success}</TableCell>
                  <TableCell>{row.totalPhones}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.activationId}</TableCell>
                </TableRow>
              ))}
              {filtered?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    אין תוצאות
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ActivationsTable;
