import { Layout } from "../src/components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createProfile } from "../redux/action/Profile";
import { demoProfile } from "../src/db/demo";
import { getUserById } from "../redux/action/Auth";
import Link from "next/link";
import { motion } from "framer-motion";

import PopupModal from "../src/components/modal/Popup";

const Index = () => {
  const state = useSelector((state) => state);
  const authData = state?.AuthRedu?.authData;
  const dispatch = useDispatch();
  const router = useRouter();
  const { generateprofile } = router.query;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserAuth"));
    if (state?.profileReducer?.profile) {
      dispatch(getUserById(data?.existingUser?._id));
      router.push(`/edit/${data?.existingUser?.username}`);
    }
  }, [state]);

  useEffect(() => {
    if (generateprofile && authData !== null) {
      const data = JSON.parse(localStorage.getItem("UserAuth"));

      dispatch(
        createProfile({
          ...demoProfile,
          createdBy: data?.existingUser?._id,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (authData === null) {
      router.push("/login");
    }
  }, [authData]);

  const createUserProfile = () => {
    const data = JSON.parse(localStorage.getItem("UserAuth"));

    dispatch(
      createProfile({
        ...demoProfile,
        createdBy: data?.existingUser?._id,
      })
    );
    dispatch(getUserById(data?._id));
  };

  const newData = authData !== undefined && authData?.existingUser;
  console.log({ newData });
  return (
    <Layout description={"ConnectMe Login"}>
      {!authData && (
        <PopupModal
          success={false}
          message={"Redirecting to Login Page,Please Wait"}
          title={"Not Authenticated"}
        />
      )}
      {authData && (
        <div className="connectme__home">
          {!newData.profile ? (
            <motion.div
              className="connectme__home-profile"
              whileTap={{ scale: 1.1 }}
              onClick={createUserProfile}
            >
              <h3>Create Profile</h3>
            </motion.div>
          ) : (
            <Link passHref href={`/${newData.username}`}>
              <motion.div
                className="connectme__home-profile"
                whileTap={{ scale: 1.1 }}
              >
                <h3>Get To Profile</h3>
              </motion.div>
            </Link>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Index;
