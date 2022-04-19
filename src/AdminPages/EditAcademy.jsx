// import React, { Component } from 'react';
import "./EditAcademy.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { padding } from "@mui/system";
import Add from "@mui/icons-material/Add";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import { getListSubheaderUtilityClass } from "@mui/material";

function EditAcademy(value1) {
  const [data, setData] = useState([{}]);
  const [nirf, setNirf] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobile] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [ins_des, setIns_des] = useState("");
  const location = useLocation();
  console.log(location.state.currentid.ins_id);
  var ins_id = location.state.currentid.ins_id;
  const [in_id, setIns_id] = useState(ins_id);
  console.log("ins_id :" + ins_id);
  // const { state } = value1.location;
  // const { currentid } = value1.match.state;
  // console.log("id passed on edit acadmy value is :");
  // console.log(props);
  useEffect(() => {
    var ins_id = location.state.currentid.ins_id;
    console.log("ins_id inside useeffecet:" + ins_id);
    getInstitute(ins_id);
  }, []);

  function getInstitute(ins_id) {
    console.log("ins_id inside getintitute :" + ins_id);
    fetch(`http://localhost:8080/admin/viewInstitute/${ins_id}`)
      .then((response) => response.json())
      .then((p) => {
        setData((prev) => [p]);
        console.log(p);
      });
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      ins_des,
      state,
      city,
      email,
      mobileNumber,
      nirf,
    };
    console.log(user);
    if (name && ins_des && state && city && email && mobileNumber && nirf) {
      fetch(value1.value1 + `admin/editInstitute/${in_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then(() => {
        window.location.href = "/admin/ViewInstitute";
      });
    } else {
      alert("No empty filled allowed");
    }
  };

  return (
    <div>
      <Header />

      {data.map((datas) => (
        <div className="enroll_form_container">
          <div className="enroll_form_container-below">
            <input
              required
              type="text"
              className="row1"
              name="academyName"
              defaultValue={datas.instituteName}
              // onChange={(e) => {
              //   var letter = /^[a-zA-Z]*$/;
              //   let value;
              //   if (!e.target.value.match(letter)) {
              //     value = "";
              //   }
              //   setName(value);
              // }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Academy name"
              id="academyName"
            ></input>

            <input
              required
              type="text"
              defaultValue={datas.instituteMobile}
              onChange={(e) => {
                var num = /[^0-9]/gi;
                let value = e.target.value.replace(num, "");
                setMobile(value);
              }}
              className="row1"
              placeholder="Enter the contact number"
              id="contactNumber"
            ></input>

            <input
              required
              type="text"
              className="row1"
              defaultValue={datas.instituteCity}
              // onChange={(e) => {
              //   var letter = /^[a-zA-Z]*$/;
              //   let value;
              //   if (!e.target.value.match(letter)) {
              //     value = "";
              //   }
              //   setCity(value);
              // }}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              placeholder="Enter Insititute City"
              id="imageUrl"
            ></input>

            <input
              required
              type="email"
              defaultValue={datas.instituteEmail}
              // onChange={(e) => {
              //   var letter = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
              //   let value;
              //   if (!e.target.value.match(letter)) {
              //     value = "";
              //   }
              //   setEmail(value);
              // }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="row1"
              placeholder="Enter the academy email"
              id="emailId"
            ></input>

            <input
              required
              type="text"
              className="row1"
              defaultValue={datas.instituteState}
              // onChange={(e) => {
              //   var letter = /^[a-zA-Z]*$/;
              //   let value;
              //   if (!e.target.value.match(letter)) {
              //     value = "";
              //   }
              //   setState(value);
              // }}
              onChange={(e) => {
                setState(e.target.value);
              }}
              placeholder="Enter academy State"
              id="academyLocation"
            ></input>

            <textarea
              required
              className="row1"
              defaultValue={datas.instituteDescription}
              placeholder="Enter academy description"
              id="academyDescription"
              onChange={(e) => {
                setIns_des(e.target.value);
              }}
            ></textarea>
            <input
              required
              type="text"
              defaultValue={datas.nirfRank}
              onChange={(e) => {
                var num = /[^0-9]/gi;
                let value = e.target.value.replace(num, "");
                setNirf(value);
              }}
              className="row1"
              placeholder="Enter nirf rank"
              id="nirf"
            ></input>

            <div className="row1">
              <Button
                variant="contained"
                style={{ margin: "5px" }}
                startIcon={<Add />}
                color="primary"
                onClick={handleOnSubmit}
              >
                EditAcademy Academy{" "}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EditAcademy;
