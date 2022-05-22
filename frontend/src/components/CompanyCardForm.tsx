import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useCompanyByIdQuery, useDisableCompanyMutation, useUpdateCompanyMutation } from '../generated/graphql';
import { useEffect, useState } from 'react';

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

export default function CompanyCardForm(props: WorkerCardInput) {
    const { data, loading } = useCompanyByIdQuery({ variables: { companyId: Number.parseInt(props.id) } });
    const [saveCompany] = useUpdateCompanyMutation();
    const [disableCompany] = useDisableCompanyMutation();
    const [companyName, setCompanyName] = useState<string>('');
    const [industry, setIndustry] = useState<string>('');
    const [catchPhrase, setCatchPhrase] = useState<string>('');
    const [logo, setLogo] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [others, setOthers] = useState<object>({});

    useEffect(() => {
        if (data !== undefined && !loading && data?.companyById !== null) {
            const company = data.companyById!;
            setCompanyName(company.company);
            setIndustry(company.industry);
            setCatchPhrase(company.catch_phrase);
            setLogo(company.logo);
            setType(company.type);
            setPhone(company.phone);
            setOthers(company.others);
        }
    }, [data]);

    const updateCompany = async() => {
        const aux_others: string = JSON.stringify(others)
        await saveCompany({
            variables: {
                companyId: Number.parseInt(props.id),
                companyName: companyName,
                industry: industry,
                catchPhrase: catchPhrase,
                logo: logo,
                type: type,
                phone,
                others: aux_others
            }
        });
        props.handleClose(props.id, true);
    }

    const deleteCompany = async() => {
        await disableCompany({
            variables: {
                companyId: Number.parseInt(props.id)
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
                                id="companyId"
                                label="Company Name"
                                value={companyName}
                                disabled
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="industryId"
                                label="Industry"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="cathPhraseId"
                                label="Catch Phrase"
                                value={catchPhrase}
                                onChange={(e) => setCatchPhrase(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="typeId"
                                label="Industry Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="logoId"
                                label="Logo"
                                value={logo}
                                disabled
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
                        <Button variant="contained" color='error' onClick={() => deleteCompany()}><DeleteIcon />Delete</Button>
                        <Button variant="contained" color='primary' onClick={() => updateCompany()}><UpdateIcon />Update</Button>
                    </Grid>

                </Box>
            </Modal>
        </div>
    );
}
