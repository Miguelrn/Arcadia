import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useDisableWorkerMutation, useUpdateWorkerMutation, useWorkerByIdQuery } from '../generated/graphql';
import { useEffect, useState } from 'react';
import moment from 'moment';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface WorkerCardInput {
    open: boolean;
    id: string;
    handleClose: (id: string, reload: boolean) => void
}

export default function WorkerCardForm(props: WorkerCardInput) {
    const { data, loading } = useWorkerByIdQuery({ variables: { workerId: Number.parseInt(props.id) } });
    const [saveWorker] = useUpdateWorkerMutation();
    const [disableWorker] = useDisableWorkerMutation();
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>('');
    const [others, setOthers] = useState<object>({});

    useEffect(() => {
        if (data !== undefined && !loading && data?.workerById !== null) {
            const worker = data.workerById!;
            setUsername(worker.username);
            setName(worker.name);
            setSurname(worker.surname);
            setEmail(worker.email);
            setAvatar(worker.avatar);
            setGender(worker.gender);
            setPhone(worker.phone);
            setBirthdate(moment(worker.birthdate).format('YYYY/MM/DD'));
            setOthers(worker.others);
        }
    }, [data]);

    const updateWorker = async() => {
        const aux_others: string = JSON.stringify(others)
        await saveWorker({
            variables: {
                workerId: Number.parseInt(props.id),
                username,
                name,
                surname,
                email,
                avatar,
                gender,
                phone,
                birthdate,
                others: aux_others
            }
        });
        props.handleClose(props.id, true);
    }

    const deleteWorker = async() => {
        await disableWorker({
            variables: {
                workerId: Number.parseInt(props.id)
            }
        });
        props.handleClose(props.id, true);
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.handleClose(props.id, false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography gutterBottom variant="h6" component="div">Worker manager</Typography>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 2 }} justifyContent={'space-evently'}>
                        <Grid item>
                            <TextField
                                id="usernameId"
                                label="Username"
                                value={username}
                                disabled
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="nameId"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="surnameId"
                                label="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="emailId"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="avatarId"
                                label="Avatar"
                                value={avatar}
                                disabled
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="genderId"
                                label="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="phoneId"
                                label="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="birthdateId"
                                label="Birthdate"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="othersId"
                                label="Others"
                                value={JSON.stringify(others, null, 2)}
                                disabled
                                multiline
                                maxRows={10}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                    <Grid container direction='row' justifyContent={'space-between'} sx={{ mt: 1 }}>
                        <Button variant="contained" color='error' onClick={() => deleteWorker()}><DeleteIcon />Delete</Button>
                        <Button variant="contained" color='primary' onClick={() => updateWorker()}><UpdateIcon />Update</Button>
                    </Grid>

                </Box>
            </Modal>
        </div>
    );
}
