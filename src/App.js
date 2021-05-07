import Gallery from './Gallery';

import './App.css';
import { Button, Tabs } from 'antd';

export const App = () => {
  const { TabPane } = Tabs;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">Image Repository</h1>
        <p>(Shopify Application)</p>
        <Button type="primary">Upload a Picture</Button>
      </header>
      <div className="App-body">
        <Tabs defaultActiveKey="1" type="card" size="large" centered>
          <TabPane tab="Gallery" key="1">
            <Gallery />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
