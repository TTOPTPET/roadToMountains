import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onClick={() => navigate("/tours/all")}>
        Начать пользоваться
      </Button>
    </Box>
  );
}

export default StartPage;
