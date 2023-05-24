import * as L from "leaflet";
import { Marker, Polyline, useMapEvents } from "react-leaflet";
import iconImage from "../../../media/Icons/mapIcons/maps-and-flags.png";
import { Dispatch, SetStateAction } from "react";

type Props = {
  positions: [number, number][];
  setPositions: Dispatch<SetStateAction<[number, number][]>>;
  accessType?: "insert" | "observe";
};

export default function LocationMarker({
  positions,
  setPositions,
  accessType,
}: Props) {
  const LeafIcon: any = L.Icon.extend({
    options: {},
  });

  const Icon = new LeafIcon({
    iconUrl: iconImage,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
  });

  const map = useMapEvents({
    click(e) {
      if (accessType === "insert") {
        setPositions((pos) => [
          ...pos,
          [+e.latlng.lat.toFixed(5), +e.latlng.lng.toFixed(5)],
        ]);
      }
    },
  });

  return (
    <>
      {positions.length && (
        <>
          <Marker position={positions[0]} icon={Icon}>
            {/* <Tooltip permanent>Начало</Tooltip> */}
          </Marker>
          <Polyline
            pathOptions={{ color: "#30ABC8", weight: 5 }}
            positions={positions}
          />
          {positions.length > 1 && (
            <Marker position={positions[positions.length - 1]} icon={Icon}>
              {/* <Tooltip permanent>Конец</Tooltip> */}
            </Marker>
          )}
        </>
      )}
    </>
  );
}
