import ActivationsTable from "../../components/ActivationsTable";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <ErrorBoundary>
        <ActivationsTable />
      </ErrorBoundary>
    </Container>
  );
};

export default Home;
