"use client";
import axios from "axios";
import { Admin, Customer, Account } from "../utils/interfaces";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const dataEntry = () => {
  // const { data: session, status } = useSession();
  // const token = session?.user.api_token;

  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();

  const addCustomer = async (
    { first_name, last_name, phone_number, address, email }: Customer,
    token: any
  ) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/add/customer`,
        { first_name, last_name, phone_number, address, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });

      console.log(response);
      router.push("/customers");
    } catch (error) {
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
      console.log(error);
    }
  };

  const addAccount = async (
    { customer_id, type_of_account }: Account,
    token: any
  ) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/add/account`,
        {
          customer_id,
          type_of_account,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });
      console.log(response);
      router.push("/account");
    } catch (error) {
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
      console.log(error);
      return [];
    }
  };

  const addAdmin = async (
    { first_name, last_name, phone_number, email }: Admin,
    token: any
  ) => {
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/add/admin`,
        {
          first_name,
          last_name,
          phone_number,
          email,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: true,
      });
      console.log(response);
      router.push("/admin");
    } catch (error) {
      setAuthState({
        success: false,
        loading: false,
        error: true,
        showSnackbar: false,
      });
      console.log(error);
      return [];
    }
  };

  const getCustomers = async (token: any) => {
    const response = await axios.get(`${process.env.BASE_URL}/get/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const customersData = response.data as Customer[];

    return customersData;
  };

  return {
    addCustomer,
    addAccount,
    addAdmin,
    getCustomers,
  };
};

export default dataEntry;
