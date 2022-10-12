import { Box, Grid, TextField, Typography, styled } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import Notification from "../Notifications/Notification";
import ConfirmDialog from "../../Features/Notifications/ConfirmDialog";

import { Container, Modal, Snackbar } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
} from "@material-ui/pickers";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TableBody from "@material-ui/core/TableBody";
import Notification from "../Notifications/Notification";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../Config/config";
import { TableContainer } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Button from "@material-ui/core/Button";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 20px) scale(1);",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "black",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
      // height: '1rem'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container1: {
    border: "none",
    borderRadius: 15,
    width: 380,
    height: 250,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  Accesslistcontainer: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "200px",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "120px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "50px",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "0px",
    },
  },

  texttablecell: {
    overflowX: "hidden",
    whiteSpace: "nowrap",
    // width: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      overflow: "visible",
    },
  },

  table: {
    // minWidth: 150,
    width: "90%",
    height: "10%",
    border: "1px black",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
  rootc: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  root: {
    padding: "0px 16px",
  },

  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    height: 10,
  },
}))(TableRow);

const useStylestable = makeStyles((theme) => ({
  table: {
    minWidth: 100,
    // width:10,
    width: "98%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  },
}));

export default function Rules(props) {
  // console.log(props.location.data.obj, 'rules ')
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [rules, setRules] = useState()
  const {
    details,
    createFeature,
    preview,
    editpreview,
    editPreviewdetails,
    headerValue,
    project_version,
    DropDownValues,
    lable,
  } = useSelector((state) => state.dashboardReducer);
  const textinput = `CREATE OR REPLACE PROCEDURE "BILLING"."P_ADDARRECEIPTDETAILS_BKP_TEMP" (V_LOCATIONID IN billing.PATIENTBILL.LOCATIONID%TYPE,
    V_DATE IN billing.TRANSACTION.TRANDATE%TYPE) AS
    
      OP_TOTALCIT_ONC     NUMBER;
      REG_TOTALCIT_ONC    NUMBER;
      IP_TOTALCC_ONC     NUMBER;
      OP_TOTALCC_ONC     NUMBER;
      REG_TOTALCC_ONC    NUMBER;
    
     iv_locationid varchar2(100);
    iv_paymentmethod  varchar2(200);
    iv_receiptdesc varchar2(200);
    iv_activityname varchar2(200);
    iv_receiptnumber varchar2(100);
    iv_paymentmode varchar2(100);
    BEGIN
    --DELETE FROM XXAPOLLO_AR_MISC_REC_HDR_STG;
    --DELETE FROM XXAPOLLO_AR_MISC_REC_DIST_STG;
      COMMIT;
        SELECT FLC.LOCATIONCODExsxdsds
        INTO V_LOCATIONCODE
        FROM billing.FINANCELOCATIONCODE FLC
       WHERE FLC.LOCATIONID = V_LOCATIONID;
      SELECT SUBSTR(EXTRACT(YEAR FROM V_DATE), -2) INTO IV_YEAR FROM DUAL;
      /*SELECT TO_CHAR(V_DATE, 'MON-YY') INTO V_MONTH FROM DUAL;
      SELECT TO_CHAR(V_DATE, 'MM') INTO IV_MONTH FROM DUAL;*/
      SELECT TO_CHAR(V_DATE, 'DD') INTO IV_DAY FROM DUAL;
    ----SELECT EXTRACT(DAY FROM V_DATE) INTO IV_DAY FROM DUAL;
      SELECT FLC.LOCATIONCODE
        INTO V_LOCATIONCODE
        FROM billing.FINANCELOCATIONCODE FLC
       WHERE FLC.LOCATIONID = V_LOCATIONID;
         IF v_customerid <> 0 THEN
        SELECT nvl(ag.currencycode, 'INR')
          INTO v_fxcode
          FROM crm.agreements ag
         WHERE ag.agreementid = v_agreementid;
               IF v_customerid <> 0 THEN
        SELECT nvl(ag.currencycode, 'INR')
          INTO v_fxcode
          FROM crm.agreements ag
         WHERE ag.agreementid = v_agreementid;
      END IF;
          SELECT nvl(ag.currencycode, 'INR')
          INTO v_fxcode
          FROM crm.agreements ag
         WHERE ag.agreementid = v_agreementid;
      END IF;
    
    
    END P_ADDARRECEIPTDETAILS_BKP_TEMP;`;

  const textoutput = `
     
    CREATE OR REPLACE PROCEDURE "BILLING"."P_ADDARRECEIPTDETAILS_BKP_TEMP" (V_LOCATIONID IN billing.PATIENTBILL.LOCATIONID%TYPE,V_DATE IN billing.TRANSACTION.TRANDATE%TYPE) AS  OP_TOTALCIT_ONC     NUMBER;
    REG_TOTALCIT_ONC    NUMBER;
    IP_TOTALCC_ONC     NUMBER;
    OP_TOTALCC_ONC     NUMBER;
    REG_TOTALCC_ONC    NUMBER;
   iv_locationid varchar2(100);
      iv_paymentmethod  varchar2(200);
      iv_receiptdesc varchar2(200);
      iv_activityname varchar2(200);
      iv_receiptnumber varchar2(100);
      iv_paymentmode varchar2(100);
      BEGIN    
      COMMIT;
          SELECT FLC.LOCATIONCODExsxdsds    INTO V_LOCATIONCODE    FROM billing.FINANCELOCATIONCODE FLC   WHERE FLC.LOCATIONID = V_LOCATIONID;
        SELECT SUBSTR(EXTRACT(YEAR FROM V_DATE), -2) INTO IV_YEAR FROM DUAL;
          SELECT TO_CHAR(V_DATE, 'DD') INTO IV_DAY FROM DUAL;
        SELECT FLC.LOCATIONCODE    INTO V_LOCATIONCODE    FROM billing.FINANCELOCATIONCODE FLC   WHERE FLC.LOCATIONID = V_LOCATIONID;
          IF v_customerid <> 0 then
          SELECT nvl(ag.currencycode, 'INR')      INTO v_fxcode      FROM crm.agreements ag     WHERE ag.agreementid = v_agreementid;
                IF v_customerid <> 0 then
          SELECT nvl(ag.currencycode, 'INR')      INTO v_fxcode      FROM crm.agreements ag     WHERE ag.agreementid = v_agreementid;
        END IF;
            SELECT nvl(ag.currencycode, 'INR')      INTO v_fxcode      FROM crm.agreements ag     WHERE ag.agreementid = v_agreementid;
        END IF;
      END P_ADDARRECEIPTDETAILS_BKP_TEMP;
  
     
  `;

  const handleSubmit = () => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    let body = {
      Project_Version_Id: project_version,
      Migration_Name: headerValue?.Migration_Name,
      User_Email: sessionStorage.getItem("uemail"),
      Object_Type: lable,
      rules_toApply:rules
    };
    // console.log(body, 'body rule')
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios
      .post(`${config.API_BASE_URL()}/api/dynamic_rules_creation/`, form, conf)
      .then(
        (res) => {
          setNotify({
            isOpen: true,
            message: "Rule Created",
            type: "success",
          });
        },
        (error) => {
          setNotify({
            isOpen: true,
            message: "Something Went Wrong Please try Again",
            type: "error",
          });
        }
      );
  };

  return (
    <Box
      style={{ width: "97%", marginLeft: 10 }}
      className={classes.Accesslistcontainer}
    >
      <Box py={1} px={1}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Typography variant="h6">Rules For {props.location.data.obj}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={4}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "115ch", marginLeft: 80 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Sample Input"
              multiline
              rows={10}
              variant="outlined"
              defaultValue={textinput}
              disabled
            />
          </div>
        </Box>
      </Box>
      <Box py={4}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "115ch", marginLeft: 80 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Sample Output"
              multiline
              rows={10}
              variant="outlined"
              defaultValue={textoutput}
              disabled
            />
          </div>
        </Box>
      </Box>
      <Box py={4}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "115ch", marginLeft: 80 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Example Rules"
              multiline
              rows={4}
              variant="outlined"
              defaultValue="
                        •	Unit Identifier (start: ([C1]), end:(;))
                        •	Comment Rule (start: (/*), end:(*/))
                        •	Comment Rule (start: (--), end:[\n]))
                        •	Unit End Markers (;,(Begin,then,Loop))
                    "
              disabled
            />
          </div>
        </Box>
      </Box>
      <Box py={4}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "115ch", marginLeft: 80 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Input Rules"
              multiline
              rows={9}
              onChange={(e)=> setRules(e.target.value)}
              variant="outlined"
            />
          </div>
        </Box>
      </Box>

      <Box className={classes.root}>
        <Grid container direction="row" justifyContent="center">
          <Grid
            item
            direction="row"
            justifyContent="center"
            spacing={3}
            style={{ marginBottom: 10 }}
          >
            <Button
              variant="contained"
              color="primary"
              component="span"
              // OnClick={(e)=> handleSave()}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ marginLeft: 15 }}
              // OnClick={(e) => handleSubmit(e)}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </Box>
  );
}
