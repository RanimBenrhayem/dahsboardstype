import React from "react";
import FileUploader from "../uploadfiles/UploadFiles";
import SideBar from "../layout/SideBar";
import "../../styles/Home.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Box from "@mui/material/Box";

import Typography from "@material-ui/core/Typography";

import LayoutHome from "../layout/LayoutHome";
import { Translate } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  typography1: {
    color: "grey",
  },
  typography2: {
    color: "grey",
    marginTop: 30,
  },
  dropezone: {
    color: "grey",
    marginTop: 20,
    marginLeft: 15,
    width: 1200,
  },
  iconarrow: {
    fontSize: "inherit",
    marginBottom: -6.25,
    
   
    
  },
  title: {
    margin: theme.spacing(-14, 37),
  },

  contenu: {
    margin: theme.spacing(3.5, 12),
  },
}));
export default function DashboardHome() {
  const classes = useStyles();

  return (

    <div className={classes.contenu}>
            <SideBar />
            <img  className="logoBranper" src="Logo.png"/>
      <Box>
        <LayoutHome />
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.typography1}

        >
        <div className="description">   <ArrowRightIcon className={classes.iconarrow} />
         File Uploader : <div>You can add your csv files in the box below .<br/>   Only csv files .. all other types will be rejected</div> </div> 
                        
        </Typography>
      </Box>
      <div className={classes.dropezone}>
        <FileUploader />
      </div>
      {/* <Box>
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.typography2}
        >
          Dashboard <ArrowRightIcon className={classes.iconarrow} />
          Reports
        </Typography>
      </Box> */}
    </div>
  );
}
