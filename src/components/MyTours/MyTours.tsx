import { Stack, Typography, Tabs, Tab } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { IUserRecord } from "../../models/userModels/IUserRecord";
import { getTouristRecords } from "../../submitFunctions/touristAPI/getTouristRecords";
import { TourAccordion } from "./TourAccordion/TourAccordion";

enum tabValues {
  upcomming,
  past,
}

export const MyTours = () => {
  const [records, setRecords] = useState<IUserRecord[]>([]);
  const [tabValue, setTabValue] = useState<tabValues>(tabValues.past);

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
      true
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
        direction={"row"}
        marginBottom={3}
        flexWrap={"wrap"}
      >
        <Typography variant={"h3"}>Мои записи</Typography>
        <Tabs value={tabValue} onChange={handlerTabChange}>
          <Tab value={tabValues.upcomming} label={"Предстоящие"} />
          <Tab value={tabValues.past} label={"Прошедшие"} />
        </Tabs>
      </Stack>
      <Stack direction={"column"} gap={3}>
        {records &&
          records.map((record, index) => (
            <TourAccordion key={index} record={record} />
          ))}
      </Stack>
    </>
  );
};
