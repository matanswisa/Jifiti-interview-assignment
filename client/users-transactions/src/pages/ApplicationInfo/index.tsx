import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { api } from "../../App";
import { GenericTable } from "../../components/Table/GenericTable";
import { UserData, LoadingAtom } from "../../RecoilStates/atoms";
import { UserTransactions } from "../../types";


export default function ApplicationInfo() {
  const [dataUser, setDataUser] = useRecoilState(UserData)
  const [loadingTables, setLoadingTabls] = useRecoilState<boolean>(LoadingAtom);
  const [tablesData, setTablesData] = useState<UserTransactions[]>([]);

  useEffect(() => {

    async function fetch() {
      const id = Number(dataUser.id);
      return await api.getMoreInfo(id);
    }
    if (loadingTables) {
      fetch().then((res) => {
        setTablesData(res);
        setLoadingTabls(false);
      });
    }

    return () => {
      setLoadingTabls(true);
    }
  }, [])

  return (
    <GenericTable title={"Applications Info"} headers={["cardNo", "issuer", "amount", "transType"]} rowsData={tablesData}></GenericTable>
  )
}

