import React, { forwardRef, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Tooltip } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Typography from "@material-ui/core/Typography";
import { BsFillFileEarmarkWordFill } from "react-icons/bs";
//import DashboardHome from "../home/DashboardHome";
//const useStyles = makeStyles((theme) => ({}));
const ComponentToPrint = forwardRef((props, ref) => {
  return <div ref={ref}></div>;
});

export default function Print() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = [""];

  const ref = useRef();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
     
      <ReactToPrint content={() => ref.current}>
        <PrintContextConsumer>
          {({ handlePrint }) => (
            <>
              <IconButton
                aria-label=""
                color="inherit"
                //className={classes.notification}
              >
                <NotificationsIcon />
              </IconButton>

              <IconButton
                onClick={handlePrint}
                aria-label=""
                color="inherit"
                display="flex"
              >
                <PrintIcon />
              </IconButton>
              <Tooltip title="Share">
                <IconButton
                  aria-label=""
                  color="inherit"
                  //className={classes.share}
                >
                  <IosShareIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download ">
                <IconButton
                  onClick={handleOpenUserMenu}
                  color="inherit"
                  //className={classes.download}
                >
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "60px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  //horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  //horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting,index) => (
                  //<Stack spacing={2} direction="column">
                  <div>
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <MenuItem color="inherit">
                        <Typography>
                          <PictureAsPdfIcon size={30} /> PDF
                        </Typography>
                      </MenuItem>
                    </MenuItem>
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <MenuItem color="inherit">
                        <Typography>
                          <BsFillFileEarmarkWordFill size={20} /> WORD
                        </Typography>
                      </MenuItem>
                    </MenuItem>
                  </div>
                ))}
              </Menu>
            </>
          )}
        </PrintContextConsumer>
      </ReactToPrint>
      <ComponentToPrint ref={ref} />
    </div>
  );
}
