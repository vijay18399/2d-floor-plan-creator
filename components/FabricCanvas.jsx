import { useCanvas } from "@/context/CanvasContext";

const FabricCanvas = () => {
  const { canvasRef , handleDrop } = useCanvas(); // Get global canvasRef

  return (
    <div   onDrop={handleDrop}
         onDragOver={(e) => e.preventDefault()} style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} id="canvas" />
    </div>
  );
};

export default FabricCanvas;
