import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITextFactory, ITitleFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";

export class LoginTextFactory implements ITitleFactory, ITextFactory<LoginText>{
    public constructor(){}
    public getText(dictionary: TextDictionary) : LoginText{
        return  {
          title: dictionary.login,
          email: dictionary.email,
          password: dictionary.password,
          signIn: dictionary.signIn,
        };
    }
    public getTitle(dictionary: TextDictionary) : LoginMenuItem{ return new LoginMenuItem(dictionary); }
 }
export interface LoginText{
    title: string;
    email: string;
    password: string;
    signIn: string;
}
export class LoginMenuItem implements IMenuItem{
    public readonly icon = 'Login';
    public readonly title: string;
    public constructor(dictionary: TextDictionary){ this.title = dictionary.login; }
}

