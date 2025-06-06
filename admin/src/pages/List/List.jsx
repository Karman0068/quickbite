import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
  
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); 
      } else {
        toast.error(response.data.message || "Failed to delete food item.");
      }
    } catch (error) {
      console.error("Error removing food item:", error);
      toast.error("Error removing food item.");
    }
  };
  
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={item.image} alt={item.name} onError={(e) => e.target.style.display = 'none'} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>Rs. {item.price}</p>
                <i onClick={() => {removeFood(item._id)}} className='fa-solid fa-xmark'></i>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List
