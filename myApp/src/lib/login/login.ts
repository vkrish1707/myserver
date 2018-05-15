export interface ILogin {

    // interface members
    token: string;
    providerName: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string;

    // interface methods
    logout(): Promise<void>;
}
