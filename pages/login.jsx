import { Layout, Login } from "../src/components";
import { useSession } from "next-auth/react";

const login = () => {
    const session=useSession()
    return (
        <Layout title={`${session?.data!==null ? "Login" : "Sign Up"}`}>
            <Login />
        </Layout>
    );
};

export default login;
