import React from 'react';

import { ReactComponent as Sun } from '@/assets/icons/brightness-high.svg';
import { ReactComponent as Moon } from '@/assets/icons/moon.svg';
import UtilBtn from '@/components/common/UtilBtn';
import { useThemeMode } from '@/context/ThemeProvider';

export default React.memo(function ThemeBtn() {
  const [themeMode, toggleThemeMode] = useThemeMode();

  return (
    <UtilBtn blindText={'다크모드 설정'} onClick={toggleThemeMode} mode={themeMode}>
      {themeMode === 'light' ? (
        <Sun width={24} height={24} viewBox="0 0 16 16" />
      ) : (
        <Moon width={24} height={24} viewBox="0 0 16 16" />
      )}
    </UtilBtn>
  );
});
