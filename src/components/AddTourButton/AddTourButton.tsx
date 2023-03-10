import plus from "../../media/plus-circle-outline.svg";
import Box from "@mui/material/Box";
import { darkTurquoiseColor } from "../../config/config";
import { Link } from "react-router-dom";

function AddTourButton() {
  return (
    <Box
      sx={{
        width: 325,
        height: 490,
        backgroundColor: darkTurquoiseColor,
        borderRadius: "30px",
        position: "relative",
      }}
    >
      <Link
        to={"/addTour"}
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <img
          src={plus}
          alt="plus icon"
          style={{
            width: "40px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Link>
    </Box>
  );
}

export default AddTourButton;
