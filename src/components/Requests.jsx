import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utilis/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests , removeRequests} from '../utilis/requestSlice';
const Requests = () => {
      const dispatch=useDispatch();
      // eslint-disable-next-line no-unused-vars
      const [loading,setLoading]=useState(true);
      const requests=useSelector((store)=>(store.request));
      console.log(requests);
   const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch( removeRequests(_id));
    } catch (err) {
      console.log(err);
    }
  };
    const fetchRequests=async()=>{
        try{
        const res =await axios.get(
          `${BASE_URL}/user/requests/recieved`,{
          withCredentials:true,
          });
          const  data = res?.data?.data || res.data;

          dispatch(addRequests(data));
      } catch (err) {
          console.error('Error fetching connections:', err);
        } finally {
          setLoading(false);
        }
  };
     useEffect(()=>{
      fetchRequests()
     },[]);
    if(!requests || requests.length===0)
      return <h3 className='text-center text-white text-3xl'> NO requests found</h3>

  
   return (
    <div className="text-center my-10">
      <h1 className="text-center text-white text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id,  profileImage, about } = request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-[16px] p-[16px] rounded-lg bg-base-300 w-2/3 mx-auto"
          >
          <div className="flex justify-center items-center mr-[16px]">
              <img
                alt="photo"
                className="w-[80px] h-[80px] rounded-full object-cover"
                src={profileImage}
              />
            </div>
            <div className="text-left mx-[16px] ">
              <p>{about}</p>
               <div>
              <button
                className="btn btn-primary mx-[4px]"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-[4px]"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default Requests;