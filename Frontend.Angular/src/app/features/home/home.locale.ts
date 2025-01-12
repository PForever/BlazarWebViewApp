import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";

export class HomeTextFactory implements ITitleFactory, ITextFactory<HomeText> {

  public getText(dictionary: TextDictionary): HomeText {
    return {
      title: dictionary.home,
    };
  }

  public getTitle(dictionary: TextDictionary): HomeMenuItem {
    return new HomeMenuItem(dictionary);
  }
}

export interface HomeText {
  title: string;
}

export class HomeMenuItem implements IMenuItem {
  public icon = 'home';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.home;
  }
}

