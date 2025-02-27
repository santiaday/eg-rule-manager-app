import React, { useState, useCallback, useEffect } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { FilePicker } from "react-file-picker";
import Dropzone, { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowDownOutline , IoMdAddCircle } from "react-icons/io5"
import useStyles from "./ruleObjectStyles";
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';
import ApiService from "../../../http-common";

const RuleObject = ({ rule , handleEditRule , handleDownloadRule }) => {


  var JSONPretty = require('react-json-pretty');
  const classes = useStyles();

  const [ruleExpanded , setRuleExpanded] = useState(false);

  const expandRule = () => {
    if(!ruleExpanded){
        setRuleExpanded(true)
    }else{
        setRuleExpanded(false)
    }
  }

const handleDeleteRule = (ruleName) => {
    const formData = new FormData();
    formData.append("ruleName" , ruleName);

    ApiService.deleteRule(formData).then(window.location.reload());
  }


  function clean(object) {
    Object.entries(object).forEach(([k, v]) => {
      if (v && typeof v === "object") {
        clean(v);
      }
      if (
        (v && typeof v === "object" && !Object.keys(v).length) ||
        v === null ||
        v === undefined ||
        v === "" ||
        v === " " ||
        v.length === 0
      ) {
        if (Array.isArray(object)) {
          object.splice(k);
        } else {
          delete object[k];
        }
      }
    });
    return object;
  }

  return (
    <Container style={{ width: "90vw", maxWidth: "85vw"}}>
    <div style={{marginBottom: "25px"}}>

    {!ruleExpanded ? 
    <Typography  onClick={expandRule} variant="h5" style={{userSelect: "none" , cursor: "pointer", width: "800px", fontWeight: "600"}}>Rule - {Object.keys(rule)[0]} <MdOutlineExpandMore style={{width: "20px", transform: "translateY(7px)", marginLeft: "10px"}} className={classes.arrowDown}/></Typography> : 
    <>
    <Typography  onClick={expandRule} variant="h5" style={{userSelect: "none" , cursor: "pointer", width: "800px", fontWeight: "600"}}>Rule - {Object.keys(rule)[0]} <MdOutlineExpandLess style={{width: "20px", transform: "translateY(7px)", marginLeft: "10px"}} className={classes.arrowDown}/></Typography>
    </>
    }
    
    


    {!ruleExpanded ? 
    <></> : 
    <>
    
    <JSONPretty id="json-pretty" data={JSON.stringify(clean(rule))}></JSONPretty>
    <Button className={classes.altButton} onClick={() => handleDownloadRule(Object.keys(rule)[0])}><div style={{ transform: "translateY(2px)" }}>Download</div></Button>
    <Button className={classes.redButton} onClick={() => handleDeleteRule(Object.keys(rule)[0])}><div style={{ transform: "translateY(2px)" }}>Delete</div></Button>
    </>
    }
        
        
        </div>
        </Container>
  )
}

export default RuleObject