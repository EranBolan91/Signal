import { Box, Table, TableHead, TableRow, TableCell, TableBody, TextField, Chip, CircularProgress } from "@mui/material";
import { useActivation } from "../../hooks/useActivation";
import type { SmsLog } from "../../types/smsLog";
import { formatDate } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SmsLogsTable = () => {
  const { id } = useParams();
  const [searchField, setSearchField] = useState<string>("");
  const { useGetActivationSmsLogs } = useActivation();

  const { data, isLoading } = useGetActivationSmsLogs({
    getActivationSmsLogArgs: id ? [id] : [""],
    useQueryOptions: {
      enabled: Boolean(id),
    },
  });

  // useEffect(() => {
  //   if (data !== undefined) {
  //     const filteredSmsLogs = data.data.filter((smsLog) => smsLog.phone.includes(searchField));
  //     setSmsLogs(filteredSmsLogs);
  //   }
  // }, [searchField]);

  const filteredSmsLogs = data?.data?.filter((smsLog) => smsLog.phone.includes(searchField));

  return (
    <Box p={2}>
      <TextField fullWidth dir="rtl" onChange={(e) => setSearchField(e.target.value)} placeholder="חיפוש לפי מספר טלפון..." size="small" sx={{ mb: 2 }} />
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
            {filteredSmsLogs &&
              filteredSmsLogs?.map((row) => (
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
