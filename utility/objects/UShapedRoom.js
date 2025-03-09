import { FabricObject, classRegistry } from "fabric";

export default class UShaped extends FabricObject {
  static get type() {
    return 'UShaped';
  }
  constructor(options = {}) {
    super(options);
    this.transparentCorners = false;
    this.objectCaching = false;

    this.roomWidth = options.roomWidth || 200; // Default width
    this.roomHeight = options.roomHeight || 160; // Default height
    this.innerWidth = options.innerWidth || 100; // Default inner width
    this.innerHeight = options.innerHeight || 80; // Default inner height
    this.wallThickness = options.wallThickness || 15; // Default wall thickness

    this.width = this.roomWidth;
    this.height = this.roomHeight;
    this.fontSize = 14;
    this.wallColor = options.wallColor || 'brown'; // Wall color
  }
 
  // Override `set` to update width/height instead of scaling
  // Override `set` to update width/height instead of scaling
set(key, value) {
    if (key === 'scaleX' && value !== 1) {
      // Calculate the scale factor
      const scaleFactor = value;
      
      // Scale width and innerWidth proportionally
      this.width *= scaleFactor;
      this.roomWidth = this.width;
      this.innerWidth *= scaleFactor;
      
      // Reset scale to prevent compounding effects
      super.set('scaleX', 1);
      super.set('width', this.width);
    } 
    else if (key === 'scaleY' && value !== 1) {
      // Calculate the scale factor
      const scaleFactor = value;
      
      // Scale height and innerHeight proportionally
      this.height *= scaleFactor;
      this.roomHeight = this.height;
      this.innerHeight *= scaleFactor;
      
      // Reset scale to prevent compounding effects
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

  // Render the U-shaped room with walls and dimensions
  _render(ctx) {
    // Calculate coordinates for the U shape
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    const halfInnerWidth = this.innerWidth / 2;
    
    // Draw the U-shaped room (inner part)
    ctx.fillStyle = this.fill || 'lightblue';
    
    // Draw left vertical part of U
    ctx.fillRect(-halfWidth, -halfHeight, (halfWidth - halfInnerWidth), this.height);
    
    // Draw bottom horizontal part of U
    ctx.fillRect(-halfWidth, halfHeight - this.innerHeight, this.width, this.innerHeight);
    
    // Draw right vertical part of U
    ctx.fillRect(halfInnerWidth, -halfHeight, (halfWidth - halfInnerWidth), this.height - this.innerHeight);

    // Set wall color
    ctx.fillStyle = this.wallColor;

    // Draw outer walls
    // Left outer wall
    ctx.fillRect(-halfWidth - this.wallThickness, -halfHeight - this.wallThickness, 
                this.wallThickness, this.height + 2 * this.wallThickness);
    
    // Bottom outer wall
    ctx.fillRect(-halfWidth - this.wallThickness, halfHeight, 
                this.width + 2 * this.wallThickness, this.wallThickness);
    
    // Right outer wall
    ctx.fillRect(halfWidth, -halfHeight - this.wallThickness, 
                this.wallThickness, this.height + 2 * this.wallThickness);
    
    // Top outer wall 
    // Left segment of the top wall
    ctx.fillRect(
        -halfWidth - this.wallThickness,
        -halfHeight - this.wallThickness,
        halfWidth - halfInnerWidth + this.wallThickness*2 ,  // This reaches from left edge to inner opening
        this.wallThickness
    );
  
      // Right segment of the top wall
      ctx.fillRect(
        halfInnerWidth-this.wallThickness,
        -halfHeight - this.wallThickness,
        halfWidth - halfInnerWidth + this.wallThickness,
        this.wallThickness
      );

    // Draw inner walls
    // Left inner wall (vertical)
    ctx.fillRect(halfInnerWidth - this.wallThickness, -halfHeight, 
                this.wallThickness, this.height - this.innerHeight);
    ctx.fillRect(-halfInnerWidth, -halfHeight, 
                    this.wallThickness, this.height - this.innerHeight);
    // Bottom inner wall (horizontal)
    ctx.fillRect(-halfInnerWidth, halfHeight - this.innerHeight - this.wallThickness, 
                this.innerWidth, this.wallThickness);

    // Draw dimensions text
    ctx.fillStyle = 'black';
    ctx.font = `${this.fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Display total width at the bottom
    ctx.fillText(`${this.roomWidth.toFixed(0)}`, 0, halfHeight + this.wallThickness + 15);
    
    // Display total height on the left side
    ctx.save();
    ctx.translate(-halfWidth - this.wallThickness - 15, 0);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${this.roomHeight.toFixed(0)}`, 0, 0);
    ctx.restore();
    
    // Display inner width dimension
    ctx.fillText(`${this.innerWidth.toFixed(0)}`, 0, halfHeight - this.innerHeight / 2);
    
    // Display inner height dimension
    ctx.save();
    ctx.translate(halfInnerWidth + 15, -halfHeight + (this.height - this.innerHeight) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${this.innerHeight.toFixed(0)}`, 0, 0);
    ctx.restore();

    // Call the parent render method
    super._render(ctx);
  }
}
classRegistry.setClass(UShaped);