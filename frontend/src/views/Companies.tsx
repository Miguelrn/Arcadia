import { useCompaniesQuery } from "../generated/graphql"

export default function Companies() {
    const { data, loading, error } = useCompaniesQuery();

    if(error) return <div>{error.message}</div>

    if(loading || !data) return <h3>loading...</h3>

    return (
        <div>{JSON.stringify(data.companies)}</div>
    )
}