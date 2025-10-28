import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utilis/connectionSlice';
import { BASE_URL } from '../utilis/constants';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log('Connections from store:', connections);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      const data = res.data.data || res.data;
      dispatch(addConnection(data));
    } catch (err) {
      console.error('Error fetching connections:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) return <h2>Loading connections...</h2>;
  if (!connections || connections.length === 0)
    return <h3 className='text-center'>No connections found</h3>;

   return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, profileImage, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-[16px] p-[16px] rounded-lg bg-base-300 w-1/2 mx-auto"
          >
          <div className="flex justify-center items-center mr-[16px]">
              <img
                alt="photo"
                className="w-[80px] h-[80px] rounded-full object-cover"
                src={profileImage}
              />
            </div>
            <div className="text-left mx-[16px] ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            {/* <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link> */}
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
