import React, { useState } from "react";
import axios from "axios";

const ImageForm = ({ onUpload }) => {
const [caption, setCaption] = useState("");
 const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    const response = await axios.post('https://backend-nu-lyart-11.vercel.app//api/images', formData);
    onUpload(response.data);
    setCaption('');
    setImage(null);
};

  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-slate-700 rounded-">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full mb-2 p-2 rounded-lg border border-gray-300
           focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="digite uma legenda para essa foto"
          className="block w-full text-black  mb-2 p-2 rounded-lg border  border-gray-300  
          focus:outline-none focus:border-blue-500"
          required
        />
        <button className="block w-full p-2 bg-slate-950 text-white rounded-lg hover:bg-gray-900
          " type="submit">faça upload de uma imagem</button>
      </form>
    </div>
  );
};

export default ImageForm;
