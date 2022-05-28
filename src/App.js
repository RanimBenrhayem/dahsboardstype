import React from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./accounts/container/Container";
import CsvUploader from "./accounts/home/CsvUploader";
import WarningHome from "./accounts/warning/WarninhHome";
import RecomHome from "./accounts/recommendation/RecomHome";
import UsersHome from "./accounts/clientsmanagement/UsersHome";
import UserSimpleFiles from "./accounts/uploadedFilesList/UserSimpleFiles";
import CommentsHome from "./accounts/comments/CommentsHome";
import  Dashboard from "./accounts/dahsboard/Dashboard";
import  UserJoinedFiles from "./accounts/uploadedFilesList/UserJoinedFiles";
import JoinProcess from "./accounts/uploadedFilesList/JoinProcess";
import Profil from "./accounts/profil/Profil"
import Password from "./accounts/password/Password"
import DashbaordsList from "./accounts/dahsboard/DashboardsList"



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/CsvUploader" element={<CsvUploader/>}></Route>
          <Route exact path="/" element={<Container />}></Route>
          <Route exact path="/Warning" element={<WarningHome />}></Route>
          <Route exact path="/Recommendation" element={<RecomHome />}></Route>
          <Route exact path="/Users" element={<UsersHome />}></Route>
          <Route exact path="/UploadedSimpleFilesList" element={<UserSimpleFiles/>}></Route>
          <Route exact path="/Comments" element={<CommentsHome />}></Route>
          <Route exact path="/Dashboard" element={<Dashboard/>}></Route>
          {/* <Route exact path="/UploadedJoinedFilesList" element={<UserJoinedFiles/>}></Route> */}
          <Route exact path="/JoinedFilesList" element={<UserJoinedFiles/>}></Route>
          <Route exact path="/JoinProcess" element={<JoinProcess/>}></Route>
          <Route exact path="/YourProfil" element={<Profil/>}></Route>
          <Route exact path="/Password" element={<Password/>}></Route>
          <Route exact path="/DashboardsList" element={<DashbaordsList/>}></Route>

        </Routes>




      </Router>
    </div>
  );
}

export default App;
