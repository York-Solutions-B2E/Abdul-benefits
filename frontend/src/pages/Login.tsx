import {
  GoogleLogin,
  GoogleOAuthProvider,
  type CredentialResponse,
} from "@react-oauth/google";
// import api from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const navigate = useNavigate();

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    const googleToken = credentialResponse.credential;

    if (!googleToken) {
      console.error("No Google credential found");
      return;
    }

    console.log("Google ID Token: ", googleToken);

    try {
      const res = await axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${googleToken}` },
      });

      console.log("Authenticated user: ", res.data);

      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", googleToken);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Failed: ", error);
    }
  };

  return (
    <div className="bg-red w-screen h-screen flex items-center justify-center ">
      <GoogleOAuthProvider clientId={clientId}>
        <div className="w-2/4 h-1/2 flex items-center justify-center gap-2  shadow-base-300 z-1 space-y-6 rounded-xl shadow-lg  sm:min-w-md bg-green-100 overflow-hidden ">
          <div className="flex flex-col justify-center items-start text bg-white h-full w-1/2 m-0 p-8">
            <h1 className="text-6xl text-gray-700">Hello,</h1>
            <p className="text-6xl text-gray-700">Welcome to</p>
            <p className="text-green-800 text-7xl">Benefits</p>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => console.log("Login Failed")}
            />
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
