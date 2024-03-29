import React from 'react'
import { gql,useQuery} from '@apollo/client'
import { GET_CLIENTS } from '../queries/ClientQueries'
import Spinner from './Spinner'
import ClientRow from './ClientRow'


export default function Clients() {

    const {loading,error,data} = useQuery(GET_CLIENTS)
    if (loading) return <Spinner/>
    if(error) return <p>Something went wrong</p>


  return (

    <div className='container'>{!loading && !error && (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>  
            <tbody>
                {data.clients.map(client => (
                    <ClientRow key={client.id} client={client}/>
                ))}
            </tbody>  
        </table>    
    )}</div>
  )
}
