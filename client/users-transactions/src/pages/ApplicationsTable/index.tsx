import React, { useEffect, useState } from 'react';
import { Application, createApiClient } from '../../api/api';
// import { api } from '../../App';

import styled from 'styled-components';


export const api = createApiClient();



function renderApplicationDetails(application: Application) {
    return (
        <>
            <h3>id: {application.id}</h3>
            <h4>name: {application.firstName} {application.lastName} </h4>
        </>

    )
}

export default function ApplicationTable() {

    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        console.log('lol?');

        async function fetchApplications() {
            return await api.getApplications();
        }
        fetchApplications().then((res) => {
            console.log(res);

            setApplications(res)
        })

    }, [])

    return (
        <ul>
            {applications.map((application, indx) => { return <li key={indx}>{renderApplicationDetails(application)} </li> })}
        </ul>
    )

}