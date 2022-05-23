import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Divider, Grid, Tab, Tabs, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Company, useDeleteJobMutation, useDisableWorkerMutation, useUpdateWorkerMutation, useWorkerByIdQuery } from '../../generated/graphql';
import { useEffect, useState } from 'react';
import moment from 'moment';
import TabPanel from '../Utils/TabPanel';
import CompanyCard from '../Company/CompanyCard';
import CompanySelector from '../Company/CompanySelector';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface WorkerCardProp {
    open: boolean;
    id: string;
    handleClose: (id: string, reload: boolean) => void
}

/**
 * Edit worker form
 * @param props {
 *  id: worker id
 *  open: modal window (true if its open)
 * }
 * @returns jsx modal window that display all the info of the related worker
 */
export default function WorkerCardForm(props: WorkerCardProp) {
    const { data, loading } = useWorkerByIdQuery({ variables: { workerId: Number.parseInt(props.id) } });
    const [saveWorker] = useUpdateWorkerMutation();
    const [disableWorker] = useDisableWorkerMutation();
    const [removeJob] = useDeleteJobMutation();
    const [id, setId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>('');
    const [others, setOthers] = useState<object>({});
    const [company, setCompany] = useState<Company | undefined>(undefined);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (data !== undefined && !loading && data?.workerById !== null) {
            const worker = data.workerById!;
            setId(worker.id);
            setUsername(worker.username);
            setName(worker.name);
            setSurname(worker.surname);
            setEmail(worker.email);
            setAvatar(worker.avatar);
            setGender(worker.gender);
            setPhone(worker.phone);
            setBirthdate(moment(worker.birthdate).format('YYYY/MM/DD'));
            setOthers(worker.others);
            if (worker.company !== null && worker.company !== undefined) setCompany(worker.company);
            else setCompany(undefined);
        }
    }, [data]);

    const updateWorker = async () => {
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

    const deleteWorker = async () => {
        await disableWorker({
            variables: {
                workerId: Number.parseInt(props.id)
            }
        });
        props.handleClose(props.id, true);
    }

    const deleteJob = async () => {
        const companyId = Number.parseInt(company?.id || '0');
        const worker = Number.parseInt(id);
        await removeJob({
            variables: {
                companyId: companyId,
                workerId: worker
            }
        });
        props.handleClose(props.id, true);
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={() => props.handleClose(props.id, false)}
                aria-labelledby="open worker info"
            >
                <Box sx={style}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={(_, newValue) => setValue(newValue)} aria-label="worker info">
                            <Tab label="Worker manager" />
                            <Tab label="Job Manager" />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Grid container spacing={2} justifyContent={'space-evently'}>
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
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {
                            // If worker have company, display the company card
                            (company !== null && company !== undefined) ?
                                <>
                                    <CompanyCard
                                        id={company.id}
                                        catch_phrase={company.catch_phrase}
                                        company_name={company.company}
                                        industry={company.industry}
                                        logo={company.logo}
                                        phone={company.phone}
                                        type={company.type}
                                        workers={company.workers?.length || 0}
                                        others={company.others}
                                        key={company.id}
                                        small={false}
                                    />
                                    <Divider sx={{ mt: 2 }} />
                                    <Grid container direction='row' justifyContent={'flex-end'} sx={{ mt: 1 }}>
                                        <Button variant="contained" color='error' onClick={() => deleteJob()}><DeleteIcon />Delete</Button>
                                    </Grid>
                                </>
                                : // Otherwise if the worker dont have company, display all the companies card in order to apply for a new job!
                                <>
                                    <CompanySelector workerId={id} reload={() => props.handleClose(props.id, true)}/>
                                </>
                        }
                    </TabPanel>
                </Box>
            </Modal>
        </div>
    );
}
