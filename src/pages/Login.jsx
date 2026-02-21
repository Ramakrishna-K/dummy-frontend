// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();


//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       let data = {};
//       try {
//         data = await response.json();
//       } catch {}

//       if (response.ok) {
//         localStorage.setItem("token", data.token);
//         alert("Login successful");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Server error. Try again later.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleLogin} style={styles.form}>
//         <h2>Login</h2>

//         {error && <p style={styles.error}>{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />
      

//         <button type="submit" style={styles.button}>
//           Login
//         </button>
//            <p style={{ marginTop: "10px", textAlign: "center" }}>
//           I don't have an account?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             style={{ color: "#2196F3", cursor: "pointer" }}
//           >
//             Register
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     background: "#f5f5f5",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "2rem",
//     background: "#fff",
//     borderRadius: "8px",
//     width: "320px",
//     boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
//   },
//   input: {
//     margin: "10px 0",
//     padding: "10px",
//     fontSize: "16px",
//   },
//   button: {
//     padding: "10px",
//     background: "#4CAF50",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//   },
// };

// export default Login;


import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://dummy-backend-9ga0.onrender.com/api/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate("/profile");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Server error. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.text}>
          Don&apos;t have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    background: "#fff",
    borderRadius: "8px",
    width: "320px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
  text: {
    marginTop: "10px",
    textAlign: "center",
  },
  link: {
    color: "#2196F3",
    cursor: "pointer",
  },
};

export default Login;