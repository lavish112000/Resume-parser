'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import type { ResumeData, Template, StyleOptions } from '@/lib/types';

// App states for better UX flow
export type AppState = 'landing' | 'uploading' | 'verifying' | 'editing' | 'previewing' | 'templates' | 'dashboard';

interface AppContextState {
  // Core data
  resumeData: ResumeData | null;
  parsedData: ResumeData | null;
  
  // UI state
  currentState: AppState;
  isLoading: boolean;
  fileName: string | null;
  
  // Resume customization
  template: Template;
  styleOptions: StyleOptions;
  
  // Navigation
  history: AppState[];
  canGoBack: boolean;
}

type AppAction =
  | { type: 'SET_STATE'; payload: AppState }
  | { type: 'SET_RESUME_DATA'; payload: ResumeData | null }
  | { type: 'SET_PARSED_DATA'; payload: ResumeData | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_FILE_NAME'; payload: string | null }
  | { type: 'SET_TEMPLATE'; payload: Template }
  | { type: 'SET_STYLE_OPTIONS'; payload: StyleOptions }
  | { type: 'GO_BACK' }
  | { type: 'RESET_APP' }
  | { type: 'RESTORE_STATE'; payload: Partial<AppContextState> };

const initialState: AppContextState = {
  resumeData: null,
  parsedData: null,
  currentState: 'landing',
  isLoading: false,
  fileName: null,
  template: 'ats',
  styleOptions: {
    fontFamily: 'Inter',
    fontSize: '11pt',
    color: '#000000',
    margin: '1.5cm',
    lineHeight: '1.4',
    skillSpacing: '0.5rem',
  },
  history: ['landing'],
  canGoBack: false,
};

function appReducer(state: AppContextState, action: AppAction): AppContextState {
  switch (action.type) {
    case 'SET_STATE':
      const newHistory = [...state.history];
      if (newHistory[newHistory.length - 1] !== action.payload) {
        newHistory.push(action.payload);
      }
      return {
        ...state,
        currentState: action.payload,
        history: newHistory,
        canGoBack: newHistory.length > 1,
      };

    case 'SET_RESUME_DATA':
      return { ...state, resumeData: action.payload };

    case 'SET_PARSED_DATA':
      return { ...state, parsedData: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_FILE_NAME':
      return { ...state, fileName: action.payload };

    case 'SET_TEMPLATE':
      return { ...state, template: action.payload };

    case 'SET_STYLE_OPTIONS':
      return { ...state, styleOptions: action.payload };

    case 'GO_BACK':
      if (state.history.length > 1) {
        const newHistory = [...state.history];
        newHistory.pop();
        const previousState = newHistory[newHistory.length - 1];
        return {
          ...state,
          currentState: previousState,
          history: newHistory,
          canGoBack: newHistory.length > 1,
        };
      }
      return state;

    case 'RESET_APP':
      return {
        ...initialState,
        styleOptions: state.styleOptions, // Keep style preferences
      };

    case 'RESTORE_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

interface AppContextValue extends AppContextState {
  dispatch: React.Dispatch<AppAction>;
  
  // Helper methods
  setState: (state: AppState) => void;
  setResumeData: (data: ResumeData | null) => void;
  setParsedData: (data: ResumeData | null) => void;
  setLoading: (loading: boolean) => void;
  setFileName: (name: string | null) => void;
  setTemplate: (template: Template) => void;
  setStyleOptions: (options: StyleOptions) => void;
  navigateToState: (state: AppState) => void;
  goBack: () => void;
  resetApp: () => void;
  
  // State persistence
  saveState: () => void;
  restoreState: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // State persistence
  const saveState = useCallback(() => {
    if (typeof window !== 'undefined') {
      const stateToSave = {
        resumeData: state.resumeData,
        currentState: state.currentState,
        fileName: state.fileName,
        template: state.template,
        styleOptions: state.styleOptions,
      };
      localStorage.setItem('resumeforge-state', JSON.stringify(stateToSave));
    }
  }, [state.resumeData, state.currentState, state.fileName, state.template, state.styleOptions]);

  const restoreState = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedState = localStorage.getItem('resumeforge-state');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          dispatch({ type: 'RESTORE_STATE', payload: parsedState });
        }
      } catch (error) {
        console.error('Failed to restore state:', error);
      }
    }
  };

  // Auto-save state on changes
  useEffect(() => {
    saveState();
  }, [state.resumeData, state.currentState, state.template, state.styleOptions, saveState]);

  // Restore state on mount
  useEffect(() => {
    restoreState();
  }, []);

  // Helper methods
  const setState = (newState: AppState) => dispatch({ type: 'SET_STATE', payload: newState });
  const setResumeData = (data: ResumeData | null) => dispatch({ type: 'SET_RESUME_DATA', payload: data });
  const setParsedData = (data: ResumeData | null) => dispatch({ type: 'SET_PARSED_DATA', payload: data });
  const setLoading = (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading });
  const setFileName = (name: string | null) => dispatch({ type: 'SET_FILE_NAME', payload: name });
  const setTemplate = (template: Template) => dispatch({ type: 'SET_TEMPLATE', payload: template });
  const setStyleOptions = (options: StyleOptions) => dispatch({ type: 'SET_STYLE_OPTIONS', payload: options });
  const navigateToState = (newState: AppState) => dispatch({ type: 'SET_STATE', payload: newState });
  const goBack = () => dispatch({ type: 'GO_BACK' });
  const resetApp = () => dispatch({ type: 'RESET_APP' });

  const value: AppContextValue = {
    ...state,
    dispatch,
    setState,
    setResumeData,
    setParsedData,
    setLoading,
    setFileName,
    setTemplate,
    setStyleOptions,
    navigateToState,
    goBack,
    resetApp,
    saveState,
    restoreState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
