import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import { useState,useEffect } from "react";
import { updateUsers } from "./usersSlice";

export function EditUser() {
  const { pathname } = useLocation();
  const userId = pathname.replace("/edit-user/", "");

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );

   const [nama, setNama] = useState(user.nama);

  const [kabupaten, setKabupaten] = useState([]);
  const [valKabupaten, setValKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [valkecamatan, setValKecamatan] = useState([]);
  const [valprovinsi, setValProvinsi] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [appState, setAppState] = useState({
    loading: false,
    provinsi: null,
  });
  const handleNama = (e) => {
    setNama(e.target.value) } ;
useEffect(() => {
    setAppState({ loading: true });
    const user = `https://dev.farizdotid.com/api/daerahindonesia/provinsi`;
    fetch(user)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, provinsi: repos.provinsi });
        console.log(repos.provinsi)
      });
}, [setAppState]);
  const handleChangeProvinsi = (event,val) => {
    const kabupategApi = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=`+val.id;
    fetch(kabupategApi)
      .then((res) => res.json())
      .then((repos) => {

        setKabupaten(repos.kota_kabupaten)
        setValProvinsi(val)
      });
  };
  
  const handleClick = () => {
    if (valprovinsi.length == 0) {
       const dataapi =
       {
      "id":userId,
      "nama": nama,
    "kec": user.kec,
    "kabkot": user.kabkot,
      "prov": user.prov
       }
      console.log("=====dasdaa============")
      
      console.log(dataapi)
      dispatch(
        updateUsers(dataapi)
      );


      
      history.push("/");
   

    
    setNama("");
   
    } else {
       const dataapi =
       {
      "id":userId,
      
      "nama": nama,
    "kec": valkecamatan,
    "kabkot": valKabupaten,
      "prov": valprovinsi
       }
        dispatch(
        updateUsers(dataapi)
      );


      history.push("/");
    
    setNama("");

    }
    
  };
 
  const handleChangeKabupaten = (event, val) => {
    const kabupategApi = `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=`+val.props.value;
    fetch(kabupategApi)
      .then((res) => res.json())
      .then((repos) => {
        setValKabupaten({"nama_kabupaten":val.props.children,"id_kabupaten":event.target.value});
        setKecamatan(repos.kecamatan)
      });
   };
  const handleChangeKecamatan = (event, val) => {
    console.log(event.target.value)
    setValKecamatan({"nama_kecamatan":val.props.children,"id_kecamatan":event.target.value});
   };
  

  return (
    <div>
      <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
            }}
      >
        <Button
         style={{  marginTop:10  }}
        variant="contained"
        color="default"
        size="large"
        startIcon={<ArrowBackIosIcon />}
      >
        Cancel
      </Button>
          </Link>
      
      <FormHelperText>Nama</FormHelperText><TextField id="outlined-basic" variant="outlined" style={{ width:'100%', marginTop: 10 }} onChange={handleNama}  value={nama}/>
      <br></br>
      <FormHelperText>Provinsi</FormHelperText> 
      <Autocomplete
          id="combo-box-demo"
          onChange={handleChangeProvinsi}
      options={appState.provinsi}
      getOptionLabel={(option) => option.nama}
      style={{ width:'100%',marginTop:10  }}
      renderInput={(params) => <TextField {...params} label="Provinsi" variant="outlined" />}
      />
      <FormHelperText>Kabupaten</FormHelperText>
      <FormControl variant="outlined" style={{ marginTop:10 ,width:'100%' }}>
       
    <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          style={{ width:'100%', marginTop:10 }}
          value={valKabupaten.nama}
          onChange={handleChangeKabupaten}
        >
         {kabupaten.map(item => (
          <MenuItem value={item.id}>{item.nama}</MenuItem>
        ))}
        </Select>
        
        </FormControl>
      <br></br>
       <FormHelperText>Kecamatan</FormHelperText>
      <FormControl variant="outlined" style={{ marginTop:10,width:'100%'  }}>
      
        <Select
           labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          style={{  marginTop:10  }}
          value={valkecamatan.nama}
          onChange={handleChangeKecamatan}
        >
         {kecamatan.map(item => (
          <MenuItem value={item.id}>{item.nama}</MenuItem>
        ))}
        </Select>
      </FormControl>
     <Button
         style={{  marginTop:10  }}
        variant="contained"
        onClick={handleClick}
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
      >
        Update
      </Button>
      &nbsp;
      
    </div>
  );
}
