import { useRouter } from "next/router";
import { PencilRuler, Layers, Move, Save, Code, Settings2, Undo, Expand, ArrowLeft } from "lucide-react";

export default function About() {
  const router = useRouter();

  return (
    <div className="about-container">
      <h1 className="about-title">About 2D Floor Plan Creator</h1>
      <p className="about-description">
        This is a personal project built to explore <strong>React Fabric 6</strong> and how to 
        customize Fabric.js objects effectively. The tool allows users to create 2D floor plans 
        by placing and modifying rooms and assets dynamically.
      </p>

      <h2 className="about-section-title">
        <PencilRuler size={20} /> Features Implemented
      </h2>
      <ul className="about-list">
        <li><Layers size={16} /> Support for L, U, and Rectangular rooms</li>
        <li><Move size={16} /> Drag-and-drop PNG-based room assets</li>
        <li><Undo size={16} /> Undo/Redo functionality</li>
        <li><Expand size={16} /> Fullscreen mode for an enhanced workspace</li>
      </ul>

      <h2 className="about-section-title">
        <Settings2 size={20} /> Future Enhancements
      </h2>
      <ul className="about-list">
        <li><Code size={16} /> Advanced Fabric.js customization (right-click menu, property changes)</li>
        <li><Save size={16} /> Save and load floor plan data</li>
        <li><Layers size={16} /> Prebuilt floor plan templates for easier customization</li>
        <li><PencilRuler size={16} /> Real-time layout calculations for more precise measurements</li>
      </ul>

      <p className="about-note">
        This project can be used as a starter template for anyone looking to learn and integrate 
        React with Fabric.js. It provides a foundation for interactive design workflows and 
        canvas-based applications.
      </p>

      <button className="back-button" onClick={() => router.push("/")}>
        <ArrowLeft size={18} /> Back to Editor
      </button>
    </div>
  );
}
