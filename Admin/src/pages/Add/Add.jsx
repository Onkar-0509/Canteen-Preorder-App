import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
   const [image,setImage]=useState(null)
   const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
   })

   const onChangeHandler=(event)=>{
      const name = event.target.name;
      const value = event.target.value;
        setData(data=>({...data, [name]:value}))
   }

   const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
        toast.error('Image not selected');
        return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
        const response = await axios.post("http://localhost:3000/api/food/add", formData);
        if (response.data.success) {
            toast.success(response.data.message);
            setData({ name: "", description: "", price: "", category: "" });
            setImage(null);
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        toast.error("Failed to add food. Please check the server.");
        console.error(error);
    }
};
  

  return (
    <div className='add w-[70%]  ml-[5vw] mt-[50px] text-[#6d6d6d] text-[16px]'> 

      <form onSubmit={onSubmitHandler} 
      className='add-food flex flex-col gap-2 ml-15'> 

        <div className="add-img-upload flex flex-col gap-2 mb-2">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img  className='w-[120px]' 
            src={image?URL.createObjectURL(image):assets.upload_area} 
            alt="" />
          </label>

          <input onChange={(e)=>setImage(e.target.files[0])} 
          className='p-[10px]' type="file" id="image" hidden required/>
        </div>

        <div className="add-product-name flex flex-col gap-2 w-[max(40%,280px)] mb-2">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} className='p-[6px] border rounded-sm' type="text" name='name' placeholder='type here' />
        </div>

        <div className="add-product-desc mb-2 flex flex-col gap-2 w-[max(40%,280px)]">
          <p>Product Decription</p>
           <textarea onChange={onChangeHandler} value={data.description} className='p-[6px] border rounded-sm' name="description" rows='5' placeholder='write content here'></textarea>
        </div>

        <div className="add-category-price flex gap-10 ">
          <div className="add-category mb-2 flex flex-col gap-2 ">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} className='border p-[4px] rounded-sm max-w-[120px]' name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
            
          </div>
          <div className="add-price mb-2 flex flex-col gap-2">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} className='border p-[2px] rounded-sm max-w-[120px]' name="price" type="Number" placeholder='$30' />
          </div>
        </div>

        <button type='submit' className='max-w-[120px] p-2 bg-orange-100 rounded-lg cursor-pointer'>ADD</button>
      </form>
       
       
    </div>
  )
}

export default Add
