import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { WordCard, AppSettings } from '../types';
import {
  getCards,
  saveCards,
  addCard,
  updateCard,
  deleteCard,
  getSettings,
  saveSettings,
} from '../storage';
import { PRESET_CARDS } from '../preset';

type Screen = 'browse' | 'form' | 'settings';
type FormMode = 'add' | 'edit';

interface AppContextValue {
  cards: WordCard[];
  currentIndex: number;
  settings: AppSettings;
  screen: Screen;
  formMode: FormMode;
  editingCard: WordCard | null;
  loading: boolean;
  speechError: string | null;

  refreshCards: () => Promise<void>;
  setCurrentIndex: (i: number) => void;
  goToForm: (mode: FormMode, card?: WordCard) => void;
  goToBrowse: () => void;
  goToSettings: () => void;
  saveCard: (card: Omit<WordCard, 'id' | 'createdAt'>) => Promise<void>;
  updateCardData: (id: string, updates: Partial<WordCard>) => Promise<void>;
  removeCard: (card: WordCard) => Promise<void>;
  updateSettings: (s: Partial<AppSettings>) => Promise<void>;
  setSpeechError: (msg: string | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<WordCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [settings, setSettingsState] = useState<AppSettings>({ speechRate: 0.8 });
  const [screen, setScreen] = useState<Screen>('browse');
  const [formMode, setFormMode] = useState<FormMode>('add');
  const [editingCard, setEditingCard] = useState<WordCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const refreshCards = useCallback(async () => {
    const list = await getCards();
    if (list.length === 0) {
      // 首次使用，添加预设示例
      const presetWithIds = PRESET_CARDS.map((p, i) => ({
        ...p,
        id: `preset-${i}-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }));
      await saveCards(presetWithIds);
      setCards(presetWithIds);
    } else {
      setCards(list);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [cardsData, settingsData] = await Promise.all([getCards(), getSettings()]);
      if (cardsData.length === 0) {
        const presetWithIds = PRESET_CARDS.map((p, i) => ({
          ...p,
          id: `preset-${i}-${Date.now()}`,
          createdAt: new Date().toISOString(),
        }));
        await saveCards(presetWithIds);
        setCards(presetWithIds);
      } else {
        setCards(cardsData);
      }
      setSettingsState(settingsData);
      setLoading(false);
    })();
  }, []);

  const goToForm = useCallback((mode: FormMode, card?: WordCard) => {
    setFormMode(mode);
    setEditingCard(card ?? null);
    setScreen('form');
  }, []);

  const goToBrowse = useCallback(() => {
    setScreen('browse');
    setEditingCard(null);
  }, []);

  const goToSettings = useCallback(() => {
    setScreen('settings');
  }, []);

  const saveCard = useCallback(async (card: Omit<WordCard, 'id' | 'createdAt'>) => {
    await addCard(card);
    await refreshCards();
    setScreen('browse');
  }, [refreshCards]);

  const updateCardData = useCallback(async (id: string, updates: Partial<WordCard>) => {
    await updateCard(id, updates);
    await refreshCards();
    setScreen('browse');
    setEditingCard(null);
  }, [refreshCards]);

  const removeCard = useCallback(async (card: WordCard) => {
    await deleteCard(card);
    await refreshCards();
    setCurrentIndex((i) => Math.max(0, Math.min(i, cards.length - 2)));
  }, [cards.length]);

  const updateSettings = useCallback(async (s: Partial<AppSettings>) => {
    const next = { ...settings, ...s };
    setSettingsState(next);
    await saveSettings(next);
  }, [settings]);

  const value: AppContextValue = {
    cards,
    currentIndex,
    settings,
    screen,
    formMode,
    editingCard,
    loading,
    speechError,
    refreshCards,
    setCurrentIndex,
    goToForm,
    goToBrowse,
    goToSettings,
    saveCard,
    updateCardData,
    removeCard,
    updateSettings,
    setSpeechError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
