// import React from 'react'
// import EditProfile from './EditProfile';
// import { useSelector } from 'react-redux';
// const Profile = () => {
//    const user = useSelector((store) => store.user);
//    console.log("Profile User:", user);
   
//   return (
//     <div><EditProfile user={user}/></div>
    
//   )
// }

// export default Profile;
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { BASE_URL } from "../utilis/constants";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });

        setUser(res.data);
      } catch (err) {
        console.error("Profile error:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return <EditProfile user={user} />;
};

export default Profile;
