import { FabricObject, classRegistry } from "fabric";

export default class LShaped extends FabricObject {
  static get type() {
    return 'LShaped';
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

  // Render the L-shaped room with walls and dimensions
  _render(ctx) {
    // Draw the L-shaped room (inner part)
    ctx.fillStyle = this.fill || 'lightblue';
    
    // Draw the horizontal part of the L
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width / 2, this.height / 2);

    // Draw the vertical part of the L
    ctx.fillRect(-this.width / 2, 0, this.width, this.height / 2);

    // Set wall color
    ctx.fillStyle = this.wallColor;

    // Draw walls for the horizontal part of the L
    ctx.fillRect(-this.width / 2 - this.wallThickness, -this.height / 2, this.wallThickness, this.height / 2); // Left Wall
    ctx.fillRect(-this.wallThickness, -this.height / 2, this.wallThickness, this.height / 2 + this.wallThickness); // Right Wall
    ctx.fillRect(-this.width / 2 - this.wallThickness, -this.height / 2 - this.wallThickness, this.width / 2 + this.wallThickness, this.wallThickness); // Top Wall
     ctx.fillRect(0 , 0, this.width / 2 + this.wallThickness, this.wallThickness); // Bottom Wall

    // Draw walls for the vertical part of the L
    ctx.fillRect(-this.width / 2 - this.wallThickness, 0, this.wallThickness, this.height / 2); // Left Wall
    ctx.fillRect(this.width / 2, 0, this.wallThickness, this.height / 2); // Right Wall
    ctx.fillRect(-this.width / 2 - this.wallThickness, this.height / 2, this.width + 2 * this.wallThickness, this.wallThickness); // Bottom Wall

    // Draw dimensions text
    ctx.fillStyle = 'black';
    ctx.font = `${this.fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    // Display height on the left side
    ctx.save();
    ctx.translate(-this.width / 2 - this.wallThickness - 10, -this.height / 4);
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

classRegistry.setClass(LShaped);
