"use client";
import axios from "axios";
import {
  Account,
  AccountDetails,
  Customer,
  Transaction,
  TransactionDetails,
} from "../utils/interfaces";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const dataSource = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const router = useRouter();
  // const { data: session, status } = useSession();
  // const token = session?.user.api_token;

  const getAccounts = async (token: any) => {
    const response = await axios.get(`${process.env.BASE_URL}/get/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const accountsData = response.data as Account[];

    return accountsData;
  };

  const addTransaction = async (
    { customer_id, account_id, amount, type_of_transaction }: Transaction,
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
        `${process.env.BASE_URL}/record/transaction`,
        {
          customer_id,
          account_id,
          amount,
          type_of_transaction,
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
      router.push("/transactions");
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

  const getTransactions = async (token: any) => {
    const response = await axios.get(
      `${process.env.BASE_URL}/transaction/records`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const transactionData = response.data as TransactionDetails[];
    console.log(transactionData);
    return transactionData;
  };

  const getCustomers = async (token: any) => {
    const response = await axios.get(`${process.env.BASE_URL}/get/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const customerData = response.data as Customer[];
    console.log(customerData);
    return customerData;
  };

  const getCustomerAccounts = async (token: any) => {
    const response = await axios.get(
      `${process.env.BASE_URL}/get/customer/accounts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const customerAccountData = response.data as AccountDetails[];
    console.log(customerAccountData);
    return customerAccountData;
  };

  const getWithdrawalSum = async (token: any) => {
    const response = await axios.get(
      `${process.env.BASE_URL}/withdrawal/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data as number;
  };

  const getDepositSum = async (token: any) => {
    const response = await axios.get(
      `${process.env.BASE_URL}/deposit/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data as number;
  };

  const currentDate = () => {
    // Date object
    const date = new Date();

    const currentDay = String(date.getDate()).padStart(2, "0");

    const currentMonth = String(date.getMonth() + 1).padStart(2, "0");

    const currentYear = date.getFullYear();

    // we will display the date as DD-MM-YYYY

    const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    const new_date = new Date().toUTCString().slice(5, 16);

    return new_date;
  };

  return {
    getAccounts,
    addTransaction,
    currentDate,
    getTransactions,
    getCustomers,
    getCustomerAccounts,
    getWithdrawalSum,
    getDepositSum,
  };
};
export default dataSource;
