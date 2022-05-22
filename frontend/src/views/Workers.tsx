import { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Pagination } from "@mui/material";
import { useCreateWorkerMutation, useWorkersQuery, Worker } from "../generated/graphql"
import AddIcon from '@mui/icons-material/Add';
import WorkerCard from "../components/WorkerCard";

export default function Workers() {
    const [createWorker] = useCreateWorkerMutation();
    const [page, setPage] = useState<number>(1);
    const [workerList, setWorkerList] = useState<Worker[]>([]);
    const { data, loading, error, refetch } = useWorkersQuery();

    useEffect(() => {
        let initData = (page-1)*8;
        let endData = page * 8;
        if(data !== undefined && data?.workers.length > 0)
            setWorkerList(data?.workers.slice(initData, endData));

        
    },[data, page])

    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }

    if (error) return <div>{error.message}</div>
    if (loading || !data) return <CircularProgress />

    return (
        <>
            <Grid container justifyContent={'flex-end'} direction={'row'}>
                <Button variant="text" onClick={async () => {await createWorker(); await refetch();}}><AddIcon/></Button>
            </Grid>
            {
                <Grid container spacing={2} sx={{ mt: 1 }}>
                {
                    workerList.map(worker => {
                        return <Grid item xs={3}>
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
        </>
    )
}
