import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

export default function SelectedListItem({
  selectedIndex,
}: {
  selectedIndex: number;
}) {
  //const [selectedIndex, setSelectedIndex] = React.useState(1);

  // const handleListItemClick = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   index: number
  // ) => {
  //   setSelectedIndex(index);
  // };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          component="a"
          href="/customers"
          selected={selectedIndex === 0}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton selected={selectedIndex === 2}>
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 3}>
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List>
    </Box>
  );
}
