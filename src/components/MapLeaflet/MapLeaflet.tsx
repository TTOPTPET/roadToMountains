import { Box } from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "./LeafletStyles.css";
import LocationMarker from "./LocationMarker/LocationMarker";
import goBack from "../../media/Icons/mapIcons/go-back-arrow.png";

type Props = {
  width: number | string;
  height: number | string;
  accessType?: "insert" | "observe";
  positions: [number, number][];
  setPositions?: (positions: [number, number][]) => void;
  mapCenter?: [number, number];
};

export default function MapLeaflet({
  width,
  height,
  accessType = "observe",
  positions = [],
  setPositions,
  mapCenter = [55.057399, 83.138469],
}: Props) {
  console.log({ mapCenter });
  return (
    <Box width={width} height={height} sx={{ position: "relative" }}>
      {accessType === "insert" && (
        <Box
          sx={{
            zIndex: 1001,
            position: "absolute",
            right: "10px",
            top: "10px",
            backgroundColor: "#fff",
            width: "35px",
            height: "35px",
            padding: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
            border: "2px solid rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
          onClick={(e) => {
            if (positions.length) {
              console.log("pos", positions, positions.length);
              setPositions(positions.slice(0, positions.length - 1));
            } else {
              setPositions(positions);
            }
          }}
        >
          <img
            style={{ width: "70%", height: "70%", userSelect: "none" }}
            src={goBack}
            alt="goBack"
          />
        </Box>
      )}
      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          positions={positions}
          setPositions={setPositions}
          accessType={accessType}
          center={mapCenter}
        />
      </MapContainer>
    </Box>
  );
}
