import { useEffect, useState } from "react";
import { Breadcrumbs, Button, CircularProgress, FormControlLabel, FormGroup, Grid, Link, Pagination, Switch } from "@mui/material";
import { useCreateWorkerMutation, useWorkersQuery, Worker } from "../generated/graphql"
import AddIcon from '@mui/icons-material/Add';
import WorkerCard from "../components/Worker/WorkerCard";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WorkerCardForm from "../components/Worker/WorkerCardForm";

/**
 * Workers page, /workers
 * Protected page
 * @returns 
 */
export default function Workers() {
    const [createWorker] = useCreateWorkerMutation();
    const [page, setPage] = useState<number>(1);
    const [workerList, setWorkerList] = useState<Worker[]>([]);
    const { data, loading, error, refetch } = useWorkersQuery();
    const [jobless, setJobless] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('-1');

    useEffect(() => {
        let initData = (page - 1) * 8;
        let endData = page * 8;
        if (data !== undefined && data?.workers.length > 0) {
            if (jobless)
                setWorkerList(data?.workers.filter(w => w.company === null).slice(initData, endData));
            else
                setWorkerList(data?.workers.slice(initData, endData));
        }
    }, [data, page, jobless])

    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }

    const switchWorker = (id: string, reload: boolean) => {
        if(id !== undefined) setId(id);
        setOpen(!open);
        if(reload) refetch();
    }

    if (error) return <div>{error.message}</div>
    if (loading || !data) return <CircularProgress />

    return (
        <>
            <Grid container justifyContent={'space-between'} direction={'row'}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {[
                        <Link underline="hover" key="1" color="inherit" href="/" >
                            Home
                        </Link>,
                        <Link underline="hover" key="2" color="inherit" href="/worker" >
                            Worker
                        </Link>,
                    ]}
                </Breadcrumbs>

                <FormGroup>
                    <Grid container direction={'row'}>
                        <FormControlLabel control={<Switch value={jobless} onChange={() => setJobless(!jobless)} />} label="Jobless" />
                        <Button variant="text" onClick={async () => { await createWorker(); await refetch(); }}><AddIcon /></Button>
                    </Grid>
                </FormGroup>
            </Grid>
            {
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {
                        workerList.map(worker => {
                            return <Grid item xs={3} onClick={() => switchWorker(worker.id, false)} key={worker.id}>
                                <WorkerCard
                                    id={worker.id}
                                    username={worker.username}
                                    name={worker.name}
                                    surname={worker.surname}
                                    email={worker.email}
                                    avatar={worker.avatar}
                                    gender={worker.gender}
                                    phone={worker.phone}
                                    birthdate={worker.birthdate}
                                    others={worker.others}
                                    hasJob={worker.company !== null}
                                />
                            </Grid>

                        })
                    }
                </Grid>

            }
            <Grid container justifyContent={'flex-end'} direction={'row'} sx={{ mt: 1 }}>
                <Pagination count={Math.ceil(data.workers.length / 8)} size="small" onChange={(e, page) => changePage(e, page)} />
            </Grid>
            <WorkerCardForm open={open} id={id} handleClose={(id, reload) => switchWorker(id, reload)} />
        </>
    )
}
