import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import FullscreenDemo from './experiments/FullscreenDemo';
import D3BarChart from './experiments/D3BarChart';
import DFSVisualization from './experiments/DFSVisualization';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fullscreen" element={<FullscreenDemo />} />
          <Route path="/d3-bar-chart" element={<D3BarChart />} />
          <Route path="/dfs-visualization" element={<DFSVisualization />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
