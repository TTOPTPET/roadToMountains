import { Grid, Typography } from "@mui/material";

import vkIcon from "../../media/vk-icon-contactPage.svg";

export default function ContactsPage() {
  return (
    <>
      <Typography variant={"h3"}>Контакты</Typography>
      <Grid
        container
        direction={"column"}
        gap={"15px"}
        mt={"20px"}
        alignItems={"flex-start"}
      >
        <Grid container direction={"column"} gap={"7px"}>
          <Typography variant={"h6"}>Телефон</Typography>
          <Typography variant={"caption"}>+7 (999) 999-99-99</Typography>
        </Grid>
        <Grid container direction={"column"} gap={"7px"}>
          <Typography variant={"h6"}>Юридический адрес</Typography>
          <Typography variant={"caption"}>
            630550, Новосибирская область, Новосибирский р-н, с. Раздольное,
            Звёздная ул., д. 8
          </Typography>
        </Grid>
        <Grid>
          <Typography variant={"h6"}>Социальные сети</Typography>
        </Grid>
        <img src={vkIcon} alt="vk icon" style={{ width: "35px" }} />
      </Grid>
    </>
  );
}
