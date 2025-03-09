import { FabricObject, classRegistry } from "fabric";

export default class Room extends FabricObject {
  static get type() {
    return 'Room';
  }
  constructor(options = {}) {
    super(options);
    this.transparentCorners = false;
    this.objectCaching = false;

    this.roomWidth = options.roomWidth || 120; // Default width
    this.roomHeight = options.roomHeight || 145; // Default height
    this.wallThickness = options.wallThickness || 15; // Default wall thickness

    this.width = this.roomWidth;
    this.height = this.roomHeight;
    this.fontSize = 14;
    this.wallColor = options.wallColor || 'brown'; // Wall color
  }
  

  // Override `set` to update width/height instead of scaling
  set(key, value) {
    if (key === 'scaleX' && value !== 1) {
      this.width *= value;
      this.roomWidth = this.width;
      super.set('scaleX', 1);
      super.set('width', this.width);
    } 
    else if (key === 'scaleY' && value !== 1) {
      this.height *= value;
      this.roomHeight = this.height;
      super.set('scaleY', 1);
      super.set('height', this.height);
    } 
    else {
      super.set(key, value);
    }

    this.setCoords(); 
    if (this.canvas) {
      this.canvas.requestRenderAll();
    }

    return this;
  }

  // Render the room with walls and dimensions
  _render(ctx) {
    // Draw the room (inner part)
    ctx.fillStyle = this.fill || 'lightblue';
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // Set wall color
    ctx.fillStyle = this.wallColor;

    // Draw walls
    ctx.fillRect(-this.width / 2 - this.wallThickness, -this.height / 2, this.wallThickness, this.height); // Left Wall
    ctx.fillRect(this.width / 2, -this.height / 2, this.wallThickness, this.height); // Right Wall
    ctx.fillRect(-this.width / 2 - this.wallThickness, -this.height / 2 - this.wallThickness, this.width + 2 * this.wallThickness, this.wallThickness); // Top Wall
    ctx.fillRect(-this.width / 2 - this.wallThickness, this.height / 2, this.width + 2 * this.wallThickness, this.wallThickness); // Bottom Wall

    // Draw dimensions text
    ctx.fillStyle = 'black';
    ctx.font = `${this.fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    // Display height on the left side
    ctx.save();
    ctx.translate(-this.width / 2 - this.wallThickness - 10, 0);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${this.roomHeight.toFixed(0)}`, 0, 0);
    ctx.restore();

    // Display width on the bottom
    ctx.textBaseline = 'top';
    ctx.fillText(`${this.roomWidth.toFixed(0)}`, 0, this.height / 2 + this.wallThickness + 10);

    // Call the parent render method
    super._render(ctx);
  }
}

classRegistry.setClass(Room);
