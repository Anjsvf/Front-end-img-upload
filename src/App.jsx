import React, { useState } from "react";
import "./App.css";
import ImageForm from "./components/ImageForm.jsx";
import ImageList from "./components/ImageList.jsx";

const App = () => {
  const [images, setImages] = useState([]);
  const handleUpload = (newImage) => {
    setImages([newImage, ...images]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3x1 text-white font-bold mb-4">upload de imagens</h1>
      <ImageForm onUpload={handleUpload} />
      <ImageList images ={images} />
    </div>
  );
};

export default App;
