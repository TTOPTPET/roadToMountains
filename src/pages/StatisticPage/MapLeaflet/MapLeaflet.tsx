import { Box, Button, Paper } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./LeafletStyles.css";
import { LatLng } from "leaflet";
import LocationMarker from "./LocationMarker/LocationMarker";
import goBack from "../../../media/Icons/mapIcons/go-back-arrow.png";

type Props = {
  width: number | string;
  height: number | string;
  accessType?: "insert" | "observe";
  positions: [number, number][];
  setPositions?: Dispatch<SetStateAction<[number, number][]>>;
};

export default function MapLeaflet({
  width,
  height,
  accessType = "observe",
  positions = [],
  setPositions,
}: Props) {
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
            setPositions(() => {
              if (positions.length) {
                console.log("pos", positions, positions.length);
                return positions.slice(0, positions.length - 1);
              } else {
                return positions;
              }
            });
          }}
        >
          <img
            style={{ width: "70%", height: "70%", userSelect: "none" }}
            src={goBack}
            alt="goBack"
          />
        </Box>
      )}
      <MapContainer
        center={[55.81149, 37.499709]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          positions={positions}
          setPositions={setPositions}
          accessType={accessType}
        />
      </MapContainer>
    </Box>
  );
}
