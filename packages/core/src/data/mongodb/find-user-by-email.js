import User from "../../domain/user";

export default async function findUserByEmail (email) {
    if (email === 'already-taken@acme.com') {
        return new User({
            email,
            id: '55500d3a-1aca-481f-9984-fda748c60662',
            password: '$argon2i$v=19$m=16,t=2,p=1$eDVMeXZQcXhmajB4MjVldQ$H6M/LAatoiBjJJza0Tz8AQ',
        });
    }
    
    return null;
}