import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import { addUsers } from "./usersSlice";
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
export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [namasupplier, setNamasupplier] = useState("");
  const [nohp, setNohp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [error, setError] = useState(null);
  const [kabupaten, setKabupaten] = useState([]);
  const [valKabupaten, setValKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [valkecamatan, setValKecamatan] = useState([]);
  const [valprovinsi, setValProvinsi] = useState([]);

  const handleNamasupplier = (e) => setNamasupplier(e.target.value);
  const handleNohp = (e) => setNohp(e.target.value);
  const handleAlamat = (e) => setAlamat(e.target.value);
  const [appState, setAppState] = useState({
    loading: false,
    provinsi: null,
  });
  
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
 
  const handleClick = () => {
    const dataapi =
    {
      "namasupplier": namasupplier,
    "nohp": nohp,
    "alamat":alamat,
    "kec": valkecamatan,
    "kabkot": valKabupaten,
      "prov": valprovinsi
    }
    console.log(dataapi)
    if (namasupplier && nohp && alamat && valprovinsi && valkecamatan && valKabupaten) {
      dispatch(
        addUsers(dataapi)
      );


      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setAlamat("");
    setNamasupplier("");
    setNohp("");
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
  const handleChangeProvinsi = (event,val) => {
    const kabupategApi = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=`+val.id;
    fetch(kabupategApi)
      .then((res) => res.json())
      .then((repos) => {

        setKabupaten(repos.kota_kabupaten)
        setValProvinsi(val)
      });
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
      <TextField id="outlined-basic" label="Nama Supplier" variant="outlined" style={{ width:'100%', marginTop: 20 }} onChange={handleNamasupplier} />
      <br></br><TextField id="outlined-basic" label="No HP" variant="outlined" style={{ width:'100%', marginTop: 10 }} onChange={handleNohp} />
      <br></br>
       <TextField id="outlined-basic" label="Alamat" variant="outlined" style={{ width:'100%',marginTop:10  }} onChange={handleAlamat}/>
     <Autocomplete
          id="combo-box-demo"
          onChange={handleChangeProvinsi}
      options={appState.provinsi}
      getOptionLabel={(option) => option.nama}
      style={{ width:'100%',marginTop:10  }}
      renderInput={(params) => <TextField {...params} label="Provinsi" variant="outlined" />}
      />
      <FormControl variant="outlined" style={{ marginTop:10 ,width:'100%' }}>
       <FormHelperText>Kabupaten</FormHelperText>
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
      <FormControl variant="outlined" style={{ marginTop:10,width:'100%'  }}>
       <FormHelperText>Kecamatan</FormHelperText>
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
        Simpan
      </Button>
      &nbsp;
      <Button
         style={{  marginTop:10  }}
        variant="contained"
        color="default"
        size="large"
        startIcon={<ArrowBackIosIcon />}
      >
        Cancel
      </Button>
      
    </div>
  );
}
