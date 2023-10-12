import { Admin } from "@/utils/interfaces";
import axios from "axios";
const useAuth = () => {
  const logIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("i am here...");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log(response);
      return response.data as Admin[];
    } catch (error) {}
  };

  return {
    logIn,
  };
};

export default useAuth;
