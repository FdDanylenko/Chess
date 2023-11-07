import { createContext } from 'react';

const AppContext = createContext({
  showPromotionDialog: () => {}, // Функція за умовчанням
});

export default AppContext;