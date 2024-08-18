'use client';

import { useAtom } from 'jotai';
import { modeAtom, modeLoading } from '@/store/mode';

export const useMode = () => {
  const [mode, setMode] = useAtom(modeAtom);
  const [changeModeLoading, setChangeModeLoading] = useAtom(modeLoading);

  const modeName = mode === 1 ? 'موسیقی' : mode === 2 ? 'پادکست' : mode === 3 ? 'مداحی' : 'سخنرانی';
  const changeMode = (mode: number) => setMode(mode);
  return {
    changeMode,
    modeName,
    mode,
    setMode,
    changeModeLoading,
    setChangeModeLoading,
  };
};
