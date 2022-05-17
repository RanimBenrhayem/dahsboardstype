import React, { useState } from "react";
import { ListItem, ListItemIcon, List } from "@material-ui/core";
import Warning from "@material-ui/icons/Warning";
import RecommendIcon from "@mui/icons-material/Recommend";
import Dashboard from "@material-ui/icons/Dashboard";
import Logout from "./Logout";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import GridViewIcon from "@mui/icons-material/GridView";
import CommentIcon from "@mui/icons-material/Comment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { AiFillHome,AiOutlineCloudDownload ,AiFillFileText,AiOutlineLink,AiOutlineAreaChart,AiOutlineUnorderedList,AiOutlineFileAdd } from "react-icons/ai"
import { BsFillFileEarmarkArrowDownFill,BsFiles } from "react-icons/bs";
import {CgProfile} from "react-icons/cg"
import DraftsIcon from "@mui/icons-material/Drafts";
import { color } from "@mui/system";
import PasswordIcon from '@mui/icons-material/Password';


export default function Menu2() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);}

    const handleClick3 = () => {
      setOpen3(!open3);}
  return (
    <React.Fragment>
   
      <List>
        <ListItem
          button // component={Link} to={"/Dashboard"}
          onClick={handleClick}
        >
          <ListItemIcon>
            <AiFillHome className="icons_main" />
          </ListItemIcon>
          <Typography   title="Main Home"> Main Home</Typography>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
        

        
          <ListItem
          button // component={Link} to={"/Dashboard"}
          onClick={handleClick3}
        >
          <ListItemIcon>
            <AiOutlineFileAdd className="iconsList" style={{color : '#1BAEF3'}} />
          </ListItemIcon>
          <Typography  title="File Uploader" > File Uploader</Typography>
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

          <ListItem 
          button   title="File list"sx={{ pl: 6 }} style={{ marginLeft: 13 }}  component={Link}
              to={"/CsvUploader"}>
                 
              <ListItemIcon>
                <BsFillFileEarmarkArrowDownFill  className="icons"/>
              </ListItemIcon>
              <Typography  title="Simple Files"> Simple Files</Typography>
              </ListItem>

              <ListItem
              button
            
              sx={{ pl: 6 }}
              style={{ marginLeft: 13 }}
              component={Link}

              to={"/JoinProcess"}
            >
              <ListItemIcon>
                <BsFiles className="icons" />
              </ListItemIcon>
              <Typography title="Join Files"> Join Files</Typography>
            </ListItem>

  </List>
  </Collapse>

            {/* <ListItem button   title="File list"sx={{ pl: 6 }} style={{ marginLeft: 13 }}  component={Link}
              to={"/UploadedFilesList"}>
              <ListItemIcon>
                <UploadFileIcon />
              </ListItemIcon>
              <Typography> Your Files Lists</Typography>

              </ListItem> */}
              <ListItem
          button // component={Link} to={"/Dashboard"}
          onClick={handleClick2}
        >
          <ListItemIcon>
             <AiOutlineUnorderedList className="iconsList"  style={{color : '#1BAEF3'}}/> 
          </ListItemIcon>
          <Typography title="Files Lists"> Files Lists</Typography>
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
       
              <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItem button   title="File list"sx={{ pl: 6 }} style={{ marginLeft: 13 }}  component={Link}
              to={"/UploadedSimpleFilesList"}>
                 
              <ListItemIcon>
                <AiFillFileText className = "icons" />
              </ListItemIcon>
              <Typography title="simple files lists"> Your simple files</Typography>
              </ListItem>
              <ListItem button   title="File list"sx={{ pl: 6 }} style={{ marginLeft: 13 }}  component={Link}
              to={"/JoinedFilesList"}>
                 
              <ListItemIcon>
                <AiOutlineLink className="icons" />
              </ListItemIcon>
              <Typography title="Joined files lists"> Your joined files</Typography>
              </ListItem>
             




              
            </List>
        </Collapse>


            <ListItem button  title="Dashboard" sx={{ pl: 6 }} style={{ marginLeft: 13 }}  component={Link}
              to={"/Dashboard"}>
              <ListItemIcon>
                <AiOutlineAreaChart className="icons"  style={{color : '#1BAEF3'}}/>
              </ListItemIcon>
              <Typography title="Dashboard"> Dashboard</Typography>
            </ListItem>


          </List>
        </Collapse>

        <ListItem button component={Link} to={"/Warning"}>
          <ListItemIcon>
            <Warning />
          </ListItemIcon>
          <Typography title="Warning"> Warning</Typography>
        </ListItem>

        <ListItem button component={Link} to={"/Recommendation"}>
          <ListItemIcon>
            <RecommendIcon />
          </ListItemIcon>
          <Typography title="recommandation">Recommendation</Typography>
        </ListItem>
        <ListItem button component={Link} to={"/Users"}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Typography title="Users"> Users</Typography>
        </ListItem>
        <ListItem button component={Link} to={"/Comments"}>
          <ListItemIcon>
            <AddCommentIcon />
          </ListItemIcon>
          <Typography title="Feedbacks"> Feedbacks</Typography>
        </ListItem>
      </List>
     <hr />
      <ListItem button   component={Link} to={"/YourProfil"}>
          <ListItemIcon>
            <CgProfile className="icons_main" style={{color : '#15BB83'}} />
          </ListItemIcon>
          <Typography title="Your Profil"> Your Profil</Typography>
        </ListItem>
        <ListItem button   component={Link} to={"/Password"}>
          <ListItemIcon>
            <PasswordIcon className="icons_main" />
          </ListItemIcon>
          <Typography title="password"> Edit password</Typography>
        </ListItem>
    
   
      <Logout />
    </React.Fragment>
  );
}
