import { Layout } from "../src/components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createProfile } from "../redux/action/Profile";
import { demoProfile } from "../src/db/demo";
import { getUserById } from "../redux/action/Auth";
// import { getUserById } from "../api";

const Index = () => {
  const state = useSelector((state) => state);
  const authData = state?.AuthRedu?.authData;
  const dispatch = useDispatch();
  const router = useRouter();
  const { generateprofile } = router.query;

  useEffect(async () => {
    if (generateprofile && authData !== null) {
      const data = JSON.parse(localStorage.getItem("UserAuth"));
      dispatch(
        createProfile({
          ...demoProfile,
          createdBy: data?.existingUser?._id,
        })
      );
      setTimeout(() => {
        dispatch(getUserById(data?.existingUser?._id))
      }, 3000);
    }
  }, [dispatch]);
  console.log({state})
  useEffect(() => {
    if (authData === null) {
      router.push("/login");
    }
  }, [authData]);
  
  return (
    <Layout description={"ConnectMe Login"}>
      {!authData && <h1>Redirecting to Login Page</h1>}
    </Layout>
  );
};

export default Index;
