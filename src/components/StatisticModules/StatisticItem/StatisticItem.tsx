import { FC, useState } from "react";
import {
  IStatistic,
  TourStatus,
} from "../../../models/statisticModels/IStatistic";
import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Stack,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StatisticDiagram from "./StatisticDiagram/StatisticDiagram";

interface IStatisticItemProps {
  statistic: IStatistic;
}

const StatisticItem: FC<IStatisticItemProps> = ({ statistic }) => {
  const [open, setOpen] = useState<boolean>(false);

  const getTourStatus = (value: TourStatus): string => {
    switch (value) {
      case TourStatus.deleted:
        return "Удален";
      case TourStatus.banned:
        return "Заблокирован";
      case TourStatus.published:
        return "Опубликован";
      case TourStatus.nonPublished:
        return "Не опубликован";
      default:
        return "";
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{statistic?.tourName || ""}</TableCell>
        <TableCell>{getTourStatus(statistic?.tourStatus)}</TableCell>
        <TableCell>{statistic?.tourAmount || ""}</TableCell>
        <TableCell>{statistic?.personNum || ""}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
              {statistic?.stats &&
                statistic?.stats.map((item, index) => (
                  <StatisticDiagram stat={item} key={index} />
                ))}
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default StatisticItem;