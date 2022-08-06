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
  rowEventClick?: (args: any) => void | any;
}

const renderRowData = (headers: string[], rowData: rowsData, cb: any) => {
  return headers.map((header, index) => {
    return <td key={index} onClick={() => cb ? cb(rowData) : null}> {`${rowData[header as keyof rowsData]}`}</td>
  })
}

export const GenericTable = (props: TableProps) => {

  const [loadingTables, setLoadingTabls] = useRecoilState<boolean>(LoadingAtom);
  const { title, headers, rowsData, rowEventClick } = props;


  return (
    <Content>
      <Title>{title}</Title>
      <TableWarper>
        <Table>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>
            })}
          </tr>
          <TBody>
            {!loadingTables ? (
              rowsData.map((row) => {
                return (
                  <tr>
                    {renderRowData(headers, row, rowEventClick)}
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