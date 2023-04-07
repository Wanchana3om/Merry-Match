import { useState } from "react";

function RegisterForm3() {
  const [images, setImages] = useState([null, null, null, null, null]);

  const handleImageClick = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleImageDrop = (event, index) => {
    event.preventDefault();
    const droppedIndex = event.dataTransfer.getData("text");
    if (droppedIndex === "") return;
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const temp = newImages[index];
      newImages[index] = newImages[droppedIndex];
      newImages[droppedIndex] = temp;
      return newImages;
    });
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const deleteImage = (event, index) => {
    event.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  return (
    <div className="bg-[#FCFCFE] form-container px-[255px]  py-8 h-[500px]">
      <h1 className="text-2xl text-[#A62D82] font-[700] mb-1">
        Profile pictures
      </h1>
      <h2 className="mb-5">Upload at least 2 photos</h2>

      <div className="grid grid-cols-5 grid-rows-1 gap-2">
        {images.map((image, index) => (
          <>
            <div
              key={index}
              className="w-[167px] h-[167px] bg-red-200 rounded-2xl cursor-pointer relative z-0"
              onClick={() => handleImageClick(index)}
              onDrop={(event) => handleImageDrop(event, index)}
              onDragOver={(event) => handleDragOver(event)}
              draggable={image !== null}
              onDragStart={(event) => handleDragStart(event, index)}
              style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            >
              {image !== null && (
                <button
                  className="absolute -right-2 -top-1 cursor-pointer z-10 block rounded-full bg-[#AF2758] text-white h-6 w-6"
                  onClick={(event) => deleteImage(event, index)}
                >
                  ✕
                </button>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default RegisterForm3;
