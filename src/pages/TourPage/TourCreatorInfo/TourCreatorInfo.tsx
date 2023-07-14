import { Paper, Stack, Typography, Avatar as MuiAvatar } from "@mui/material";
import React from "react";

import { baseUrl } from "../../../config/config";
import userPhoto from "../../../media/userPhoto.svg";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";

interface TourFirstPageProps {
  tourInfo: ITourInfo;
}

export default function TourCreatorInfo({ tourInfo }: TourFirstPageProps) {
  return (
    <Stack
      direction={"row"}
      gap={{ lg: "20px", xs: "10px" }}
      alignItems={"center"}
    >
      <Paper
        variant="avatarBg"
        className="tourInfo__creator-avatar"
        sx={{
          width: { lg: "70px", md: "50px", xs: "40px" },
          height: { lg: "70px", md: "50px", xs: "40px" },
        }}
      >
        {tourInfo && tourInfo?.creatorInfo?.photo ? (
          <MuiAvatar
            src={baseUrl + "/" + tourInfo?.creatorInfo?.photo}
            alt="user avatar"
            sx={{
              width: { lg: "70px", md: "50px", xs: "40px" },
              height: { lg: "70px", md: "50px", xs: "40px" },
            }}
          />
        ) : (
          <img src={userPhoto} alt="person icon" />
        )}
      </Paper>

      <Typography variant={"button"}>
        {tourInfo?.creatorInfo?.creatorType
          ? tourInfo?.creatorInfo?.creatorType === "SELF"
            ? ""
            : tourInfo?.creatorInfo?.creatorType === "OOO"
            ? "ООО"
            : "ИП"
          : ""}{" "}
        {tourInfo?.creatorInfo?.name
          ? tourInfo?.creatorInfo?.creatorType === "SELF"
            ? tourInfo?.creatorInfo?.name
            : `"${tourInfo?.creatorInfo?.name}"`
          : "Название компании"}
      </Typography>
    </Stack>
  );
}
