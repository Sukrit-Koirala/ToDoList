export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  reminder?: {
    time: string; // ISO 8601 format
    notified: boolean; // Track if notification was already sent
  };
}

export interface Card{
    id: string;
    title: string;
    color: string;
    todos: Todo[];
    createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  cards: Card[];
  isDefault: boolean;
  createdAt: string;
}