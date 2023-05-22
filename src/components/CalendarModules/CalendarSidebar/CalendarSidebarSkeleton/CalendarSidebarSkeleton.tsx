import { Stack, Skeleton, Typography, Button, Box } from "@mui/material";
import React from "react";

function CalendarSidebarSkeleton() {
  return (
    <Stack direction={"column"} height={"65vh"}>
      <Typography variant={"h5"}>Выберите размещенный тур</Typography>

      <Stack gap={"1vh"} mt={4}>
        <Skeleton
          variant="rounded"
          height={"6vh"}
          sx={{ borderRadius: "10px" }}
        />

        <Box sx={{ width: "100%", position: "relative" }}>
          <Skeleton
            variant="rounded"
            height={"30vh"}
            sx={{ borderRadius: "10px" }}
          />
          <Typography
            variant={"h4"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              textAlign: "center",
              transform: "translatey(-50%) translatex(-50%)",
              color: "rgba(0, 0, 0, 0.2)",
              textTransform: "uppercase",
            }}
          >
            Выберите тур
          </Typography>
        </Box>

        {/* <Stack gap={"5px"}> */}
        {/* <Typography variant={"h6"}>Заказы</Typography> */}
        <Skeleton
          variant="rounded"
          height={"13vh"}
          sx={{ borderRadius: "10px" }}
        />
        {/* </Stack> */}

        {/* <Stack gap={"5px"}> */}
        {/* <Typography variant={"h6"}>Доход</Typography> */}
        <Skeleton
          variant="rounded"
          height={"13vh"}
          sx={{ borderRadius: "10px" }}
        />
        {/* </Stack> */}
      </Stack>
    </Stack>
  );
}

export default CalendarSidebarSkeleton;
