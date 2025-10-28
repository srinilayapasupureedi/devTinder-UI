import React from "react";
import axios from "axios";
import { BASE_URL } from "../utilis/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utilis/feedSlice";
const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, about, profileImage, Gender } = user;
  const dispatch = useDispatch();
  const handleStatus = async (status, userId) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      console.log(res.data);
      dispatch(removeUserFromFeed(userId));
    }
    catch(err)
    {
      console.error(err);
    }
  }

  return (
    <div
      className="
        card bg-base-300 shadow-lg hover:shadow-2xl 
        transition duration-300 rounded-2xl overflow-hidden 
        transform hover:-translate-y-2 
        mx-auto mt-6 mb-2 max-w-[360px] py-[20px] my-[20px]
      "
    >
      <figure
        className="
          relative bg-gradient-to-br from-lime-300 to-green-400 
          h-[200px]
        "
      >
          <img
      src={profileImage || "https://www.vecteezy.com/vector-art/25869648-monochrome-woman-avatar-silhouette-user-icon-vector-in-trendy-flat-design"}
      alt={`${firstName} ${lastName}`}
      className='object-cover rounded-t-2xl mt-4 w-full h-full transition-transform duration-300 hover:scale-105'
    />
      </figure>
      <div className='card-body text-center px-5 py-5'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
          {firstName} {lastName}, {age}
        </h2>

        <p className='text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-2'>
          {about}
        </p>
  

    
        <div className="card-actions justify-center flex gap-3 mt-4">
          <button className="btn btn-primary rounded-full transition-transform hover:scale-105 px-6"
            onClick={()=>handleStatus("ignored",user._id)}
          >
            Ignore
          </button>
          <button className="btn btn-secondary rounded-full transition-transform hover:scale-105 px-6"
            onClick={()=>handleStatus("interested",user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
