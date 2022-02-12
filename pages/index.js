import { Layout } from "../src/components";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const state = useSelector((state) => state.AuthRedu);
  const authData=state?.authData
  const router = useRouter();

  useEffect(() => {
      if (!authData?.status===200) {
        router.push("/login");
        return <h1>Redirecting to Login Page</h1>;
      }
  }, [authData]);
  console.log({authData})
  return <Layout description={"ConnectMe Login"}></Layout>;
};

export default Index;