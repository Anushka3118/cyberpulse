import './App.css';

import MapComponent from './components/MapComponent';
import Charts from './components/Charts';
import Alerts from './components/Alerts';
import AttackFeed from './components/AttackFeed';
import Awareness from './components/Awareness';
import StoryMode from './components/StoryMode';
import AISection from "./components/AISection";

function App() {
  return (
    <div className="App">
      <h1>🚨 Cyber Attack Dashboard</h1>
      <h2>🌍 CyberPulse Map (Demo)</h2>

      <MapComponent />
      <Charts />
      <Alerts />
      <AttackFeed />
      <StoryMode />
      <Awareness />
      <AISection />
    </div>
  );
}

export default App;