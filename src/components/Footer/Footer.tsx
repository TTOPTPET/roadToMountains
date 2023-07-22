import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import { darkBlueColor } from "../../config/MUI/color/color";
import { Link } from "react-router-dom";
import { ReactComponent as VkIcon } from "../../media/vk-icon.svg";

const Footer = () => {
  const media = useMediaQuery("(max-width: 680px)");

  return (
    <Container sx={{ p: 0 }}>
      <Stack
        direction={media ? "column" : "row"}
        padding={"20px"}
        sx={{ width: "100%" }}
        justifyContent={media ? "center" : "space-between"}
        textAlign={"center"}
        gap={"15px"}
      >
        <Stack direction={"column"} gap={"15px"}>
          <Typography variant={"caption"}>© 2023 OOO «Путь в Горы»</Typography>
          <Typography variant={"caption"}>
            Проект компании{" "}
            <span style={{ fontFamily: "Unbounded", color: darkBlueColor }}>
              {" "}
              OLEG
            </span>
          </Typography>
        </Stack>
        <Stack
          direction={media ? "column" : "row"}
          gap={media ? "15px" : "30px"}
        >
          <Typography
            variant={"caption"}
            component={Link}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            Пользовательское соглашение
          </Typography>
          <Typography
            variant={"caption"}
            component={Link}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            Юридическая информация
          </Typography>
          <Typography
            variant={"caption"}
            component={Link}
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            Контакты
          </Typography>
        </Stack>
        <a
          href="https://www.youtube.com/watch?v=WTdk6XJ2tnM&list=LL&index=20"
          rel={"noreferrer"}
          target={"_blank"}
          style={{ float: "right" }}
        >
          <VkIcon />
        </a>
      </Stack>
    </Container>
  );
};

export default Footer;
