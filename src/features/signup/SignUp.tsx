import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import Spinner from '../Spinner/Spinner';
import IDinput from './IDinput';
import PwdInput from './PwdInput';
import { selectSignup } from './signupSlice';

const Signup = () => {
  const signupState = useAppSelector(selectSignup);
  const [nameValidate, setNameValidate] = useState(false);
  const [idValidate, setIdValidate] = useState(false);
  const [pwdValidate, setPwdValidate] = useState(false);
  // const [open, setOpen] = React.useState(false);
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpResult, setSignUpResult] = useState(false);
  const [msg, setMsg] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sendAxios = () => {
    setLoading(true);
    axios
      .post('http://localhost:8080/api/users/join', {
        department,
        userName: name,
        userPassword,
        position,
        userId,
      })
      .then(() => {
        setLoading(false);
        setSignUpResult(true);
        setMsg(true);
      });
  };
  if (signUpResult) {
    return (
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          setSignUpResult(true);
        }}
      >
        <DialogContent>{msg ? '???????????? ??????' : '???????????? ??????'}</DialogContent>
      </Dialog>
    );
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        ??????????????????
      </Button>
      {signupState.isSignupClick && (
        <Dialog open={true} onClose={handleClose}>
          {!loading && (
            <Grid container>
              {/* Header */}
              <Grid xs display="flex" justifyContent="space-between" alignItems="center">
                <DialogTitle>????????????</DialogTitle>
                <DialogActions>
                  <Box sx={{ m: 0 }}>
                    <CloseIcon className="cursor-pointer" onClick={handleClose} />
                  </Box>
                </DialogActions>
              </Grid>
              {/* Content */}
              <Grid>
                <DialogContent>
                  <DialogContentText>
                    ??????????????? ????????? ???????????? ?????? ???????????????.
                  </DialogContentText>
                  {/* department */}
                  <TextField
                    error={department.length < 30 ? false : true}
                    margin="dense"
                    id={'department'}
                    label="????????? ???????????????."
                    type="text"
                    helperText={department.length >= 30 ? '30??? ????????? ???????????????.' : ''}
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                    inputProps={{ maxLength: 30 }}
                  />
                  {/* position */}
                  <TextField
                    error={position.length >= 30 ? true : false}
                    margin="dense"
                    id={'position'}
                    label="?????? ???????????????."
                    type="text"
                    helperText={position.length >= 30 ? '30??? ????????? ???????????????.' : ''}
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setPosition(e.target.value);
                    }}
                    inputProps={{ maxLength: 30 }}
                  />
                  {/* name */}
                  <TextField
                    error={name.length >= 30 ? true : false}
                    margin="dense"
                    id={'name'}
                    label="?????? ???????????????.*"
                    type="text"
                    helperText={name.length >= 30 ? '30??? ????????? ???????????????.' : ''}
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameValidate(!!e.target.value.length);
                    }}
                    inputProps={{ maxLength: 30 }}
                  />
                  <IDinput setIdValidate={setIdValidate} setUserId={setUserId} />
                  <PwdInput
                    setPwdValidate={setPwdValidate}
                    setUserPassword={setUserPassword}
                  />
                </DialogContent>
              </Grid>
              <Grid sm={12} justifyContent="flex-end">
                <DialogActions>
                  <Button
                    disabled={!nameValidate || !idValidate || !pwdValidate}
                    onClick={sendAxios}
                  >
                    ?????? ??????
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          )}
          {loading && (
            <DialogContent>
              <DialogContentText>
                <Spinner />
              </DialogContentText>
            </DialogContent>
          )}
        </Dialog>
      )}
    </div>
  );
};

export default Signup;
