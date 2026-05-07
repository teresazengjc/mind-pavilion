import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SavedQuote = {
  id: string;
  text: string;
  textZh: string;
  source: string;
  sourceZh?: string;
  origin: "mind" | "book" | "debate";
};

export type SavedThought = { id: string; text: string; createdAt: number };

type State = {
  currentQuestion: string;
  currentQuestionZh: string;
  selectedCategory: string | null;
  selectedThinkerIds: string[];
  savedQuotes: SavedQuote[];
  savedThoughts: SavedThought[];
  readingList: string[];
  setQuestion: (en: string, zh: string) => void;
  setCategory: (c: string | null) => void;
  toggleThinker: (id: string) => void;
  saveQuote: (q: SavedQuote) => void;
  removeQuote: (id: string) => void;
  addThought: (text: string) => void;
  toggleReading: (title: string) => void;
};

export const useAgora = create<State>()(
  persist(
    (set, get) => ({
      currentQuestion: "I feel lost about my future. Should I choose stability or freedom?",
      currentQuestionZh: "我对未来感到迷茫。我应该选择稳定，还是选择自由？",
      selectedCategory: null,
      selectedThinkerIds: ["socrates", "laozi", "nietzsche"],
      savedQuotes: [],
      savedThoughts: [],
      readingList: [],
      setQuestion: (en, zh) => set({ currentQuestion: en, currentQuestionZh: zh }),
      setCategory: (c) => set({ selectedCategory: c }),
      toggleThinker: (id) =>
        set((s) => ({
          selectedThinkerIds: s.selectedThinkerIds.includes(id)
            ? s.selectedThinkerIds.filter((t) => t !== id)
            : [...s.selectedThinkerIds, id],
        })),
      saveQuote: (q) => {
        if (get().savedQuotes.some((x) => x.id === q.id)) return;
        set((s) => ({ savedQuotes: [q, ...s.savedQuotes] }));
      },
      removeQuote: (id) => set((s) => ({ savedQuotes: s.savedQuotes.filter((q) => q.id !== id) })),
      addThought: (text) =>
        set((s) => ({ savedThoughts: [{ id: crypto.randomUUID(), text, createdAt: Date.now() }, ...s.savedThoughts] })),
      toggleReading: (title) =>
        set((s) => ({
          readingList: s.readingList.includes(title)
            ? s.readingList.filter((t) => t !== title)
            : [...s.readingList, title],
        })),
    }),
    { name: "mind-agora" }
  )
);
