import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
} from "@material-ui/core";

import SendIcon from "@mui/icons-material/Send";
import LayoutHome from "../layout/LayoutHome";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios"; //pour l'envoie des requetes
import EditIcon from "@mui/icons-material/Edit";
import {
  Paper,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@mui/material";




const useStyles = makeStyles((theme) => ({
  commentNum: {
    borderBottom: "2px solid #484848",
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(12),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(4),
  },
  form: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    width: theme.spacing(90),
    height: theme.spacing(8),
    overflow: "auto",
    display: "block",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid black",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(0),
    marginTop: theme.spacing(0),
    fontSize: "20px",
    outline: 0,
  },
  name: {
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(3),
  },
  topic: {
    width: 150,
  },

  btnSubmit: {
    backgroundColor: "#000000",
    color: "#fff",
    height: "100%",
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(-70),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "20px",
    borderRadius: "30px",
    transition: "transform 0.5s",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#fff",
      transform: "translateY(-5px)",
    },
  },
  btnCancel: {
    backgroundColor: "#000000",
    color: "#fff",
    height: "100%",
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(-25),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "20px",
    borderRadius: "30px",
    transition: "transform 0.5s",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#fff",
      transform: "translateY(-5px)",
    },
  },
  responses: {
    marginLeft: theme.spacing(10),
    width: "100%",
    //backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
    borderRadius: 5,
    //backgroundColor: "rgb(240 , 240 , 240)",
  },
  paper: {
    width: 900,

    marginLeft: theme.spacing(12),
    marginTop: theme.spacing(4),

    borderRadius: "15px",
    borderColor: "text.primary",
  },
  titlerep: {
    fontWeight: "bold",
  },
  Delete: {
    marginRight: theme.spacing(15),
  },

  Edit: {
    marginRight: theme.spacing(13),
  },
}));

const CommentsHome = () => {
  const classes = useStyles();
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [topic, setTopic] = React.useState("");
  const [content, setContent] = React.useState("");
  const [userId, setUserId] = React.useState("");

  const [commentCollection, setCommentCollection] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log("aaa")
    axios
      .get("http://localhost:8080/comments/getcomment")
      .then((res) => {
        setCommentCollection(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isUpdated,content]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios({
        //requete
        method: "POST",
        url: "http://localhost:8080/comments/addcomment",
        data: {
          //donnees de la requete
          topic: topic,
          content: content,
          userId: userId,
        },
      });
     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
     
      //setRole("");
      Swal.fire({
        title: "Your comment has been successfully created !",
        icon: "success",
      });
     
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      });
    }finally {
      setIsUpdated(!isUpdated)
      setContent("");
      setTopic("");
    }
  }

  const handleDeleteComment = (_id) => {
    Swal.fire({
      title: "Do You Realy Want To Delete This Comment ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:8080/comments/deletecomment/${_id}`)
          .then((res) => {
            console.log(res.data);
           // setCommentCollection([res.data]);
            //console.log("c bon deleted");
            setIsUpdated(!isUpdated)
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1100,
            });
    
            Toast.fire({
              icon: "success",
              title: "Comment Deleted Successfully !",
            });
          })
          .catch(function (error) {
            console.log(error);
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1100,
            });
    
            Toast.fire({
              icon: "error",
              title: error.response.data,
            });
          });
        
      }
    });
  };


  console.log(commentCollection)
  return (
    <div style={{ marginTop: "40px", marginLeft: "110px" }}>
      <LayoutHome />
      <Typography variant="h6" className={classes.commentNum}>
        Feel free to leave your feedbacks / comments !
      </Typography>
      <div style={{ display: "flex" }}>
        <Avatar className={classes.large} />
        <Grid item xs={10}>
          <TextField
            name="topic"
            required
            id="topic"
            label="Click here to add a Topic"
            variant="outlined"
            style={{ width: 900 }}
           
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </Grid>
      </div>
      <div>
   
          <React.Fragment>
            <Box
              component="form"
              sx={{ mt: 2 }}
              onSubmit={handleSubmit}
              spacing={5}
            >
              <Grid container spacing={3}>
                <Grid item xs={10} style={{ marginLeft: "80px" }}>
                  <TextField
                    required
                    label="Express your thoughts !"
                    variant="outlined"
                    multiline
                    rows={2.5}
                    style={{ width: 900 }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  sm={3}
                  className={classes.name}
                  style={{ marginLeft: "95px" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                  >
                    <SendIcon />
                    &nbsp;&nbsp; Post It
                  </Button>
                </Grid>
                <Grid item sm={3} style={{ marginLeft: "95px" }}>
                  <Button
                    type="reset"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
              {      commentCollection.length>0 && commentCollection.map((data, i) => (
                
                <React.Fragment >
              
                  <Paper
                    className={classes.paper}
                    style={{ backgroundColor: "#deeaee" }}
                  >
                    <Grid key={i} className={classes.responses}>
                      <ListItem fullwidth>
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <Typography>{data.userId.firstName} {data.userId.lastName}</Typography>
                        <ListItemText
                          primary={
                            <Typography className={classes.titlerep}>
                              {data.topic}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {data.content}
                            </Typography>
                          }
                        />
                        <Button
                          icon
                          className={classes.Delete}
                          onClick={(e) =>
                            handleDeleteComment(data._id).setCommentCollection(
                              data,
                              i
                            )
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      </ListItem>
                    </Grid>
                  </Paper>
                </React.Fragment>
              ))}
            </Box>
          </React.Fragment>
                          
      </div>
    </div>
  );
};

export default CommentsHome;