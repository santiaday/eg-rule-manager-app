import React, { useState, useCallback, useEffect } from "react";
import useStyles from "./downloadRulesPopupStyles";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  FormControl,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";
import "./styles.css";
import { BsArrowRight } from "react-icons/bs";
import Divider from '@mui/material/Divider';
import { AiFillCloseCircle } from "react-icons/ai";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

const ConfirmUpdatePopup = ({ handleDownloadAllRules , setDownloadRulesPopup }) => {

  var JSONPretty = require('react-json-pretty');
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  function intersperse(arr, sep) {
    if (arr.length === 0) {
      return [];
    }

    return arr.slice(1).reduce(
      function(xs, x, i) {
        return xs.concat([sep, x]);
      },
      [arr[0]]
    );
  }

  const classes = useStyles();

  return (
    <Container style={{ width: "90vw", maxWidth: "85vw" }}>
      <div className={classes.toolbar} style={{ marginBottom: "30px" }} />
      <div className="popup-box">
        <div className="box">
        <AiFillCloseCircle onClick={() => setDownloadRulesPopup(0)} style={{float: "right", cursor: "pointer"}}/>
        <br className={"unselectable"} />
          <Typography variant="h3" style={{ marginBottom: "25px" }}>
            Rule Download Format
          </Typography>

          <Typography variant="h5" style={{fontWeight: "600"}}>
            Would you like to compile all rules in storage into one .json file or download a ZIP folder with separate .json files for each rule?
          </Typography>
          <br className={"unselectable"} />
          <br className={"unselectable"} />

          {/* <Button className={classes.button} onClick={() => handleDownloadAllRules(0)}>
            <span style={{ transform: "translateY(2px)" }}>Single .json</span>
          </Button>
          <Button className={classes.altButton} onClick={() => handleDownloadAllRules(1)}>
            <span style={{ transform: "translateY(2px)" }}>Multiple .json</span>
          </Button> */}

          <DropdownButton  drop="down" id="dropdown-button-drop-down" title="IMPORT" style={{ transform: "translate(-15px , -45px)" , minWidth: "200px", marginLeft: "20px", marginTop: "30px"}}>
            <Dropdown.Item as="button" onClick={() => handleDownloadAllRules(0)} value={1}>Single .json</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleDownloadAllRules(1)} value={2}>Multiple .json</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </Container>
  );
}

export default ConfirmUpdatePopup;
