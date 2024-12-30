import { TextDictionary } from "../lang-system/TextDictionary";
import { IMenuItem } from "./IMenuItem";


export interface ITitleFactory<T extends IMenuItem = IMenuItem> {
    getTitle(dictionary: TextDictionary): T;
}
export interface ITextFactory<T = unknown> {
    getText(dictionary: TextDictionary) : T;
}