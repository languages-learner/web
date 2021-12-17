import { defineStore, Store } from 'pinia';

export interface State {
    profileData?: {
        id: number,
        email: string,
    };
}

type UserStore = Store<"user",
    State,
    unknown, {
    fetchProfile(): void
}>

export const useUserStore: () => UserStore = defineStore('user', {
    state: () => ({
        profileData: undefined,
    } as State),
    actions: {
        fetchProfile() {
            this.profileData = {
                id: 1,
                email: 'chernigin.boss@gmail.com',
            };
        },
    },
});
