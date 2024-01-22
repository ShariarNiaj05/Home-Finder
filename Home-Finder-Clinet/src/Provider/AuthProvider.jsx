import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    

    
  const createUser = async (newUser, email) => {
    return await axiosPublic.put("/new-user", newUser).then((res) => {
      setLoading(true);
      if (res.data.insertedId) {
        // console.log(res);
        if (res.data.insertedId) {
          axiosSecure.post("/access-token", email).then((res) => {
            if (res.data.success) {
              setUser(newUser);
              console.log(user);
              console.log("user created successfully");
            }
          });
        }
        setLoading(false);
      } else {
        console.log(res.data.message);
        setLoading(false);
      }
    });
  };

 

  const authInfo = {
    user,
    loading,
    createUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
