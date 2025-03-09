import Image from "next/image";
import { Blocks, GripVertical, Cuboid } from 'lucide-react';

const DraggableList = ({ blocks, handleDragStart }) => {
  return (
    <div className="draggable-list">
      <div className="draggable-container">
        {blocks.map((category) => (
          <div key={category.category} className="draggable-category">
            <h5 className="draggable-category-title">
            <Cuboid/>  {category.category}
            </h5>
            <ul className="draggable-items">
              {category.items.map((item) => (
                <li
                  key={item.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="draggable-item"
                >
                  <div className="drag-content">
                    {item.src && ( 
                      <Image
                        src={item.src}
                        width={30}
                        height={30}
                        alt={item.label}
                        className="draggable-image"
                      />
                    )}
                    <p className="draggable-text">{item.label}</p>
                  </div>

                  <GripVertical/>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableList;
