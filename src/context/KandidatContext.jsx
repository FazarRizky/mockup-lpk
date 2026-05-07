import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getItem, setItem } from '../utils/localStorage';
import seedKandidat from '../data/seedKandidat';

const STORAGE_KEY = 'simpel_lpk_kandidat';

const KandidatContext = createContext(null);

export function KandidatProvider({ children }) {
  const [kandidatList, setKandidatList] = useState(() => {
    const stored = getItem(STORAGE_KEY, null);
    if (stored && Array.isArray(stored) && stored.length > 0) return stored;
    setItem(STORAGE_KEY, seedKandidat);
    return seedKandidat;
  });

  useEffect(() => {
    setItem(STORAGE_KEY, kandidatList);
  }, [kandidatList]);

  const addKandidat = useCallback((data) => {
    const newKandidat = {
      ...data,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      status: 'Pending Review',
    };
    setKandidatList((prev) => [newKandidat, ...prev]);
    return newKandidat;
  }, []);

  const updateStatus = useCallback((id, newStatus) => {
    setKandidatList((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: newStatus } : k))
    );
  }, []);

  const deleteKandidat = useCallback((id) => {
    setKandidatList((prev) => prev.filter((k) => k.id !== id));
  }, []);

  const getKandidatById = useCallback(
    (id) => kandidatList.find((k) => k.id === id) || null,
    [kandidatList]
  );

  const getApprovedOnly = useCallback(
    () => kandidatList.filter((k) => k.status === 'Approved' || k.status === 'Diminati Sales'),
    [kandidatList]
  );

  const resetData = useCallback(() => {
    setItem(STORAGE_KEY, seedKandidat);
    setKandidatList(seedKandidat);
  }, []);

  const value = {
    kandidatList,
    addKandidat,
    updateStatus,
    deleteKandidat,
    getKandidatById,
    getApprovedOnly,
    resetData,
  };

  return <KandidatContext.Provider value={value}>{children}</KandidatContext.Provider>;
}

export function useKandidat() {
  const ctx = useContext(KandidatContext);
  if (!ctx) {
    throw new Error('useKandidat harus dipakai di dalam <KandidatProvider />');
  }
  return ctx;
}
