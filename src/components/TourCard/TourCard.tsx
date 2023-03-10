import Box from "@mui/material/Box";
import { lightTurquoiseColor } from "../../config/config";
import { IMyTours } from "../../pages/CreatorLk/CreatorLk";

type CardProps = {
  tourName: string | undefined;
  myTours: IMyTours[];
  price: number;
  photo: string[];
};

function TourCard({ tourName, myTours, price, photo }: CardProps) {
  console.log(price);
  return (
    <Box
      sx={{
        width: 325,
        height: 490,
        borderRadius: "30px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "50%",
          backgroundColor: lightTurquoiseColor,
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          position: "absolute",
          top: "50%",
        }}
      >
        <Box>{tourName}</Box>
        <Box>{price}₽</Box>
        <Box>
          <Box></Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TourCard;
