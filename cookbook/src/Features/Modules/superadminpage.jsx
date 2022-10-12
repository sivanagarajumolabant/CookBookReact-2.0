import { Box, Grid, TextField, Typography, styled } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Checkbox from "@material-ui/core/Checkbox";
// import React from 'react';
// import clsx from "clsx";
import PropTypes from "prop-types";
import ActionMenu from "../../Redux/actions/Menuaction";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { Autocomplete } from "@material-ui/lab";
import ConfirmDialog from "../../Features/Notifications/ConfirmDialog";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import config from "../../Config/config";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
import MenuAppBar from "../../Components/header";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
import Notification from "../Notifications/Notification";
import Menuaction from "../../Redux/actions/Menuaction";

import { Container, Modal, Snackbar } from "@material-ui/core";

const useStylestable = makeStyles((theme) => ({
  table: {
    width: "96%",
    // width:10
    marginLeft: "auto",
    marginRight: "auto",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  texttablecell: {
    // overflowX: 'hidden',
    whiteSpace: "nowrap",
    width: "140px",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    "&:hover": {
      overflow: "visible",
    },
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

  //pop up weindow

  container: {
    border: "none",
    borderRadius: 15,
    width: 460,
    height: 390,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  container1: {
    border: "none",
    borderRadius: 15,
    width: 450,
    height: 350,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  container2: {
    border: "none",
    borderRadius: 15,
    width: 450,
    height: 400,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
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

export default function SuperadminFunction() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const classestable = useStylestable();
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [migtype_create, setMigtype_create] = useState();
  const [project_max_limit, setProject_max_limit] = useState();
  const [feature_max_limit, setFeautre_max_limit] = useState();
  const [DropDownList, setDropdownList] = useState([]);
  const [updateDropDownList, setUpdateDropDownList] = useState(false);
  const [parentdropDownList, setParentdropDownList] = useState([]);
  const [modelMigtype_ObjectCreation, setModelMigtype_ObjectCreation] =
    useState();
  // const [Objtype_create, setObjtype_create] = useState();
  const [list_objects, setList_of_objects] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [path, setPath] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [subobjType, setSubobjtype] = useState();

  const {
    details,
    createFeature,
    preview,
    editpreview,
    editPreviewdetails,
    headerValue,
    project_version,
    DropDownValues,
  } = useSelector((state) => state.dashboardReducer);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  let history = useHistory();

  React.useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/migration_names_list/`, conf).then(
      (res) => {
        setDropdownList(res.data);
        dispatch(Menuaction.getdropdownlist(res.data));
        if (res.data.length > 0) {
        }
      },
      (error) => {
        setNotify({
          isOpen: true,
          message: "Something Went Wrong Please try Again",
          type: "error",
        });
      }
    );
  }, [updateDropDownList]);

  const handlePearentobjecttypes = (Migration_Name) => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    let body = {
      Migration_Name: Migration_Name,
      Project_Version_Id: project_version,
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios
      .post(`${config.API_BASE_URL()}/api/parent_object_list/`, form, conf)
      .then(
        (res) => {
          setParentdropDownList(res.data);
          // dispatch(Menuaction.getparentdropdownlist(res.data));
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

  const handleMigrationCreate = () => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    let body = {
      Project_Version_Id: "1",
      Migration_Name: migtype_create,
      Project_Version_limit: project_max_limit,
      Feature_Version_Limit: feature_max_limit,
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios
      .post(`${config.API_BASE_URL()}/api/migrationcreate/`, form, conf)
      .then(
        (res) => {
          if (res.data === "Migration Type already exist") {
            setNotify({
              isOpen: true,
              message: "Migration Type already exist",
              type: "error",
            });
          } else {
            setNotify({
              isOpen: true,
              message: "Created Migration Type",
              type: "success",
            });
            setUpdateDropDownList(true);
          }
          setOpen1(false);
        },
        (error) => {
          setNotify({
            isOpen: true,
            message: "Something Went Wrong Please try Again",
            type: "error",
          });
        }
      );
    setUpdateDropDownList(false);
  };

  const handleObjectypeCreate = (modelMigtype_ObjectCreation) => {
    let body;
    let obj;
    if (checkbox === true) {
      if (subobjType || subobjType !== "") {
        obj = path + "/" + subobjType;
      } else {
        obj = path;
      }
      body = {
        Project_Version_Id: project_version,
        Migration_Name: modelMigtype_ObjectCreation,
        Object_Type_Str: obj,
      };
    } else {
      body = {
        Project_Version_Id: project_version,
        Migration_Name: modelMigtype_ObjectCreation,
        Object_Type_Str: path,
      };
    }
    // console.log(body,' body')

    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });

    axios
      .post(`${config.API_BASE_URL()}/api/object_type_create/`, form, conf)
      .then(
        (res) => {
          if (res.data === "Object Type already exist") {
            setNotify({
              isOpen: true,
              message: "Object Type already exist",
              type: "error",
            });
          } else {
            setNotify({
              isOpen: true,
              message: "Object Type created",
              type: "success",
            });
            // handlePearentobjecttypes(modelMigtype_ObjectCreation);
            handleGetObjecttypesList(modelMigtype_ObjectCreation);
            dispatch(Menuaction.reloadAction(true));
          }

          // setOpen(false);
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

  const handleGetObjecttypesList = (migtype) => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    // console.log(project_version, " project versin");
    let body = {
      Project_Version_Id: project_version,
      Migration_Name: migtype,
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
  };

  const RenderTree = (nodes) => {
    // console.log("selection path ", );
    // const history = useHistory();
    return (
      <TreeItem
        key={nodes?.Object_Type}
        nodeId={nodes?.Object_Type}
        onLabelClick={() => handleTreeItemClick(nodes?.Object_Type)}
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
  };

  const handle_sub_obj = (v) => {
    setSubobjtype(v);
  };
  const clearPath = () => {
    console.log("clear");
    setPath("");
    setSubobjtype("");
  };

  const handleChangeCheckBox = (event) => {
    setCheckbox(event.target.checked);
  };
  // console.log(path,' path')

  return (
    <Box style={{ width: "92%" }}>
      <Box py={1} px={1}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Typography variant="h6">
              Migration Type and Object Type Creation
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box py={2} px={2}>
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={4}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={DropDownList}
              groupBy={""}
              defaultValue={{ Migration_Name: DropDownList[0]?.Migration_Name }}
              getOptionLabel={(option) => option.Migration_Name}
              style={{ width: 300, marginLeft: 100 }}
              onChange={(e, v) => {
                // handlePearentobjecttypes(v?.Migration_Name);
                handleGetObjecttypesList(v?.Migration_Name);
                setModelMigtype_ObjectCreation(v?.Migration_Name);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Migration type"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={1} style={{ marginLeft: 100 }}>
            <Avatar className={classes.avatar} onClick={() => setOpen1(true)}>
              <AddIcon style={{ color: "green" }} />
            </Avatar>
          </Grid>
          <Snackbar
            open={openAlert}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          ></Snackbar>
          <Modal open={open1}>
            <Container className={classes.container}>
              <Typography
                gutterBottom
                align="center"
                variant="h6"
                component="h2"
                className={classes.Object_Type}
                style={{ marginBottom: "20px" }}
              >
                Create Migration Type
              </Typography>
              {/* <form className={classes.form} autoComplete="off"> */}
              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Migration Type"
                  style={{ width: 410, marginBottom: "20px" }}
                  multiline
                  rows={1}
                  // value ={row.Keywords}
                  onChange={(e) => setMigtype_create(e.target.value)}
                  name="Migration_Name"
                  // defaultValue={edithandle.Keywords}
                  // helperText={featurenamemsg}
                  // value={edithandle.Keywords}
                  className={classes.textField}
                  // helperText="Some important text"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Major Version"
                  style={{ width: 410, marginBottom: "20px" }}
                  multiline
                  rows={1}
                  onChange={(e) => setProject_max_limit(e.target.value)}
                  name="Major Version"
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Minor Version"
                  style={{ width: 410, marginBottom: "10px" }}
                  multiline
                  rows={1}
                  onChange={(e) => setFeautre_max_limit(e.target.value)}
                  name="Minor Version"
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <h4>
                Note:Major version and Minor version should not be 0 and 1
              </h4>
              <div className={classes.item}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 20, marginLeft: 100 }}
                  onClick={() => handleMigrationCreate()}
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen1(false)}
                >
                  Cancel
                </Button>
              </div>
            </Container>
          </Modal>
          {checkbox ? (
            <Grid item xs={5}>
              <StyledAutocomplete
                size="small"
                id="grouped-demo"
                className={classes.inputRoottype}
                options={list_objects}
                groupBy={""}
                // defaultValue={{
                //   Object_Type: list_objects[0]?.Object_Type,
                // }}
                getOptionLabel={(option) => option.Object_Type}
                onChange={(e, v) => {
                  handleTreeStructureselected(v);
                  clearPath();
                }}
                style={{ width: 300 }}
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
          ) : (
            <></>
          )}
        </Grid>
      </Box>

      <Box py={3} px={3}>
        {checkbox ? (
          <Grid container direction="row" justifyContent="center">
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
              <>{RenderTree(selectedItem)}</>
            </TreeView>
          </Grid>
        ) : null}
        <Box py={4} px={4}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            style={{ position: "relative" }}
            spacing={2}
          >
            <Grid spacing={3}>
              <Checkbox
                checked={checkbox}
                onChange={handleChangeCheckBox}
                inputProps={{ "aria-label": "primary checkbox" }}
                style={{ marginTop: 8 }}
              />
              {checkbox ? (
                <>
                  <TextField
                    id="outlined-multiline-static"
                    label="Selected Path"
                    size="small"
                    style={{ width: 350, marginTop: 8 }}
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
                  />{" "}
                  <TextField
                    id="outlined-multiline-static"
                    label="Sub Object Type"
                    size="small"
                    style={{ width: 350, marginTop: 8 }}
                    multiline
                    rows={2}
                    onChange={(e) => handle_sub_obj(e.target.value)}
                    name="Sub Object Type"
                    // value={path}
                    className={classes.textField}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </>
              ) : (
                <TextField
                  id="outlined-multiline-static"
                  label="New Object Type"
                  size="small"
                  style={{ width: 350, marginTop: 8 }}
                  multiline
                  rows={1}
                  onChange={(e) => setPath(e.target.value)}
                  name="New Object Type"
                  value={path}
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}{" "}
              <Button
                variant="outlined"
                color="primary"
                // size='small'
                style={{ marginTop: 7 }}
                onClick={() => clearPath()}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          direction="row"
          justifyContent="center"
          style={{ marginTop: 40, position: "relative" }}
          // spacing={2}
        >
          <Button
            variant="outlined"
            color="primary"
            align="center"
            // style={{ marginRight: 20, marginLeft: 100 }}
            onClick={() => handleObjectypeCreate(modelMigtype_ObjectCreation)}
          >
            Create
          </Button>
        </Grid>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <></>
    </Box>
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
