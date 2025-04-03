import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/storeContext';

const Add = () => {
  const { canteenToken,canteenName } = useContext(StoreContext);

  const name = localStorage.getItem('canteenName');
  // Check if canteenToken exists
  if (!canteenToken) {
    toast.error("You are not authorized. Please log in again.");
    return <div>You are not authorized. Please log in again.</div>;
  }

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Image not selected");
      return;
    }

    if (isNaN(data.price) || data.price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/food/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${canteenToken}`,  // Fixed Template Literal Syntax
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: "", description: "", price: "", category: "Salad" });
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
    <div className="add w-full max-w-3xl ml-4 md:ml-8 lg:ml-12 mx-auto mt-7 text-gray-600 text-base">
      <p className='text-[30px] max-[700px]:text-[26px] max-[500px]:text-[23px] max-[400px]:text-[20px] font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-center'>{canteenName || name}</p>
      <form onSubmit={onSubmitHandler} className="add-food flex flex-col gap-4">
        <div className="add-img-upload flex flex-col gap-2 mb-4">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="w-32 md:w-40 lg:w-48"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2"
            type="file"
            id="image"
            hidden
          />
        </div>

        <div className="add-product-name flex flex-col gap-2 w-full max-w-md mb-4">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            className="p-1 border rounded-md w-[250px] md:w-[300px] lg:w-[400px]"
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-desc mb-4 flex flex-col gap-2 w-full max-w-md">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            className="p-2 border rounded-md w-[250px] md:w-[300px] lg:w-[400px]"
            name="description"
            rows="5"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price flex flex-col md:flex-row gap-4">
          <div className="add-category mb-4 flex flex-col gap-2 w-full max-w-xs">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              className="border p-2 rounded-md w-[250px]"
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price mb-4 flex flex-col gap-2 w-full max-w-xs">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              className="border p-2 rounded-md w-[250px]"
              name="price"
              type="number"
              placeholder="₹30"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="p-2 text-black bg-[#ff2e4aeb] rounded-lg cursor-pointer mb-5 ml-3 w-[250px] md:w-[300px]"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
