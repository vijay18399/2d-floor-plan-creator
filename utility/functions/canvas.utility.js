import LShaped from "../objects/LShapedRoom"
import UShaped from "../objects/UShapedRoom"
import Room from "../objects/Room"
import { FabricImage } from "fabric";

export async function addDraggedItem(canvas){
    if (!canvas) return;
    const item = JSON.parse(event.dataTransfer.getData("item"));
    const pointer = canvas.getPointer(event);
    if (item.src) {
      const img = await FabricImage.fromURL(item.src);
      if (!img) return;
      img.set({
        scaleX: item.scale,
        scaleY: item.scale,
        left: pointer.x,
        top: pointer.y,
      });

      canvas.add(img);
    } else {
      const objectMap = {
        lshaped: LShaped,
        rectangle: Room,
        ushaped: UShaped,
      };

      const ObjectClass = objectMap[item.type];
      if (ObjectClass) {
        const newObject = new ObjectClass({
          left: pointer.x,
          top: pointer.y,
          roomWidth: 200,
          roomHeight: 150,
          fill: "#f6fdfc",
          wallThickness: 15,
          wallColor: "#047C69",
          cornerColor: "#DEEBF2",
        });

        canvas.add(newObject);
      }
    }

    canvas.renderAll();
}