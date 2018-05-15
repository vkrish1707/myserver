export interface ILoginInfo {
    token: string;
    providerName: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;
    logOff(): void;
}