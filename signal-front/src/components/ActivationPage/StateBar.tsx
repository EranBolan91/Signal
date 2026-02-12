import { Card, LinearProgress, Stack, Typography } from "@mui/material";
import { useActivation } from "../../hooks/useActivation";
import { useParams } from "react-router-dom";

const StatsBar = () => {
  const { id } = useParams();

  const { useGetActivationsDetails } = useActivation();
  const { data, isLoading } = useGetActivationsDetails({ getActivationsArgs: [{ activationId: id }], useQueryOptions: { enabled: Boolean(id) } });

  return (
    <Card sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
      {isLoading === true ? (
        <LinearProgress />
      ) : (
        <>
          {data && (
            <Stack direction="row" spacing={2} width={"22%"} justifyContent={"space-between"}>
              <Typography color="text.secondary">
                טלפונים: <strong>{data[0].totalPhones}</strong> ☎️
              </Typography>
              <Typography color="text.secondary">
                נשלחו: <strong>{data[0].success}</strong> 📤
              </Typography>
              <Typography color="text.secondary">
                שגיאות: <strong>{data[0].phonesResponses}</strong> ✅
              </Typography>
            </Stack>
          )}
        </>
      )}
    </Card>
  );
};

export default StatsBar;
