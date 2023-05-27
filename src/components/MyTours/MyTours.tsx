import {
  Stack,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { IUserRecord } from "../../models/userModels/IUserRecord";
import { getTouristRecords } from "../../API/touristAPI/getTouristRecords";
import { TourAccordion } from "./TourAccordion/TourAccordion";

enum tabValues {
  upcomming,
  past,
}

export const MyTours = () => {
  const [records, setRecords] = useState<IUserRecord[]>([]);
  const [tabValue, setTabValue] = useState<tabValues>(tabValues.upcomming);

  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    switch (tabValue) {
      case tabValues.past: {
        filterRecords(true);
        break;
      }
      case tabValues.upcomming: {
        filterRecords(false);
        break;
      }
      default: {
        break;
      }
    }
  }, [tabValue]);

  const filterRecords = (past: boolean) => {
    getTouristRecords(
      (value) =>
        setRecords(value.filter((item) => item.bookingStatus.past === past)),
      undefined,
      false
    );
  };

  const handlerTabChange = (e: SyntheticEvent, newValue: tabValues) => {
    setTabValue(newValue);
    switch (newValue) {
      case tabValues.past: {
        filterRecords(true);
        break;
      }
      case tabValues.upcomming: {
        filterRecords(false);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <Stack
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        direction={"row"}
        flexWrap={"wrap"}
        margin={{ lg: "50px 0 40px", sm: "30px 0 20px", xs: "10px 0 15px" }}
      >
        <Typography variant={lessThenSmall ? "h4" : "h3"}>
          Мои записи
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handlerTabChange}
          sx={{
            m: lessThenSmall ? "0 auto" : "",
            mt: lessThenSmall ? "10px" : "",
          }}
        >
          <Tab value={tabValues.upcomming} label={"Предстоящие"} />
          <Tab value={tabValues.past} label={"Прошедшие"} />
        </Tabs>
      </Stack>
      <Stack direction={"column"} gap={{ lg: "20px", xs: "10px" }}>
        {records &&
          records.map((record, index) => (
            <TourAccordion key={index} record={record} />
          ))}
      </Stack>
    </>
  );
};
