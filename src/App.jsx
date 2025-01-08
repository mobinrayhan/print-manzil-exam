import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

function App() {
  const [image, setImage] = useState(null);
  const [resizeData, setResizeData] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState(1);
  const imageRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, width: 0 }); // For tracking initial mouse position and width

  function handleSubmit(eve) {
    eve.preventDefault();
    const formEle = eve.currentTarget;
    const formData = new FormData(formEle);
    const image = formData.get("image");

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          setImage({ src: reader.result, width, height });
          setResizeData({ width, height });
          setAspectRatio(width / height);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(image);
    }

    formEle.reset();
  }

  const handleResizeStart = (e) => {
    e.preventDefault();
    setStartPosition({
      x: e.clientX,
      width: resizeData.width, // Store initial width
    });
    setIsResizing(true);
  };

  const handleResize = (e) => {
    if (isResizing) {
      // Calculate the change in mouse position
      const deltaX = e.clientX - startPosition.x;

      // Calculate new width and height based on the aspect ratio
      const newWidth = startPosition.width + deltaX;
      const newHeight = newWidth / aspectRatio;

      // Update resize data
      setResizeData({
        width: Math.max(50, newWidth), // Ensure a minimum width
        height: Math.max(50, newHeight), // Ensure a minimum height
      });
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", handleResizeEnd);
    } else {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing]);

  return (
    <section className="container mx-auto mt-4 grid grid-cols-12 gap-6 h-[40rem] relative">
      <div className="col-start-1 col-end-7 row-span-2 border border-solid flex justify-center items-center relative overflow-hidden">
        <img
          src="/men-black-plain-t-shirt-1000x1000.jpg"
          alt="T-shirt"
          className="w-full h-auto"
        />

        {image && (
          <Draggable>
            <div
              ref={imageRef}
              className="absolute cursor-pointer"
              style={{
                height: resizeData.height + "px",
                width: resizeData.width + "px",
                position: "absolute",
                userSelect: "none",
                WebkitUserDrag: "none",
              }}
            >
              <img
                src={image.src}
                alt="Uploaded"
                className="absolute cursor-pointer"
                style={{
                  height: resizeData.height + "px",
                  width: resizeData.width + "px",
                  userSelect: "none",
                  WebkitUserDrag: "none",
                }}
              />
              <div
                className="absolute bottom-0 right-0 bg-blue-500 cursor-se-resize w-4 h-4"
                onMouseDown={handleResizeStart}
              />
            </div>
          </Draggable>
        )}
      </div>
      <form
        className="col-start-7 col-end-[-1] row-span-2 flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center border flex-1">
          <input type="file" accept="image/*" required name="image" />
        </div>
        <div className="flex justify-center items-center border flex-1 ">
          <button className="bg-orange-400 text-white p-4 rounded-md">
            Submit Logo
          </button>
        </div>
      </form>
    </section>
  );
}

export default App;
