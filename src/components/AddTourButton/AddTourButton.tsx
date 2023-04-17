import plus from "../../media/plus-circle-outline.svg";
import Box from "@mui/material/Box";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import { Link } from "react-router-dom";

function AddTourButton() {
  return (
    <Box
      component={Link}
      to={"add"}
      className="tour_button"
      sx={{
        display: "block",
        width: 325,
        height: 490,
        backgroundColor: darkTurquoiseColor,
        borderRadius: "30px",
        position: "relative",
      }}
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
        className="tour_button_icon"
      />
    </Box>
  );
}

export default AddTourButton;
