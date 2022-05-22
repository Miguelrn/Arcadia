import { Grid, Breadcrumbs, Link, Typography, Button } from "@mui/material";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import geoData from './worldMap.json';
import { Key, useState, useEffect } from "react";
import { useCompaniesQuery } from "../generated/graphql";
import CircleIcon from '@mui/icons-material/Circle';


export default function WorldMap() {
    const { data, loading, error, refetch } = useCompaniesQuery();
    const [markerCompanies, setMarkerCompanies] = useState<{ markerOffset: number, name: Key, coordinates: [number, number] }[]>([]);
    const [markerWorker, setMarkerWorker] = useState<{ markerOffset: number, name: Key, coordinates: [number, number] }[]>([]);
    // TODO: dos listas, companias seleccionadas y empleados, dos colores
    useEffect(() => {
        if (!loading && data !== undefined) {
            let aux_companies: { markerOffset: number, name: Key, coordinates: [number, number] }[] = [];
            let aux_worker: { markerOffset: number, name: Key, coordinates: [number, number] }[] = [];

            aux_companies = data?.companies.map(company => {
                if (company.workers !== null && company.workers !== undefined) {
                    company.workers.forEach(worker => {
                        aux_worker.push({
                            markerOffset: 10,
                            name: worker.username,
                            coordinates: [worker.others.address.coordinates.lat, worker.others.address.coordinates.lng]
                        })
                    })
                }

                return {
                    markerOffset: -5,
                    name: company.company,
                    coordinates: [company.others.latitude, company.others.longitude]
                }
            });
            setMarkerCompanies(aux_companies);
            setMarkerWorker(aux_worker);
        }

    }, [data])

    return (
        <Grid container sx={{ maxHeight: '50vh' }}>
            <Grid container justifyContent={'space-between'} direction={'row'}>

                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {[
                        <Link underline="hover" key="1" color="inherit" href="/" >
                            Home
                        </Link>,
                        <Link underline="hover" key="2" color="inherit" href="/worldmap" >
                            World Map
                        </Link>
                    ]}
                </Breadcrumbs>

                <div>
                    <div>
                        <CircleIcon style={{ color: 'red' }} fontSize={'small'} sx={{mr:1}}/>
                        <Typography gutterBottom variant="caption">Company</Typography>
                    </div>
                    <div>
                        <CircleIcon style={{ color: 'lightgreen' }} fontSize={'small'} sx={{mr:1}}/>
                        <Typography gutterBottom variant="caption">Worker</Typography>
                    </div>
                </div>
            </Grid>
            <ComposableMap>
                <Geographies geography={geoData}>
                    {({ geographies }) =>
                        geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                    }
                </Geographies>
                {markerCompanies.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates}>
                        <circle r={2} fill="#F00" stroke="#fff" strokeWidth={1} />
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: '10px' }}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
                {markerWorker.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates}>
                        <circle r={2} fill="#0F0" stroke="#fff" strokeWidth={1} />
                        <text
                            textAnchor="middle"
                            y={markerOffset}
                            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: '10px' }}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        </Grid>
    )
}
