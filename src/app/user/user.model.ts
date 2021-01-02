export class User {
    username: string;
    password: string;
}

export class ChangePassword {
    currentPassword: string;
    confirmPassword: string;
    newPassword: string;
    userId: number;
}