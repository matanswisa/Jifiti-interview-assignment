import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import styled, { isStyledComponent, keyframes } from "styled-components";
import { api } from "../../App";
// import { URL } from "../../App";
import { UserData } from "../../RecoilStates/atoms";
import { ApplicationInfo } from "../../types";



export default function ApplicationTable() {
  const [loadingTables, setLoadingTabls] = useState<boolean>(true);
  const [tablesData, setTablesData] = useState<ApplicationInfo[]>([]);
  const [dataUser, setDataUser] = useRecoilState(UserData)
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
    <Content>
      <Title>Users Table</Title>
      <TableWarper>
        <Table>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          <TBody>
            {!loadingTables ? (
              tablesData.sort((a: ApplicationInfo, b: ApplicationInfo) => a.lastName.localeCompare(b.lastName)).map((application) => {
                return (
                  <tr onClick={() => { navigate('/transactions'); setDataUser({ id: String(application.id), firstName: application.firstName, lastName: application.lastName }) }}>
                    <td>{application.id}</td>
                    <td>{application.firstName}</td>
                    <td>{application.lastName}</td>
                  </tr>
                )
              })
            ) : (
              <DivContentLoading>
                <RowDiv id="top">
                  <RowLoading></RowLoading>
                  <RowLoading></RowLoading>
                  <RowLoading></RowLoading>
                </RowDiv>
                {Array(8).fill(0).map((index) => {
                  return (<RowDiv key={index}>
                    <RowLoading></RowLoading>
                    <RowLoading></RowLoading>
                    <RowLoading></RowLoading>
                  </RowDiv>)
                })}
              </DivContentLoading>
            )}
          </TBody>
        </Table>
      </TableWarper>
    </Content>
  )
}

const BorderColor = keyframes`
      0%{
        background-color:hsla(200, 20%, 70%)
      }
      
      
    100% {    
      background-color:hsla(200, 20%, 95%)
       
    }    
`;


const DivContentLoading = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #ffffff;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1.5rem;
  &&#top {
    margin-top: 0.5rem;
  }
`;
const RowLoading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 2.5rem;
  width: 33%;
  margin: 0 auto;
  /* border-radius: 15px; */
  background-color: #e4e0e0;
  animation-name: ${BorderColor};
  animation-duration: 0.8s;
  animation-direction: alternate;
  animation-iteration-count: infinite ;
  animation-iteration-count:linear;
  &&:nth-last-child(even) {
    /* background: #d6d4d4; */
    opacity: 0.7;
  }
`;

const TBody = styled.div`
 width: 100%;
        position: relative;
        overflow-x: auto;
        &&::-webkit-scrollbar {
    width: 3px; /* width of the entire scrollbar */
    height: 0.6rem;
  }

  &&::-webkit-scrollbar-track {
    background: #feffffb0; /* color of the tracking area */
    border-radius: 10px;
  }

  &&::-webkit-scrollbar-thumb {
    background-color: #ff0000; /* color of the scroll thumb */
    border-radius: 50px; /* roundness of the scroll thumb */
    border: 10px solid #c0d9d9b1; /* creates padding around scroll thumb */
  }
`
const TableWarper = styled.div`
height: 70%;
margin: 0 auto;
/* margin-top: 5rem; */
width: 60%;
border-radius: 15px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );   
`
const Table = styled.table`
display: flex;
flex-direction: column;
/* justify-content: center; */
align-items: center;
   border-radius: 5px;
    font-size: 1.2rem;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    height: 100%;
    white-space: nowrap;
    background-color: #ffffff;
    
    td,
  th {
    text-align: center;
    padding: 1%;
    width: 100%;
   
  }
  td {
    color: black;
    border-right: 1px solid #f8f8f8;
    font-size: 1.1rem;
  }
  th:nth-child(odd) {
    color: black;
    background: #a4a6a8;
  }
    tr:nth-child(even) {
    background: #F8F8F8;
}
tr:nth-child(even) {
    background: #f8f8f8;
  }
  th:last-child{
        border-bottom: none;
    }
  tr {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    transition: all ease-in-out  0.5s ;
    
  }
  th{
    cursor: default;
    color: #ffffff;
   background: #4FC3A1;
  }
  tr:hover{
    background-color:#e7caca;
    /* transform: scale(1.001); */
    /* width: 99.8%; */
  
    /* transition: all ease-in-out 0.2s; */
  }
  
   
`
const Content = styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        /* justify-content: space-around; */
        `
export const Title = styled.div`
        font-size: 1.2rem;
        /* text-align: center; */
        height: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: underline;
        `