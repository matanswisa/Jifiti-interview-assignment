import axios from './axios';


export type Application = {
    id: number,
    firstName: string,
    lastName: string
}


export type Cards = {
    id: number,
    cardNo: string,
    issuer: string
}

export type Transactions = {
    id: number,
    amount: string,
    transType: number // (1 - "AUTH", 2 - "COMMIT", 3 - "REFUND")
    cardId: number // ( id property from cards )
}


export type ApiClient = {
    getApplications: () => Promise<Application[]>;
    getCards: (id: number) => Promise<Cards[]>;
    getTransactions: (id: number) => Promise<Transactions[]>;
}

export const createApiClient = (): ApiClient => {
    return {
        getApplications: () => {
            return axios.get('/applications/').then((res) => res.data);
        },
        getCards: (id: number) => {
            return axios.get(`/cards/${id}`).then((res) => res.data);
        },
        getTransactions: (id: number) => {
            return axios.get(`/cards/${id}`).then((res) => res.data);
        }
    }
}