export interface Deal {
  id: string;
  seller: string;
  price: number;
  availability: string;
  deliveryTime: string;
  item: string;
}

export interface ConversationMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}