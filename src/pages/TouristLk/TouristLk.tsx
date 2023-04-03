import TouristInfo from "../../components/UserInfo/TouristInfo/TouristInfo";
import React, { SyntheticEvent, useEffect, useState } from "react";
import UserInfoFabric from "../../components/UserInfoFabric/UserInfoFabric";
import { IUserRecord } from "../../models/userModels/IUserRecord";
import { getTouristRecords } from "../../submitFunctions/touristAPI/getTouristRecords";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ReactComponent as NavigateIcon } from "../../media/navigate_before.svg";

enum tabValues {
  upcomming,
  past,
}

function TouristLk() {
  const [records, setRecords] = useState<IUserRecord[]>([]);
  const [tabValue, setTabValue] = useState<tabValues>(tabValues.past);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    getTouristRecords((value) => setRecords(value), undefined, true);
  }, []);

  const handlerTabChange = (e: SyntheticEvent, newValue: tabValues) => {
    setTabValue(newValue);
  };

  const freeTagConverter = (record: IUserRecord) => {
    return record.tour?.freeServices
      ? record.tour?.freeServices.map((service, index) =>
          index === record.tour?.freeServices.length - 1
            ? `${service}`
            : `${service} • `
        )
      : "Ничего не включено";
  };

  return (
    <>
      {JSON.stringify(records)}
       <TouristInfo />
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
      <Stack direction={"row"} gap={3}>
        {records &&
          records.map((record, index) => (
            <Accordion
              key={index}
              defaultExpanded
              expanded={expanded}
              square={true}
              sx={{ width: "100%" }}
            >
              <AccordionSummary>
                <Grid container padding={3} justifyContent={"space-between"}>
                  <Grid item md={5}>
                    <Typography variant={"h5"}>
                      {record.tour.tourName + " "}№{record.publicTourId}
                    </Typography>
                    <Typography variant={"caption"}>
                      {record.tourDate.from +
                        " - " +
                        record.tourDate.to +
                        `ООО "Алтай тур"`}
                    </Typography>
                  </Grid>
                  <Grid item md={2} justifyContent={"right"}>
                    <Typography variant={"button"} textAlign={"right"}>
                      {record.tourAmount}₽
                    </Typography>
                    <Typography variant={"caption"} textAlign={"right"}>
                      {record.bookingStatus.payment}
                    </Typography>
                    <Stack direction={"row"} justifyContent={"right"}>
                      <Typography
                        variant={"caption"}
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? <>Скрыть</> : <>Развернуть</>}
                      </Typography>
                      <SvgIcon
                        viewBox="0 -8 24 24"
                        fontSize="medium"
                        sx={expanded ? {} : { transform: "rotate(180deg)" }}
                      >
                        <NavigateIcon width={24} />
                      </SvgIcon>
                    </Stack>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Stack padding={3} gap={1}>
                  <Stack
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                    direction={"row"}
                  >
                    <Typography variant={"h6"}>Количество человек</Typography>
                    <Button>Отменить бронирование</Button>
                  </Stack>
                  <Stack
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                    direction={"row"}
                  >
                    <Typography variant={"caption"}>3 человека</Typography>
                    <Typography variant={"caption"}>
                      до 12 марта 2023
                    </Typography>
                  </Stack>
                  <Typography variant={"h6"}>Проживание</Typography>
                  <Typography variant={"caption"}>
                    {record.tour?.housingInclud.housingName +
                      ", " +
                      record.tour?.housingInclud.housingAddress +
                      ", " +
                      record.tour?.housingInclud.housingDescription}
                  </Typography>
                  <Typography variant={"h6"}>Страхование</Typography>
                  <Typography variant={"caption"}>
                    {record.tour?.insuranceInclude !== undefined ? (
                      <>Страхование включено</>
                    ) : (
                      <>Страхование не включено</>
                    )}
                  </Typography>
                  <Typography variant={"h6"}>Контакты</Typography>
                  <Stack
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                    direction={"row"}
                  >
                    <Typography variant={"caption"}>
                      {record.contactInformation}
                    </Typography>
                    <Button>Сообщить о проблеме</Button>
                  </Stack>
                  <Typography variant={"h6"}>Сбор</Typography>
                  <Typography variant={"caption"}>
                    {record.meetingPoint + "в " + record.meetingTime}
                  </Typography>
                  <Typography variant={"h6"}>Включено в стоимость</Typography>
                  <Typography variant={"caption"}>
                    {freeTagConverter(record)}
                  </Typography>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
      </Stack>
    </>
  );
}

export default TouristLk;
