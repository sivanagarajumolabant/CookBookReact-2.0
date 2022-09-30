import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
// import Notification from "../Notifications/Notification";
import ConfirmDialog from "../../Features/Notifications/ConfirmDialog"

import {
  Container,
  Modal,
  Snackbar,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker
} from '@material-ui/pickers';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TableBody from '@material-ui/core/TableBody';
import Notification from "../Notifications/Notification";
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import axios from "axios";
import config from "../../Config/config";
import { TableContainer } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';



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


    [theme.breakpoints.down('sm')]: {
      marginTop: "200px",
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: "120px",
    },
    [theme.breakpoints.up('md')]: {
      marginTop: "50px",
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: "0px",
    },
  },


  texttablecell: {
    overflowX: 'hidden',
    whiteSpace: "nowrap",
    // width: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    '&:hover': {
      overflow: 'visible'
    }
  },

  table: {
    // minWidth: 150,
    width: '90%',
    height: '10%',
    border: '1px black'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
  rootc: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,

    },

    height: 10

  },
}))(TableRow);


const useStylestable = makeStyles((theme) => ({

  table: {
    minWidth: 100,
    // width:10,
    width: '98%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,

  },

}))


export default function Rules() {
  const classes = useStyles();
  
  return (
    <Box style={{ width: '97%', marginLeft: 10 }} className={classes.Accesslistcontainer}>
      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Rules For Objects
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={4}>
        <Grid container direction='row' justifyContent='left' spacing={2}>
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "60ch",marginLeft: 90 }
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
                    variant ="outlined"
                />
            </div>       
            </Box>
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "60ch",marginLeft: 90 }
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
                    variant ="outlined"
                />
            </div>       
            </Box>

        </Grid>
      </Box>
      <Box py={4}>
         <Box
            component="form"
            sx={{
            "& .MuiTextField-root": { m: 1, width: "130ch",marginLeft: 80 }
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
                    variant ="outlined"
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
            "& .MuiTextField-root": { m: 1, width: "130ch",marginLeft: 80 }
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
                    variant ="outlined"  
                />
            </div>     
        </Box>
      </Box>
      <Grid item >
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ marginTop: 5, marginLeft: 550 }}
            >
              {" "}
              Submit
            </Button>
          </Grid>
    </Box>
  )
}