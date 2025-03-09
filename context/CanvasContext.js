import { createContext, useContext, useState, useEffect, useRef } from "react";
import { FabricImage, InteractiveFabricObject } from "fabric";
import { customizeSelection } from "@/utility/custom/controls";
import createDynamicSVG from "@/utility/functions/image-generator";
import HistoryCanvas from "@/utility/custom/canvas";
import { addDraggedItem  } from "../utility/functions/canvas.utility"
const CanvasContext = createContext(null);

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const handleDrop = async (event) => {
    event.preventDefault();
    addDraggedItem(canvas)
  };
  useEffect(() => {
    const initializeCanvas = async () => {
      if (!canvasRef.current) return;

      const svgData = createDynamicSVG("#b1e3d7", window.innerWidth - 200, window.innerHeight, 35);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const img = await FabricImage.fromURL(url);

      const fabricCanvas = new HistoryCanvas(canvasRef.current, {
        backgroundColor: "#FFFFFF",
        selection: true,
        backgroundImage: img,
      });

      customizeSelection(InteractiveFabricObject);
      fabricCanvas.setDimensions({
        width: window.innerWidth - 200,
        height: window.innerHeight,
      });
      fabricCanvas.onHistory();
      window.addEventListener("resize", () => updateCanvasSize(fabricCanvas));

      setCanvas(fabricCanvas); // Set the global canvas
    };

    initializeCanvas();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (canvas) canvas.dispose();
    };
  }, []);

  // Handle canvas resizing on window resize
  const updateCanvasSize = (fcanvas) => {
    if (fcanvas) {
      fcanvas.setDimensions({
        width: window.innerWidth - 200,
        height: window.innerHeight,
      });
      fcanvas.renderAll();
    }
  };

  return (
    <CanvasContext.Provider value={{ canvas, setCanvas,handleDrop, canvasRef }}>
      {children}
    </CanvasContext.Provider>
  );
};
