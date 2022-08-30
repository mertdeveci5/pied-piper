import React, { useContext } from "react";
import { userContext, userDispatchContext } from "../models/user";

const Profile = () => {
  const userDetails = useContext(userContext);
  const setUserDetails = useContext(userDispatchContext);

  return (
    <>
      <h1>{userDetails.walletAddress}</h1>;
    </>
  );
};

export default Profile;
