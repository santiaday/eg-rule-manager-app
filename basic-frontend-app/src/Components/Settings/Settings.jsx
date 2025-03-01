import React, { useState, useCallback, useEffect } from "react";
import useStyles from "./settingsStyles";
import {
  Container,
  FormControl,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { FilePicker } from "react-file-picker";
import Dropzone, { useDropzone } from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import SettingsPopup from "./SettingsPopup/SettingsPopup";

const Settings = ({
  settings,
  setSettings,
  originFile,
  targetFile,
  multipleFileOutput,
  setOriginFile,
  setTargetFile,
  setMultipleFileOutput,
  files,
  firstRender,
  setFirstRender,
}) => {
  const navigate = useNavigate();

  const [isPopup, setIsPopup] = useState(0);

  const handleNavigate = () => {};

  const handlePopup = () => {
    if (
      JSON.stringify(originFile) != JSON.stringify(settings[0].originFile) ||
      JSON.stringify(targetFile) != JSON.stringify(settings[1].targetFile) ||
      multipleFileOutput != settings[2].multipleFileOutput
    ) {
      setIsPopup(1);
    } else {
      setIsPopup(0)
      navigate("/", {
        state: {
          settings: settings,
          originFile: originFile,
          targetFile: targetFile,
          multipleFileOutput: multipleFileOutput,
        },
      });
    }
  };

  const classes = useStyles();
  useEffect(() => {
    if (originFile == "") {
      setOriginFile([".xlsx", ".xls"]);
    }

    if (targetFile === "") {
      setTargetFile(".json");
    }

    if (multipleFileOutput === "") {
      setMultipleFileOutput("0");
    }
  }, []);

  // useEffect(() => {
  //   setSettings([{originFile: originFile},
  //     {targetFile: targetFile},
  //     {multipleFileOutput: multipleFileOutput}])

  //     console.log("SETTINGS RERENDERED")

  // }, [originFile, targetFile, multipleFileOutput])

  return (
    <Container style={{ width: "90vw", maxWidth: "85vw" }}>
      <div className={classes.toolbar} />
      <FormControl variant="outlined" fullwidth>
        <Typography className={classes.title} variant="h2">
          Settings
        </Typography>
        <br />
        <br />
        <Typography className={classes.subtitle} variant="h4">
          Original File Format{" "}
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={originFile}
          onChange={(e) => {
            setOriginFile(e.target.value.split(","));
          }}
        >
          <MenuItem value={".xlsx,.xls"}>.xlsx/.xls</MenuItem>
          <MenuItem value={".json"}>.json</MenuItem>
        </Select>
        <FormHelperText style={{ marginLeft: "0" }}>
          Default: .xlsx/.xls
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl variant="outlined" fullwidth>
        <Typography className={classes.subtitle} variant="h4">
          Target File Format{" "}
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={targetFile}
          onChange={(e) => {
            {
              setTargetFile(e.target.value);
            }
          }}
        >
          <MenuItem value={".xlsx,.xls"}>.xlsx/.xls</MenuItem>
          <MenuItem value={".json"}>.json</MenuItem>
        </Select>
        <FormHelperText style={{ marginLeft: "0" }}>
          Default: .json
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl variant="outlined" fullwidth>
        <Typography className={classes.subtitle} variant="h4">
          Create JSON File For Every Row?{" "}
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={multipleFileOutput}
          onChange={(e) => {
            {
              setMultipleFileOutput(e.target.value);
            }
          }}
        >
          <MenuItem value={"0"}>No</MenuItem>
          <MenuItem value={"1"}>Yes</MenuItem>
        </Select>
        <FormHelperText style={{ marginLeft: "0" }}>Default: No</FormHelperText>
      </FormControl>
      <br />
      <br />
      <br />
      {isPopup ? (
        <SettingsPopup
          setSettings={setSettings}
          settings={settings}
          originFile={originFile}
          targetFile={targetFile}
          multipleFileOutput={multipleFileOutput}
          setOriginFile={setOriginFile}
          setTargetFile={setTargetFile}
          setMultipleFileOutput={setMultipleFileOutput}
          setIsPopup={setIsPopup}
        />
      ) : (
        <div className={classes.link} style={{ marginLeft: "0" }}>
          <Typography
            variant="h4"
            style={{ width: "15%" }}
            onClick={handlePopup}
          >
            Back
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default Settings;
