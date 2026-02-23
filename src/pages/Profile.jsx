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



// Profile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 🔐 Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          "https://dummy-backend-9ga0.onrender.com/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ backend should send user object
        setUser(res.data.user || res.data);
      } catch (err) {
        console.log("Unauthorized");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const logout = async () => {
    try {
      // optional backend logout
      await axios.post(
        "https://dummy-backend-9ga0.onrender.com/api/user/logout"
      );
    } catch (err) {
      console.log("Logout error");
    }

    // 🧹 clear token
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Profile</h2>

      {user ? (
        <>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;



