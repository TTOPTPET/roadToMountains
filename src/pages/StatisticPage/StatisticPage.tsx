import { useState } from "react";
import MapLeaflet from "../../components/MapLeaflet/MapLeaflet";

function StatisticPage() {
  const [positions, setPositions] = useState<[number, number][]>([]);
  return (
    <MapLeaflet
      width={"300px"}
      height={"300px"}
      accessType="insert"
      positions={positions}
      setPositions={(pos) => setPositions(pos)}
    />
  );
}

export default StatisticPage;
