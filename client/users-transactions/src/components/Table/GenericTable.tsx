import React, { useEffect } from 'react';
import { ApplicationInfo, UserTransactions } from '../../types';
import { useRecoilState } from 'recoil';
import { LoadingAtom } from '../../RecoilStates/atoms';
import styled, { keyframes } from "styled-components";
import { Content, DivContentLoading, RowDiv, RowLoading, Table, TableWarper, TBody, Title } from './TableStyle';

type rowsData = UserTransactions | ApplicationInfo;

interface TableProps {
  title: string;
  headers: string[];
  rowsData: Array<rowsData>;
}

const renderRowData = (headers: string[], rowData: rowsData) => {
  return headers.map(header => {
    return <td> {`${rowData[header as keyof rowsData]}`}</td>
  })
}

export const GenericTable = (props: TableProps) => {

  const [loadingTables, setLoadingTabls] = useRecoilState<boolean>(LoadingAtom);
  const { title, headers, rowsData } = props;


  return (
    <Content>
      <Title>{title}</Title>
      <TableWarper>
        <Table>
          <tr>
            {headers.map((header, index) => {
              return <th>{header}</th>
            })}
          </tr>
          <TBody>
            {!loadingTables ? (
              rowsData.map((row) => {
                return (
                  <tr>
                    {renderRowData(headers, row)}
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
                  return (
                    <RowDiv key={index}>
                      <RowLoading></RowLoading>
                      <RowLoading></RowLoading>
                      <RowLoading></RowLoading>
                    </RowDiv>
                  )
                })}
              </DivContentLoading>
            )}
          </TBody>
        </Table>
      </TableWarper>
    </Content>
  )
}