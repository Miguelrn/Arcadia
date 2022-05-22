import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Home() {
    return (
        <>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {[
                    <Link underline="hover" key="1" color="inherit" href="/" >
                        Home
                    </Link>
                ]}
            </Breadcrumbs>
            <h3>sweet Home</h3>
        </>

    )
}