// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("https://dummy-backend-9ga0.onrender.com/api/user/profile", {
//         withCredentials: true,
//       })
//       .then((res) => setUser(res.data.user))
//       .catch(() => navigate("/"));
//   }, []);

//   const logout = async () => {
//     await axios.post(
//       "https://dummy-backend-9ga0.onrender.com/api/user/logout",
//       {},
//       { withCredentials: true }
//     );
//     navigate("/login");
//   };

//   return (
//     <div>
//       <h2>Profile</h2>
//       {user && <p>Email: {user.email}</p>}
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

// export default Profile;


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔐 If token missing → force login
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://dummy-backend-9ga0.onrender.com/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const logout = () => {
    // 🔓 Clear token
    localStorage.removeItem("token");
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
