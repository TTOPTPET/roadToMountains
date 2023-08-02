import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  SvgIcon,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { SetStateAction, useState, Dispatch, FC } from "react";
import { IUserRecord } from "../../../models/userModels/IUserRecord";
import { ReactComponent as NavigateIcon } from "../../../media/navigate_before.svg";
import { TourDetails } from "../TourSummary/TourDetails";
import SuccessMessageSendModal from "../../Modals/SuccessMessageSendModal/SuccessMessageSendModal";
import ConditionChangedChip from "./ConditionChangedChip/ConditionChangedChip";

import { redirect, useNavigate } from "react-router-dom";

import { bookingPay } from "../../../API/touristAPI/bookingPay";

interface ITourAccordionProps {
  record: IUserRecord;
  records: IUserRecord[];
  setRecords: Dispatch<SetStateAction<IUserRecord[]>>;
}

export const TourAccordion: FC<ITourAccordionProps> = ({
  record,
  records,
  setRecords,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  console.log(record);
  const theme = useTheme();
  const navigate = useNavigate();

  const lessThenBig = useMediaQuery(theme.breakpoints.down("lg"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Accordion
        defaultExpanded
        expanded={expanded === record.publicTourId}
        square={true}
        sx={{ width: "100%" }}
      >
        <AccordionSummary>
          <Grid
            container
            padding={{ lg: "24px", sm: "10px", xs: "4px" }}
            justifyContent={"space-between"}
            sx={{ position: "relative" }}
          >
            <Grid item md={5}>
              <Stack gap="5px">
                <Typography variant={"h5"}>
                  {record.tour.tourName + " "}№{record.bookingId}
                </Typography>
                <Typography variant={"caption"}>
                  {dayjs(record.tourDate.from).format("D MMMM YYYY") +
                    " - " +
                    dayjs(record.tourDate.to).format("D MMMM YYYY")}
                </Typography>
                <Typography variant={"caption"}>ООО "Алтай тур"</Typography>
                {record?.statusUpdate && <ConditionChangedChip />}
              </Stack>
            </Grid>
            <Grid item width={"fit-content"} justifyContent={"right"}>
              <Stack gap="5px">
                {record?.bookingStatus?.needPayment ? (
                  <Stack
                    direction="row"
                    gap={2}
                    alignItems={"center"}
                    justifyContent={"right"}
                  >
                    <Button
                      onClick={() =>
                        bookingPay(record?.bookingId, (data) => {
                          window.location.replace(data.paymentUrl);
                        })
                      }
                    >
                      Оплатить
                    </Button>

                    <Typography
                      variant={"button"}
                      textAlign={"right"}
                      sx={{
                        position: lessThenSmall ? "absolute" : "",
                        bottom: "20px",
                        right: "0",
                      }}
                    >
                      {record.tourAmount}₽
                    </Typography>
                  </Stack>
                ) : (
                  <Typography
                    variant={"button"}
                    textAlign={"right"}
                    sx={{
                      position: lessThenSmall ? "absolute" : "",
                      bottom: "20px",
                      right: "0",
                    }}
                  >
                    {record.tourAmount}₽
                  </Typography>
                )}
                <Typography
                  variant={"caption"}
                  textAlign={"right"}
                  sx={{
                    mt: lessThenSmall ? "5px" : "",
                  }}
                >
                  {record.bookingStatus.payment}
                </Typography>
              </Stack>
            </Grid>
            <Stack
              direction={"row"}
              justifyContent={"right"}
              alignItems={"center"}
              sx={{ position: "absolute" }}
              bottom={{ lg: 20, sm: 0, xs: -9 }}
              right={{ lg: 20, sm: 0, xs: -10 }}
              onClick={() =>
                setExpanded(
                  expanded === record.publicTourId ? false : record.publicTourId
                )
              }
            >
              <Typography
                variant={"caption"}
                sx={{ m: lessThenBig ? "0 -5px 0px 0" : "" }}
              >
                {expanded === record.publicTourId ? (
                  <>Скрыть</>
                ) : (
                  <>Развернуть</>
                )}
              </Typography>
              <SvgIcon
                viewBox={lessThenBig ? "-10 -18 44 44" : "0 -8 24 24"}
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
        </AccordionSummary>
        <AccordionDetails>
          <TourDetails
            record={{ ...record, type: "record" }}
            records={records}
            setRecords={setRecords}
          />
        </AccordionDetails>
        {/* <SuccessMessageSendModal /> */}
      </Accordion>
    </>
  );
};
