import { useAuth } from "../security/authContext";
import { useState } from "react";
import { postUser } from "../Utility/api";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const UserDetails = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState();
  const [profileIcon, setProfileIcon] = useState();
  const [skillsLevel, setSkillsLevel] = useState("1");
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    setIsloading(true)
    const postBody = {
      firebase_id: currentUser.uid,
      name: name,
      username: username,
      age: Number(age),
      gender: gender,
      profile_icon: profileIcon,
      skills_level: skillsLevel,
      rating: 1,
      event_id: 90,
    };
    postUser(postBody)
      .then(() => {
        setIsloading(false)
        navigate("/");
      })
      .catch((err) => {
        setIsloading(false)
        setError(err);
      });
  }
  if(isLoading){
    return <Loading />
  }
  return (
    <div className="userdetails">
      {error ? (
        <h3>could not post user details</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Create User</h2>
          <label htmlFor="name">Name:</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            type="text"
            value={name}
            required
          />

          <label htmlFor="username">Username:</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            id="username"
            type="text"
            value={username}
            required
          />
          <label for="age"> Please input your age:</label>
          <input
            onChange={(e) => {
              setAge(e.target.value);
            }}
            type="number"
            id="age"
            name="age"
            value={age}
          />
          <br></br>
          <label>Gender: </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <br></br>
          <label>
            Please select your skills level, 1 Star being Fun/Beginner, 5 Star
            being Serious/Ex Pro:
          </label>

          <select
            value={skillsLevel}
            onChange={(e) => setSkillsLevel(e.target.value)}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5">5 Star</option>
          </select>
          <label htmlFor="profileIcon">Profile Icon Image URL:</label>
          <input
            onChange={(e) => {
              setProfileIcon(e.target.value);
            }}
            id="profileIcon"
            type="text"
            value={profileIcon}
            required
          />
          <button>Add User/Submit</button>
        </form>
      )}
    </div>
  );
};

export default UserDetails;
