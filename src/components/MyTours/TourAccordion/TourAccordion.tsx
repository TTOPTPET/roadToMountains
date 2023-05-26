import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  SvgIcon,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { IUserRecord } from "../../../models/userModels/IUserRecord";
import { ReactComponent as NavigateIcon } from "../../../media/navigate_before.svg";
import { TourDetails } from "../TourSummary/TourDetails";
import SuccessMessageSendModal from "../../Modals/SuccessMessageSendModal/SuccessMessageSendModal";

export const TourAccordion = ({ record }: { record: IUserRecord }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <>
      <Accordion
        defaultExpanded
        expanded={expanded === record.publicTourId}
        square={true}
        sx={{ width: "100%" }}
      >
        <AccordionSummary>
          <Grid container padding={3} justifyContent={"space-between"}>
            <Grid item md={5}>
              <Typography variant={"h5"}>
                {record.tour.tourName + " "}№{record.bookingId}
              </Typography>
              <Typography variant={"caption"}>
                {dayjs(record.tourDate.from).format("D MMMM YYYY") +
                  " - " +
                  dayjs(record.tourDate.to).format("D MMMM YYYY") +
                  ` ООО "Алтай тур"`}
              </Typography>
            </Grid>
            <Grid item md={2} justifyContent={"right"}>
              <Typography variant={"button"} textAlign={"right"}>
                {record.tourAmount}₽
              </Typography>
              <Typography variant={"caption"} textAlign={"right"}>
                {record.bookingStatus.payment}
              </Typography>
              <Stack
                direction={"row"}
                justifyContent={"right"}
                onClick={() =>
                  setExpanded(
                    expanded === record.publicTourId
                      ? false
                      : record.publicTourId
                  )
                }
              >
                <Typography variant={"caption"}>
                  {expanded === record.publicTourId ? (
                    <>Скрыть</>
                  ) : (
                    <>Развернуть</>
                  )}
                </Typography>
                <SvgIcon
                  viewBox="0 -8 24 24"
                  fontSize="medium"
                  sx={
                    expanded === record.publicTourId
                      ? {}
                      : {
                          transform: "rotate(180deg)",
                        }
                  }
                >
                  <NavigateIcon width={24} />
                </SvgIcon>
              </Stack>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <TourDetails record={{ ...record, type: "record" }} />
        </AccordionDetails>
        {/* <SuccessMessageSendModal /> */}
      </Accordion>
    </>
  );
};
