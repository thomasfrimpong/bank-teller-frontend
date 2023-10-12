import React from "react";
export interface Account {
  id?: number;
  type_of_account: string;
  customer_id: string;
  account_number?: string;
}

export interface AccountDetails {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  created_at: string;
  address: string;
  account_number: string;
  account_created_at: string;
  type_of_account: string;
  status: number;
}

export interface Customer {
  id?: number;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  email: string;
  created_at?: string;
}

export interface Transaction {
  id?: number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  type_of_account?: string;
  customer_id?: string;
  account_id?: string;
  amount?: number;
  type_of_transaction?: string;
  date_of_transaction?: string;
}

export interface TransactionDetails {
  id: number;
  date_of_transaction: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  amount: string;
  type_of_transaction: string;
  type_of_account: string;
  account_number: string;
}

export interface Admin {
  id?: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  created_at?: string;
}

// export interface Admin {
//   id?: number;
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   email: string;
// }
