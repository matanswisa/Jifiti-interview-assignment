import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { api } from "../../App";
import { GenericTable, renderBadge, TableColumn } from "../../components/Table/GenericTable";
import { BackButton, Eyebrow, Hero, Page, StatCard, StatGrid, StatLabel, StatValue, Subtitle, Title, Toolbar } from "../../components/Table/TableStyle";
import { LoadingAtom, UserData } from "../../RecoilStates/atoms";
import { ApplicationInfo, UserTransactions } from "../../types";

const maskCardNumber = (cardNo: number) => {
  const value = String(cardNo);
  return `${value.slice(0, 4)} •••• •••• ${value.slice(-4)}`;
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

const transactionColumns: Array<TableColumn<UserTransactions>> = [
  {
    key: 'cardNo',
    label: 'Card',
    render: (value) => maskCardNumber(Number(value)),
  },
  { key: 'issuer', label: 'Issuer' },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => formatAmount(Number(value)),
  },
  {
    key: 'transType',
    label: 'Status',
    render: (value) => renderBadge(String(value)),
  },
];

export default function TransactionsTable() {
  const [dataUser, setDataUser] = useRecoilState(UserData)
  const [loadingTables, setLoadingTables] = useRecoilState<boolean>(LoadingAtom);
  const [tablesData, setTablesData] = useState<UserTransactions[]>([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  const selectedUserId = userId || dataUser.id;

  useEffect(() => {
    if (!selectedUserId) {
      navigate('/');
      return;
    }

    setLoadingTables(true);
    api.getMoreInfo(Number(selectedUserId))
      .then((res) => setTablesData(res))
      .finally(() => setLoadingTables(false));
  }, [selectedUserId, navigate, setLoadingTables])

  useEffect(() => {
    if (!selectedUserId || dataUser.id === selectedUserId) return;

    api.getApplications().then((users: ApplicationInfo[]) => {
      const selectedUser = users.find((user) => String(user.id) === selectedUserId);
      if (!selectedUser) return;

      setDataUser({
        id: String(selectedUser.id),
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
      });
    });
  }, [dataUser.id, selectedUserId, setDataUser]);

  const totalVolume = useMemo(() => {
    return tablesData.reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  }, [tablesData]);

  const uniqueCards = useMemo(() => {
    return new Set(tablesData.map((transaction) => transaction.cardNo)).size;
  }, [tablesData]);

  const refunds = useMemo(() => {
    return tablesData.filter((transaction) => transaction.transType.toLowerCase() === 'refund').length;
  }, [tablesData]);

  return (
    <Page>
      <Hero>
        <div>
          <Eyebrow>User details</Eyebrow>
          <Title>{dataUser.firstName || 'User'} {dataUser.lastName || `#${selectedUserId}`}</Title>
          <Subtitle>
            Transaction activity for user #{selectedUserId}. Card numbers are masked for a cleaner and safer presentation.
          </Subtitle>
        </div>
      </Hero>

      <StatGrid>
        <StatCard>
          <StatLabel>Transactions</StatLabel>
          <StatValue>{tablesData.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total volume</StatLabel>
          <StatValue>{formatAmount(totalVolume)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Cards / refunds</StatLabel>
          <StatValue>{uniqueCards} / {refunds}</StatValue>
        </StatCard>
      </StatGrid>

      <Toolbar>
        <BackButton onClick={() => navigate('/')}>Back to users</BackButton>
      </Toolbar>

      <GenericTable<UserTransactions>
        title="Transactions"
        hint="Masked card numbers and normalized transaction statuses"
        columns={transactionColumns}
        rowsData={tablesData}
        loading={loadingTables}
        emptyMessage="No transactions found for this user."
      />
    </Page>
  )
}
