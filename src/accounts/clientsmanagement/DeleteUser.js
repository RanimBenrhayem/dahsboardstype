import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

export default function DeleteUser() {
  const [usersCollection, setUsersCollection] = React.useState([]);

  React.useEffect(() => {
    axios
      .post("http://localhost:5000/user/deleteuser/:id")
      .then((res) => {
        setUsersCollection(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <React.Fragment>
      <Tooltip title="Delete">
        <Button
          color="error"
          onClick={() => setUsersCollection()}
          startIcon={<DeleteIcon />}
        />
      </Tooltip>
    </React.Fragment>
  );
}
