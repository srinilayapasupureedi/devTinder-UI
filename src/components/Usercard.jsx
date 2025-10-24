import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, about, profileImage, Gender } = user;

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
          <button className="btn btn-primary rounded-full transition-transform hover:scale-105 px-6">
            Ignore
          </button>
          <button className="btn btn-secondary rounded-full transition-transform hover:scale-105 px-6">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
