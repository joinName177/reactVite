import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from './src/context/AppContext';
import CardBrowseScreen from './src/screens/CardBrowseScreen';
import CardFormScreen from './src/screens/CardFormScreen';
import SettingsScreen from './src/screens/SettingsScreen';

function AppContent() {
  const { screen } = useApp();

  if (screen === 'form') return <CardFormScreen />;
  if (screen === 'settings') return <SettingsScreen />;
  return <CardBrowseScreen />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <StatusBar style="dark" />
    </AppProvider>
  );
}
