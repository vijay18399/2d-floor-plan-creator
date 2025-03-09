import { useState } from "react";
import Image from "next/image";
import { Undo, Redo, Expand, Info } from "lucide-react";
import { useCanvas } from "@/context/CanvasContext";
import { useRouter } from "next/router";

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { canvas } = useCanvas(); 
  const router = useRouter()
  const AboutPage  = () => {
    router.push('/about')
  }
  const handleUndo = () => {
    if (canvas) {
      canvas.undo();
      canvas.renderAll();
    }
  };

  const handleRedo = () => {
    if (canvas) {
      canvas.redo();
      canvas.renderAll();
    }
  };
  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
    const element = document.documentElement; 

    if (isExpanded) {
      // Exit full-screen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Image width={30} height={30} src="/images/logo.png" alt="Logo" />
        <h1 className="header-title">2D Floor Plan Creator</h1>
      </div>

      <div className="header-right">
        <button className="header-button" onClick={handleUndo}><Undo /></button>
        <button className="header-button" onClick={handleRedo}><Redo /></button>
        <button 
          className={`header-button ${isExpanded ? "active" : ""}`} 
          onClick={handleExpand}
        >
          <Expand />
        </button>
        <button className="header-button" onClick={AboutPage}><Info /></button>
      </div>
    </header>
  );
}
