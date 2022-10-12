import { Box, Grid, TextField, Typography, styled } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import moment from "moment";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Notification from "../Notifications/Notification";
import config from "../../Config/config";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TreeItem from "@material-ui/lab/TreeItem";
import axios from "axios";
import MenuAppBar from "../../Components/header";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const useStylestable = makeStyles((theme) => ({
  table: {
    minWidth: 100,
    // width:10
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  },
}));

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
  requestcontainer: {
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
    width: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // '&:hover': {
    //     overflow: 'visible'
    // }
  },

  table: {
    // minWidth: 150,
    width: "60%",
    height: "10%",
    border: "1px black",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
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

export default function Request() {
  const classes = useStyles();
  const classestable = useStylestable();
  const {
    details,
    createFeature,
    preview,
    editpreview,
    editPreviewdetails,
    headerValue,
    project_version,
  } = useSelector((state) => state.dashboardReducer);
  const [selectedItem, setSelectedItem] = useState({});
  const [isselectedItem, setisSelectedItem] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [path, setPath] = useState();
  const [list_objects, setList_of_objects] = useState([]);
  const [list_features, setList_of_features] = useState([]);
  const [access, setAccess] = useState("");
  const [fn_name, setFn_name] = useState()

  let history = useHistory();

  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    // console.log(project_version, " project versin");
    let body = {
      Project_Version_Id: project_version,
      Migration_Name: headerValue?.Migration_Name,
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios
      .post(`${config.API_BASE_URL()}/api/object_types_format/`, form, conf)
      .then(
        (res) => {
          setList_of_objects(res.data);
        },
        (error) => {
          setNotify({
            isOpen: true,
            message: "Something went wrong Please try Again",
            type: "error",
          });
        }
      );
  }, []);

  const call_Features = (path) => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    // console.log(project_version, " project versin");
    let body = {
      Project_Version_Id: project_version,
      Migration_Name: headerValue?.Migration_Name,
      Object_Type_String: path,
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios.post(`${config.API_BASE_URL()}/api/features_list/`, form, conf).then(
      (res) => {
        // setList_of_features(res.data);
        setList_of_features([{ 'Feature_Name': "ALL" }].concat(res.data))
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: "Something went wrong Please try Again",
          type: "error",
        });
      }
    );
  };

  const handleTreeItemClick = (obj) => {
    if (path) {
      let mod_str = path.split("/");
      let identified_str = mod_str.pop();
      // console.log(identified_str)
      // console.log(identified_str, '===', obj)
      if (identified_str === obj) {
        setPath(path);
      } else {
        setPath(path + "/" + obj);
      }
    } else {
      setPath(obj);
    }
    // console.log(path, ' path')
  };

  const RenderTree = (nodes) => {
    // console.log("selection path ", );
    // const history = useHistory();
    return (
      <TreeItem
        key={nodes?.Object_Type}
        nodeId={nodes?.Object_Type}
        onLabelClick={() => {
          handleTreeItemClick(nodes?.Object_Type);
        }}
        label={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Typography
              variant="body2"
              style={{ color: "black", fontWeight: "inherit", flexGrow: 1 }}
            >
              {nodes?.Object_Type}
            </Typography>
          </div>
        }
      >
        {Array?.isArray(nodes?.Sub_Objects)
          ? nodes?.Sub_Objects.map((node) => RenderTree(node))
          : null}
      </TreeItem>
    );
  };

  const handleTreeStructureselected = (v) => {
    setSelectedItem(v);
    setisSelectedItem(true);
  };

  const clearPath = () => {
    setPath("");
  };

  const handleViewEditAccessbuttons = (e, v) => {
    setFn_name(path + "/" + v?.Feature_Name)
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    // console.log(project_version, " project versin");
    let body = {
      Project_Version_Id: project_version,
      User_Email: sessionStorage.getItem("uemail"),
      Migration_Name: headerValue?.Migration_Name,
      Object_Type_String: path + "/" + v?.Feature_Name,
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios
      .post(`${config.API_BASE_URL()}/api/check_user_access/`, form, conf)
      .then(
        (res) => {
          setAccess(res.data);
          console.log("Access ", access);
        },
        (error) => {
          setNotify({
            isOpen: true,
            message: "Something went wrong Please try Again",
            type: "error",
          });
        }
      );
  };

  const handleRequestAccess = (access_type) => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    
    let body = {
      Project_Version_Id: project_version,
      User_Email: sessionStorage.getItem("uemail"),
      Migration_Name: headerValue?.Migration_Name,
      Approval_Request: fn_name,
      Access_Type:access_type,
      'Approval_Status' : 'Pending',
      
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios
      .post(`${config.API_BASE_URL()}/api/approval_request_create/`, form, conf)
      .then(
        (res) => {
          if(res.data=='Approval request already present, Please wait for admin to approve'){
            setNotify({
              isOpen: true,
              message: "Approval request already present, Please wait for admin to approve",
              type: "error",
            });
          }else{
            setNotify({
              isOpen: true,
              message: "Request View Access Created for the Feature",
              type: "success",
            });
          }
          
        },
        (error) => {
          setNotify({
            isOpen: true,
            message: "Something went wrong Please try Again",
            type: "error",
          });
        }
      );
  };

  return (
    <div className={classes.requestcontainer}>
      <Box py={1} px={1}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Typography variant="h6">Request</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box py={2} px={2}>
        <Grid container direction="row" justifyContent="center" spacing={1}>
          <Grid item>
            <TextField
              id="outlined-multiline-static"
              label="Migration Type"
              name="MigrationType_Id"
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={headerValue?.Migration_Name}
              size="small"
              disabled
              style={{ width: 300 }}
            />
          </Grid>

          <Grid item>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={list_objects}
              groupBy={""}
              // defaultValue={{ title: "Procedure" }}
              getOptionLabel={(option) => option.Object_Type}
              style={{ width: 300 }}
              onChange={(e, v) => {
                handleTreeStructureselected(v);
                clearPath();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ObjectType"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {isselectedItem ? (
        <>
          <Box py={2} px={2}>
            <Grid container direction="row" justifyContent="center" spacing={1}>
              <Grid item xs={2} style={{ marginLeft: 30 }}>
                <TreeView
                  className={classes.root}
                  defaultExpanded={["3"]}
                  // expanded={true}
                  defaultCollapseIcon={<ArrowDropDownIcon />}
                  defaultExpandIcon={<ArrowRightIcon />}
                  defaultEndIcon={<div style={{ width: 24 }} />}
                  sx={{
                    height: 264,
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: "auto",
                  }}
                >
                  {RenderTree(selectedItem)}
                </TreeView>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="outlined-multiline-static"
                  label="Selected Path"
                  size="small"
                  style={{ width: 300 }}
                  multiline
                  rows={2}
                  // onChange={(e) => handlePath()}
                  name="Selected Path"
                  value={path}
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </Grid>
              <Grid xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  // size='small'
                  style={{ marginTop: 13, marginLeft: "-150px" }}
                  onClick={() => call_Features(path)}
                >
                  Submit
                </Button>
              </Grid>
              {"  "}
              <Grid xs={1} spacing={1}>
                <Button
                  variant="contained"
                  color="primary"
                  // size='small'
                  style={{ marginTop: 13, marginLeft: "-200px" }}
                  onClick={() => clearPath()}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box py={2} px={2}>
            <Grid container direction="row" justifyContent="center" spacing={1}>
              <Grid item xs={3}>
                <StyledAutocomplete
                  size="small"
                  id="grouped-demo"
                  className={classes.inputRoottype}
                  options={list_features}
                  groupBy={""}
                  // defaultValue={{ Feature_Name: "All" }}
                  getOptionLabel={(option) => option.Feature_Name}
                  style={{ width: 300 }}
                  onChange={(e, v) => handleViewEditAccessbuttons(e, v)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Feature Names"
                      variant="outlined"
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </>
      ) : null}

      <Box py={2} px={2}>
        <Grid container direction="row" justifyContent="center" spacing={1}>
          <Grid item xs={5}>
            <TextField
              id="outlined-multiline-static"
              label="Source Description"
              size="small"
              style={{ width: 400 }}
              multiline
              rows={15}
              // onChange={(e) => setPath(e.target.value)}
              name="Source Description"
              // value={path}
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="outlined-multiline-static"
              label="Target Description"
              size="small"
              style={{ width: 400 }}
              multiline
              rows={15}
              // onChange={(e) => setPath(e.target.value)}
              name="Target Description"
              // value={path}
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box style={{ marginBottom: "30px" }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item direction="row" justifyContent="center" spacing={1}>
            {access === 0 ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "190px" }}
                  onClick={(e) => {
                    handleRequestAccess("View");
                  }}
                >
                  Request View Access
                </Button>{" "}
                <Button
                  variant="contained"
                  // disabled={!selecetd}
                  size="small"
                  // onClick={() =>
                  //   history.push({
                  //     pathname: `/requestdata`,
                  //     data: { data },
                  //   })
                  // }
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "100px" }}
                  disabled
                >
                  Show All
                </Button>{" "}
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "180px" }}
                  onClick={(e) => {
                    handleRequestAccess("Edit");
                  }}
                >
                  Request Edit Access
                </Button>
              </>
            ) : null}

            {access === 1 ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "190px" }}
                  onClick={(e) => {
                    // handleRequestAccess("View");
                  }}
                >
                  Request View Access
                </Button>{" "}
                <Button
                  variant="contained"
                  // disabled={!selecetd}
                  size="small"
                  // onClick={() =>
                  //   history.push({
                  //     pathname: `/requestdata`,
                  //     data: { data },
                  //   })
                  // }
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "100px" }}
                >
                  Show All
                </Button>{" "}
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "180px" }}
                  // onClick={(e) => {
                  //   handleRequestAccess("Edit");
                  // }}
                  disabled
                >
                  Request Edit Access
                </Button>
              </>
            ) : null}

            {access === 2 ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "190px" }}
                  onClick={(e) => {
                    // handleRequestAccess("View");
                  }}
                >
                  Request View Access
                </Button>{" "}
                <Button
                  variant="contained"
                  // disabled={!selecetd}
                  size="small"
                  // onClick={() =>
                  //   history.push({
                  //     pathname: `/requestdata`,
                  //     data: { data },
                  //   })
                  // }
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "100px" }}
                >
                  Show All
                </Button>{" "}
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  component="span"
                  style={{ marginTop: 15, width: "180px" }}
                  onClick={(e) => {
                    // handleRequestAccess("Edit");
                  }}
                >
                  Request Edit Access
                </Button>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

function StyledTreeItem(props) {
  const history = useHistory();
  const classes = useTreeItemStyles();
  const dispatch = useDispatch();
  const IsSuperAdmin = sessionStorage.getItem("isSuperAdmin");
  // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    mainheader,
    data,
    // deleteitem,
    datavalue,
    sub,
    admin,
    createflag,
    ...other
  } = props;

  return (
    <>
      <TreeItem
        // icon={ViewModuleIcon}
        label={
          <div className={classes.labelRoot}>
            {/* <ViewModuleIcon color="inherit" className={classes.labelIcon} /> */}
            <Typography
              variant="body2"
              className={classes.labelText}
              style={{ color: "white" }}
            >
              {labelText}
            </Typography>

            <Typography
              variant="caption"
              color="inherit"
              style={{ color: "white" }}
            >
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    </>
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: "#0A7D7F",
      color: "",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent",
      },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));
