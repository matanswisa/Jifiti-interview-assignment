import { atom } from "recoil";

export const UserData = atom({
    key: 'user',
    default: { id: '', firstName: '', lastName: '' }
});

export const LoadingAtom = atom({
    key: 'loading',
    default: true,
})