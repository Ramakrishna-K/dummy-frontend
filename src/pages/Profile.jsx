import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummy-backend-9ga0.onrender.com/api/user/profile", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/"));
  }, []);

  const logout = async () => {
    await axios.post(
      "https://dummy-backend-9ga0.onrender.com/api/user/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
  };

  return (
    <div>
      <h2>Profile</h2>
      {user && <p>Email: {user.email}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;

