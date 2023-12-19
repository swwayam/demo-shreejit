import React from "react";
import styles from "./SignIn.module.css"; // Import CSS module
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert("User not found");
        console.log(err);
      });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={login}>
        {" "}
        {/* Use styles from CSS module */}
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          name="email"
          type="text"
          id="email"
          placeholder="example@gmail.com"
        />
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          name="password"
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <button className={styles.btn}>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
