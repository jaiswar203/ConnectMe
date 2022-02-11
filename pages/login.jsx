import { Layout, Login } from "../src/components";


const login = () => {
    
    return (
        <Layout title={`${true ? "Login" : "Sign Up"}`}>
            <Login />
        </Layout>
    );
};

export default login;
