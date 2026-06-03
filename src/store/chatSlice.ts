import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}
export interface Conversation {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
}

interface ChatState {
  conversations: Conversation[];
  activeId: string;
}

const seed: Conversation[] = [
  {
    id: "c1",
    title: "Spring Boot internals",
    updatedAt: Date.now() - 1000 * 60 * 5,
    messages: [
      { id: "m1", role: "user", content: "Explain Spring Boot auto-configuration." },
      {
        id: "m2",
        role: "assistant",
        content:
          "Spring Boot auto-configuration uses `@EnableAutoConfiguration` to scan the classpath and conditionally register beans via `@Conditional*` annotations.\n\nKey pieces:\n1. `spring.factories` / `AutoConfiguration.imports`\n2. Condition evaluators\n3. Property-driven defaults",
        sources: ["spring-boot-reference.pdf · p.42", "notes/auto-config.md"],
      },
    ],
  },
  {
    id: "c2",
    title: "Microservices vs Monolith",
    updatedAt: Date.now() - 1000 * 60 * 60 * 3,
    messages: [],
  },
  {
    id: "c3",
    title: "SQL window functions",
    updatedAt: Date.now() - 1000 * 60 * 60 * 26,
    messages: [],
  },
];

const initialState: ChatState = { conversations: seed, activeId: "c1" };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<string>) {
      state.activeId = action.payload;
    },
    newConversation(state) {
      const id = `c${Date.now()}`;
      state.conversations.unshift({ id, title: "New chat", updatedAt: Date.now(), messages: [] });
      state.activeId = id;
    },
    sendMessage(state, action: PayloadAction<string>) {
      const convo = state.conversations.find((c) => c.id === state.activeId);
      if (!convo) return;
      convo.messages.push({ id: `m${Date.now()}`, role: "user", content: action.payload });
      convo.updatedAt = Date.now();
      if (convo.title === "New chat") convo.title = action.payload.slice(0, 40);
    },
    receiveMessage(state, action: PayloadAction<ChatMessage>) {
      const convo = state.conversations.find((c) => c.id === state.activeId);
      if (!convo) return;
      convo.messages.push(action.payload);
      convo.updatedAt = Date.now();
    },
    deleteConversation(state, action: PayloadAction<string>) {
      state.conversations = state.conversations.filter((c) => c.id !== action.payload);
      if (state.activeId === action.payload && state.conversations[0]) {
        state.activeId = state.conversations[0].id;
      }
    },
  },
});

export const { setActive, newConversation, sendMessage, receiveMessage, deleteConversation } =
  chatSlice.actions;
export default chatSlice.reducer;
