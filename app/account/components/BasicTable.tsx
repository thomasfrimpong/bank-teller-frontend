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
import { AccountDetails, Customer } from "@/utils/interfaces";

export default function BasicTable() {
  const { getCustomerAccounts } = dataSource();
  const { data: session, status } = useSession();
  console.log(session);
  const token = session?.user.api_token;

  const [customersAccounts, setCustomersAccounts] = useState<AccountDetails[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCustomerAccounts(token);
        setCustomersAccounts(data);
        console.log(customersAccounts);
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
              <b>Address</b>&nbsp;
            </TableCell>

            <TableCell align="right">
              <b>Email</b>&nbsp;
            </TableCell>
            <TableCell>
              <b>Type Of Account</b>&nbsp;
            </TableCell>
            <TableCell>
              <b>Account Number</b>&nbsp;
            </TableCell>
            <TableCell>
              <b>Date Created</b>&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customersAccounts.map((account) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={account.id}
            >
              <TableCell component="th" scope="row">
                {account.first_name} {account.last_name}
              </TableCell>
              <TableCell align="right">{account.phone_number} </TableCell>
              <TableCell align="right">{account.address}</TableCell>
              <TableCell align="right">{account.email}</TableCell>
              <TableCell align="right">{account.type_of_account}</TableCell>
              <TableCell align="right">{account.account_number}</TableCell>
              <TableCell>{account.account_created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
