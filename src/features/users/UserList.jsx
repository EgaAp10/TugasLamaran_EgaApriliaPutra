import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
export function UserList() {

  const history = useHistory();
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));

      history.push("/");
  };

  return (
    <div>
      <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
                <TableCell align="center">Nama</TableCell>
                <TableCell align="center">No HP </TableCell>
                <TableCell align="center">Alamat</TableCell>
                <TableCell align="center">Kecamatan</TableCell>
                <TableCell align="center">Kabupaten/Kota</TableCell>
                <TableCell align="center">Provinsi</TableCell>
                <TableCell align="center">Aksi</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
             {entities.length &&
                entities.map(({ id, namasupplier, nohp,alamat,kec,kabkot,prov }, i) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {i+1}
                    </TableCell>
                     <TableCell align="center">{(typeof namasupplier !== "undefined") ? namasupplier :""}</TableCell>
                    <TableCell align="center">{(typeof nohp !== "undefined") ? nohp :""}</TableCell>
                    <TableCell align="center">{(typeof alamat !== "undefined") ? alamat:""}</TableCell>
                    <TableCell align="center">{(typeof kec !== "undefined")?kec.nama_kecamatan:""}</TableCell>
                    <TableCell align="center">{(typeof kabkot !== "undefined") ?kabkot.nama_kabupaten:""}</TableCell>
                    <TableCell align="center">{(typeof prov !== "undefined") ? prov.nama:"" }</TableCell>
                    <TableCell align="center">
                      
                      <button onClick={() => handleDelete(id)}><DeleteTwoToneIcon /></button>
                      <Link to={`/edit-user/${id}`}>
                        <button><EditTwoToneIcon /></button>
                      </Link></TableCell>
                  </TableRow>
                  ))}
          </TableBody>
          </Table>
    </TableContainer>
     
    </div>
  );
}