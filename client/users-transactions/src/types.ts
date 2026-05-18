export interface UserTransactions {
    cardNo: number,
    issuer: string,
    amount: number,
    transType: string,
}

export interface ApplicationInfo {
    id: number,
    firstName: string,
    lastName: string,
}

export interface SelectedUser {
    id: string,
    firstName: string,
    lastName: string,
}

