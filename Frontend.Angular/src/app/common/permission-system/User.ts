import { UserRoles } from "./UserRoles";

export class User{
    public id = '';
    public userName = '';
    public description = '';
    public roles = UserRoles.NONE;
    public password = '';
}

