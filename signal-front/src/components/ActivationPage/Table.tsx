import { Box, Table, TableHead, TableRow, TableCell, TableBody, TextField, Chip, CircularProgress } from "@mui/material";
import { useActivation } from "../../hooks/useActivation";
import { formatDate } from "../../utils/utils";
import { useParams } from "react-router-dom";

const SmsLogsTable = () => {
  const { id } = useParams();

  const { useGetActivationSmsLogs } = useActivation();

  const { data, isLoading } = useGetActivationSmsLogs({ getActivationSmsLogArgs: id ? [id] : [""], useQueryOptions: { enabled: Boolean(id) } });

  return (
    <Box p={2}>
      <TextField fullWidth placeholder="חיפוש לפי מספר טלפון..." size="small" sx={{ mb: 2 }} />
      {isLoading === true ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>זמן שליחת ההודעה</TableCell>
              <TableCell>messageIdInt</TableCell>
              <TableCell>messageId</TableCell>
              <TableCell>?נשלח בהצלחה</TableCell>
              <TableCell>מספר טלפון</TableCell>
              <TableCell>מזהה פריט</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.data.map((row) => (
                <TableRow key={row.phone}>
                  <TableCell color="primary.main">{formatDate(row.createdAt)}</TableCell>
                  <TableCell color="primary.main">{row.messageIdInt}</TableCell>
                  <TableCell color="primary.main">{row.messageId}</TableCell>
                  <TableCell>
                    <Chip label={row.success ? "כן" : "לא"} color={row.success ? "success" : "error"} size="small" />
                  </TableCell>
                  <TableCell color="primary.main">{row.phone}</TableCell>
                  <TableCell color="primary.main">{row.id}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default SmsLogsTable;
