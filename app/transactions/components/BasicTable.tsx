import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";

import dataSource from "@/hooks/dataSource";

import LinearIndeterminate from "@/app/loading";
import { TransactionDetails } from "@/utils/interfaces";

export default function BasicTable() {
  const { data: session, status } = useSession({
    required: true,
  });

  const token = session?.user.api_token;
  const { getTransactions } = dataSource();

  const [transactions, setTransactionList] = useState<TransactionDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTransactions(token);
        setTransactionList(data);
        console.log(transactions);
      } catch (error) {}
    }
    fetchData();
    setLoading(false);
  }, [token]);

  if (loading) {
    return <LinearIndeterminate />;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name of Customer</TableCell>
            <TableCell align="right">
              <b>Phone Number</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Type Of Transaction</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Amount </b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Customer Address</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Date of Transaction</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Type Of Account</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Account Number</b>&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {transaction.first_name} {transaction.last_name}
              </TableCell>
              <TableCell align="right">{transaction.phone_number} </TableCell>
              <TableCell align="right">
                {transaction.type_of_transaction}{" "}
              </TableCell>
              <TableCell align="right">{transaction.amount}</TableCell>
              <TableCell align="right">{transaction.address}</TableCell>
              <TableCell align="right">
                {transaction.date_of_transaction}
              </TableCell>
              <TableCell align="right">{transaction.type_of_account}</TableCell>
              <TableCell align="right">{transaction.account_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
