import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { api } from "../../App";
import { GenericTable, TableColumn } from "../../components/Table/GenericTable";
import { Eyebrow, Hero, Page, SearchInput, StatCard, StatGrid, StatLabel, StatValue, Subtitle, Title, Toolbar } from "../../components/Table/TableStyle";
import { LoadingAtom, UserData } from "../../RecoilStates/atoms";
import { ApplicationInfo } from "../../types";

const userColumns: Array<TableColumn<ApplicationInfo>> = [
  { key: 'id', label: 'User ID' },
  { key: 'firstName', label: 'First name' },
  { key: 'lastName', label: 'Last name' },
];

export default function ApplicationTable() {
  const [tablesData, setTablesData] = useState<ApplicationInfo[]>([]);
  const [, setDataUser] = useRecoilState(UserData)
  const [loadingTables, setLoadingTables] = useRecoilState<boolean>(LoadingAtom);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingTables) return;

    api.getApplications()
      .then((data) => setTablesData(data))
      .finally(() => setLoadingTables(false));
  }, [loadingTables, setLoadingTables])

  const filteredUsers = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return tablesData;

    return tablesData.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(query) || String(user.id).includes(query);
    });
  }, [searchValue, tablesData]);

  return (
    <Page>
      <Hero>
        <div>
          <Eyebrow>Users overview</Eyebrow>
          <Title>Customer activity</Title>
          <Subtitle>
            Browse users and open a transaction profile to review card activity, totals, and transaction status.
          </Subtitle>
        </div>
      </Hero>

      <StatGrid>
        <StatCard>
          <StatLabel>Total users</StatLabel>
          <StatValue>{tablesData.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Visible results</StatLabel>
          <StatValue>{filteredUsers.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>View</StatLabel>
          <StatValue>Users</StatValue>
        </StatCard>
      </StatGrid>

      <Toolbar>
        <SearchInput
          aria-label="Search users"
          placeholder="Search by name or ID"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </Toolbar>

      <GenericTable<ApplicationInfo>
        title="Users"
        hint="Select a row to open transaction details"
        columns={userColumns}
        rowsData={filteredUsers}
        loading={loadingTables}
        emptyMessage="No users match your search."
        rowEventClick={(application: ApplicationInfo) => {
          setLoadingTables(true);
          setDataUser({ id: String(application.id), firstName: application.firstName, lastName: application.lastName })
          navigate(`/transactions/${application.id}`);
        }}
      />
    </Page>
  )
}
