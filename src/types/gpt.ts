interface chatList {
  model?: string,
  messages?: Array<any>
}

export interface ChatMessage {
  // role: "user" | "assistant" | "system";
  // content: string;
  chatId: string,
  title: string,
  chatList: chatList
}
