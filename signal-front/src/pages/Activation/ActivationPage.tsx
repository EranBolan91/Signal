import { Box, Button, Card, Stack, Typography, MenuItem, Select, CircularProgress, type SelectChangeEvent } from "@mui/material";
import SmsLogsTable from "../../components/ActivationPage/SmsLogsTable";
import StatsBar from "../../components/ActivationPage/StateBar";
import { useNavigate, useParams } from "react-router-dom";
import { useActivation } from "../../hooks/useActivation";
import DownloadIcon from "@mui/icons-material/Download";
import { formatDate } from "../../utils/utils";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const ActivationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useGetActivation } = useActivation();
  const { data: activations, isLoading } = useGetActivation();

  const [activationIdSelect, setActivationIdSelect] = useState<string | undefined>(id);

  const handleActivationChange = (event: SelectChangeEvent) => {
    setActivationIdSelect(event.target.value as string);
    navigate(`/activation/${event.target.value}`);
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<AddIcon />}>
            הוספת אירוע ידני
          </Button>

          <Button variant="outlined" startIcon={<DownloadIcon />}>
            ייצוא לאקסל
          </Button>
          <Select size="small" value={activationIdSelect} onChange={handleActivationChange}>
            {isLoading === true ? (
              <CircularProgress />
            ) : (
              activations && activations.map((activation) => <MenuItem value={activation.activationId}>{`${activation.activationId} - ${formatDate(activation.date)}`}</MenuItem>)
            )}
          </Select>
        </Stack>

        <Typography variant="h5">פרטי אירוע</Typography>
      </Stack>

      <StatsBar />

      <Card sx={{ mt: 3 }}>
        <SmsLogsTable />
      </Card>
    </Box>
  );
};

export default ActivationPage;
