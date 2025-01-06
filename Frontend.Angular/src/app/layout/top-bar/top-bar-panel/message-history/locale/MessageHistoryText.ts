import {ITextFactory} from "@common/menu-system/IHasTitle";
import {TextDictionary} from "@common/lang-system/TextDictionary";

export const MessageHistoryTextTag = 'MessageHistoryText'

export class MessageHistoryTextFactory implements ITextFactory<MessageHistoryText> {
  getText(dictionary: TextDictionary): MessageHistoryText {
    return {
      title: dictionary.messageHistory,
      date: dictionary.date,
      level: dictionary.level,
      sourceType: dictionary.sourceType,
      message: dictionary.message,
      messageHistoryIsEmpty: dictionary.messageHistoryIsEmpty,
      exit: dictionary.exit,
      clean: dictionary.clean,
    };
  }
}

export interface MessageHistoryText {
  title: string;
  date: string;
  message: string;
  level: string;
  sourceType: string;
  messageHistoryIsEmpty: string;
  exit: string;
  clean: string;
}
