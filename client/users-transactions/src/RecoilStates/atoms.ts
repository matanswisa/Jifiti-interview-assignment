import { atom } from "recoil";
import { SelectedUser } from "../types";

export const UserData = atom<SelectedUser>({
    key: 'user',
    default: { id: '', firstName: '', lastName: '' }
});

export const LoadingAtom = atom<boolean>({
    key: 'loading',
    default: true,
})
