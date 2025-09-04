"use client";

import React, { createContext, useContext, useState } from 'react';
import type { Template, StyleOptions } from '@/lib/types';

type TemplateContextType = {
  template: Template;
  setTemplate: (t: Template) => void;
  styleOptions: StyleOptions;
  setStyleOptions: (s: StyleOptions) => void;
  openEditorRequest: boolean;
  requestOpenEditor: () => void;
  clearOpenEditorRequest: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const defaultStyleOptions: StyleOptions = {
  fontFamily: 'Inter',
  fontSize: '11pt',
  color: '#000000',
  margin: '1.5cm',
  lineHeight: '1.4',
  skillSpacing: '0.5rem',
};

const TemplateContext = createContext<TemplateContextType>({
  template: 'ats',
  setTemplate: () => {},
  styleOptions: defaultStyleOptions,
  setStyleOptions: () => {},
  openEditorRequest: false,
  requestOpenEditor: () => {},
  clearOpenEditorRequest: () => {},
  favorites: [],
  toggleFavorite: () => {},
});

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [template, setTemplate] = useState<Template>('ats');
  const [styleOptions, setStyleOptions] = useState<StyleOptions>(defaultStyleOptions);
  const [openEditorRequest, setOpenEditorRequest] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const requestOpenEditor = () => setOpenEditorRequest(true);
  const clearOpenEditorRequest = () => setOpenEditorRequest(false);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
  <TemplateContext.Provider value={{ template, setTemplate, styleOptions, setStyleOptions, openEditorRequest, requestOpenEditor, clearOpenEditorRequest, favorites, toggleFavorite }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplateContext() {
  return useContext(TemplateContext);
}

export default TemplateContext;
