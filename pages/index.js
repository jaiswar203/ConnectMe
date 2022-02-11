import { Layout } from "../src/components";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const { authData } = useSelector((state) => state.AuthRedu);
  const router = useRouter();

  useEffect(() => {
    if (!authData) {
      router.push("/login");
      return <h1>Redirecting to Login Page</h1>;
    }
  }, [authData]);
  return <Layout description={"ConnectMe Login"}></Layout>;
};

export default Index;