import { useCallback } from "react";
import DraggableList from "@/components/DraggableList";
import FabricCanvas from "@/components/FabricCanvas";
import blocks from "@/data/blocks"; 
import Header from "@/components/Header";
import { CanvasProvider } from "@/context/CanvasContext";
export default function Home() {
  const handleDragStart = useCallback((event, item) => {
    event.dataTransfer.setData("item", JSON.stringify(item));
  }, []);

  return (
    <CanvasProvider>
    <div className="container">
      <Header  />
      <div className="layout">
        <DraggableList blocks={blocks} handleDragStart={handleDragStart} />
        <FabricCanvas />
      </div>
    </div>
    </CanvasProvider>
  );
}
