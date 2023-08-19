import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { darkTurquoiseColor } from "../../../config/MUI/color/color";

import { AccauntTransactions } from "../../../models/paymentSettingsModels/IPaymentSettings";
import RecentOperationItem from "./RecentOperationItem/RecentOperationItem";

type RecentOperationsProps = {
  accauntTransactions: AccauntTransactions[];
};

export default function RecentOperations({
  accauntTransactions,
}: RecentOperationsProps) {
  const elements =
    accauntTransactions &&
    accauntTransactions.map((item, i) => {
      return <RecentOperationItem accauntTransaction={item} key={i} />;
    });

  return (
    <Stack sx={{ height: "100%" }}>
      <Typography variant="h5" sx={{ mt: { lg: "139px", xs: "100px" } }}>
        Последние операции
      </Typography>
      <Paper
        sx={{
          boxShadow: "0",
          bgcolor: darkTurquoiseColor,
          mt: "20px",
          p: "30px 40px",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant={"h6"} sx={{ color: "#FFF" }}>
            Сумма
          </Typography>
          <Typography variant={"h6"} sx={{ color: "#FFF" }}>
            Тур
          </Typography>
          <Typography variant={"h6"} sx={{ color: "#FFF" }}>
            Дата
          </Typography>
        </Stack>
      </Paper>
      <Stack
        direction={"column"}
        gap={{ lg: "10px", xs: "14px" }}
        height={{ lg: "260px", xs: "225px" }}
        overflow={"scroll"}
        sx={{
          mt: "10px",
          overflowX: "hidden",
        }}
      >
        {elements}
      </Stack>
    </Stack>
  );
}
