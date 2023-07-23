import React from "react";
import { Grid, Typography } from "@mui/material";

export default function DocumentsPage() {
  return (
    <>
      <Typography variant={"h3"}>Юридическая информация</Typography>
      <Grid
        container
        direction={"column"}
        gap={"15px"}
        mt={"20px"}
        alignItems={"flex-start"}
      >
        <Grid>
          <Typography variant={"h6"}>ООО «Путь в Горы»</Typography>
        </Grid>
        <Grid container direction={"column"} gap={"7px"}>
          <Typography variant={"h6"}>ОГРН</Typography>
          <Typography variant={"caption"}>
            1235400010306 от 10 марта 2023 г.
          </Typography>
        </Grid>
        <Grid container direction={"column"} gap={"7px"}>
          <Typography variant={"h6"}>КПП</Typography>
          <Typography variant={"caption"}>541001001</Typography>
        </Grid>
        <Grid container direction={"column"} gap={"7px"}>
          <Typography variant={"h6"}>Юридический адрес</Typography>
          <Typography variant={"caption"}>
            630550, Новосибирская область, Новосибирский р-н, с. Раздольное,
            Звёздная ул., д. 8
          </Typography>
        </Grid>
        <Grid container direction={"column"} gap={"7px"}>
          <Typography variant={"h6"}>Генеральный директор</Typography>
          <Typography variant={"caption"}>
            Сахнова Ксения Владимировна
          </Typography>
        </Grid>
        <Grid container direction={"column"} gap={"7px"}>
          <Typography variant={"h6"}>Реквизиты</Typography>
          <Typography variant={"caption"}>хз</Typography>
        </Grid>
      </Grid>
    </>
  );
}
