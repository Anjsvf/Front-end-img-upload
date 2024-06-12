import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ImageList = () => {

   const [images, setImages] = useState([]) 
   const [editing, setEditing] = useState(null)
   const [newCaption , setNewCaption] = useState('')

   useEffect (() => {
    fetchImages()
   }, [])

   const fetchImages = async () => {
      const response = await axios.get('https://backend-nu-lyart-11.vercel.app/api/images');
      setImages(response.data);
  };
    

    const deleteImage = async (id) => {
      await axios.delete(`https://backend-nu-lyart-11.vercel.app/api/images/${id}`);
      setImages(images.filter(image => image._id !== id));
    };
    

    const updateCaption = async (id) => {
      const response = await axios.put(`https://backend-nu-lyart-11.vercel.app/api/images/${id}`, { caption: newCaption });  
      setImages(images.map(image => (image._id === id ? response.data : image)));
      setEditing(null);
    };
    
return(
    <div className='grid grid-cols-1 ms:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
     {images.map(image =>(
        <div key={image._id} className='bg-slate-700 p-4 rounded-lg'>
             <img className='mb-2 h-[85%] w-auto' src={`https://backend-nu-lyart-11.vercel.app/uploads/${image.filename}`} alt={image.caption} />
             {editing === image._id ? (
                <div>
                    <textarea value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value) }
                    className='w-full mb-1 p-1 rounded-lg border text-black border-gray-300 focus:outline-none focus:border-blue-500'
                    rows="3"
                    />
                    <button className='w-full  p-3 m-1 bg-lime-400 text-white rounded-lg hover:bg-lime-500 '
                    onClick={() => updateCaption(image._id)}
                    >salvar</button>
                </div>
             ):(
                <p className='mb-2 text-white'>{image.caption}</p>
             )}
             <div className='flex justify-between items-center'>
                <button className='p-2 bg-slate-950 text-white rounded-lg hover:bg-gray-900'onClick={() => deleteImage(image._id)}>Deletar imagem</button>
                <button className='p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700' onClick={() => setEditing(image._id)}>Editar legenda</button>

             </div>
        </div>
     ))}
    </div>
)
}

export default ImageList