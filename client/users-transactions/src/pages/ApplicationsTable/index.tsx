import axios from "axios";
import { log } from "console";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import styled, { isStyledComponent, keyframes } from "styled-components";
import { api } from "../../App";
import { GenericTable } from "../../components/Table/GenericTable";
// import { URL } from "../../App";
import { LoadingAtom, UserData } from "../../RecoilStates/atoms";
import { ApplicationInfo } from "../../types";



export default function ApplicationTable() {
  const [tablesData, setTablesData] = useState<ApplicationInfo[]>([]);
  const [dataUser, setDataUser] = useRecoilState(UserData)
  const [loadingTables, setLoadingTabls] = useRecoilState<boolean>(LoadingAtom);

  const navigate = useNavigate();

  useEffect(() => {
    const getApplications = async () => await api.getApplications()
    if (loadingTables) {
      getApplications().then((data) => {
        setTablesData(data);
        setLoadingTabls(false);
      })
    }

  }, [loadingTables])


  return (

    <GenericTable title={"Users Table"} headers={["id", "firstName", "lastName"]} rowsData={tablesData} rowEventClick={
      (application: ApplicationInfo) => {
        setLoadingTabls(true);
        navigate('/transactions');
        setDataUser({ id: String(application.id), firstName: application.firstName, lastName: application.lastName })
      }
    } />
  )
}