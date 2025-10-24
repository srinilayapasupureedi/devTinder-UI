import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utilis/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utilis/userSlice";

const EditProfile = ({ user }) => {
  
  const safeUser = user || {};
  const [firstName, setFirstName] = useState(safeUser.firstName || "");
  const [lastName, setLastName] = useState(safeUser.lastName || "");
  const [profileImage, setProfileImage] = useState(safeUser.profileImage);
  const [age, setAge] = useState(safeUser.age || "");
  const [gender, setGender] = useState(safeUser.gender || "");
  const [about, setAbout] = useState(safeUser.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
const saveProfile = async () => {
  setError("");
  try {
    const requestData = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      age: age ? parseInt(age) : undefined,
      gender: gender || undefined,
      about: about?.trim(),
      profileImage: profileImage?.trim(),
    };

    // Clean undefined/empty values
    const cleanData = Object.fromEntries(
      Object.entries(requestData).filter(([_, v]) => v !== undefined && v !== "")
    );

  
    const res = await axios.patch(
      `${BASE_URL}/profile/edit`,
      cleanData,
      { withCredentials: true }
    );

    if (res.data) {
      dispatch(addUser(res.data.data || res.data));
    }
    
    setShowToast(true);  
    setTimeout(() => setShowToast(false), 3000);
  } catch (err) {
   
    if (err.response?.data) {
      setError(`Server error: ${JSON.stringify(err.response.data)}`);
    } else {
      setError("Failed to update profile. Please try again.");
    }
  }
};

  return (
    <>
      <div className="flex flex-row lg:flex-row items-start justify-center gap-8 w-full max-w-6xl px-4 my-[25px]">
        <div className=" flex flex-row lg:flex-row items-center justify-center gap-8  card bg-base-300 w-[386px] ml-[350px] mr-[-450px] shadow-sm ">
          <div className=" card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2> 

            {/* Error Display */}
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            {/* First Name */}
            <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
              <legend className="text-sm bg-base-200">First Name</legend>
              <input
                type="text"
                value={firstName}
                placeholder="Enter your first name"
                className="input input-bordered w-full bg-base-100 border-2 border-base-300 mt-2 placeholder:text-gray-400"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            {/* Last Name */}
            <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
              <legend className="text-sm bg-base-200">Last Name</legend>
              <input
                type="text"
                value={lastName}
                placeholder="Enter your last name"
                className="input input-bordered w-full bg-base-100 border-2 border-base-300 mt-2 placeholder:text-gray-400"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            {/* About */}
            <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
              <legend className="text-sm bg-base-200">About</legend>
              <input
                type="text"
                value={about}
                placeholder="Enter about you"
                className="input input-bordered w-full bg-base-100 border-2 border-base-300 mt-2 placeholder:text-gray-400"
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>

            {/* Age */}
            <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
              <legend className="text-sm bg-base-200">Age</legend>
              <input
                type="number"
                value={age}
                placeholder="Enter your age"
                className="input input-bordered w-full bg-base-100 border-2 border-base-300 mt-2 placeholder:text-gray-400"
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </fieldset>

            {/* Gender */}
            <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
              <legend className="text-sm bg-base-200">Gender</legend>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full bg-base-100 border-2 border-base-300 mt-2"
              >
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </fieldset>

            {/* Profile Image */}
            <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300  my-4">
              <legend className="text-sm bg-base-200">Photo URL</legend>
              <input
                type="text"
                value={profileImage}
                placeholder="Enter your photo URL"
                className="input input-bordered w-full bg-base-100 border-2 border-base-300 mt-2 placeholder:text-gray-400"
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </fieldset>
            
            <div className="card-actions justify-center">
              {/* FIXED: Remove the parentheses */}
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Display updated user */}
        <UserCard
          user={{
            firstName,
            lastName,
            age,
            about,
            profileImage,
            gender, // Added gender
          }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};     

export default EditProfile;