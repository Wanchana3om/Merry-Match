import { useState } from "react";
// import "./styles.css";

function DraggableList() {
  const [images, setImages] = useState([
    { id: 1, src: "https://via.placeholder.com/150" },
    { id: 2, src: "https://via.placeholder.com/150" },
    { id: 3, src: "https://via.placeholder.com/150" },
  ]);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
  };

  const handleDrop = (event, index) => {
    const movingImageIndex = event.dataTransfer.getData("index");
    const newImages = [...images];
    const movingImage = newImages.splice(movingImageIndex, 1)[0];
    newImages.splice(index, 0, movingImage);
    setImages(newImages);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = (id) => {
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  };

  return (
    <div className="App">
      <h1>Upload at least 2 photos</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="image-wrapper"
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
          >
            <img src={image.src} alt={`Image ${index + 1}`} />
            <button onClick={() => handleDelete(image.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DraggableList;
