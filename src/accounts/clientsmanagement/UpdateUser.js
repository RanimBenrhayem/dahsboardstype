import * as React from "react";
export default function UpdateUser() {
  return (
    <React.Fragment>
      <Button
        color="info"
        //onClick={handleEditClick}
        startIcon={<EditIcon />}
      />
    </React.Fragment>
  );
}
