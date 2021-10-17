import './App.css';
import Home from './Home';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1f2023;
  padding: 20px;
`
function App() {
  return (
    <AppContainer>
        <Home/>
    </AppContainer>
  );
}

export default App;
