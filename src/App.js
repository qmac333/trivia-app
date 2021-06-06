import logo from './logo.svg';
import Trophy from "./Pictures/sports-icon.png"
import './App.css';
import CategoryButtons from './CategoryButtons';
import { Layout, Avatar } from 'antd';

const { Header, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="Head">
          <h1><img className="avatar-left" src={Trophy}/>Trivia Battle<img className="avatar-right" src={Trophy}/></h1>
        </Header>
        <main className="main-content">
          <CategoryButtons />
        </main>
        <Footer className="Foot">Trivia App Created by Quentin MacFarlane</Footer>
      </Layout>
    </div>
  );
}

export default App;
