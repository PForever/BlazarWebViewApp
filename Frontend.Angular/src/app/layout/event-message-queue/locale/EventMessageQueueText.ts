import {TextDictionary} from "@common/lang-system/TextDictionary";

export interface EventMessageQueueText {
  dismiss: string;
}

export class EventMessageQueueTextFactory {
  getText(dictionary: TextDictionary): EventMessageQueueText {
    return {
      dismiss: dictionary.dismiss
    };
  }
}
