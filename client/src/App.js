import './App.css';
import Layout from './components/Layout.jsx';
function App() {
  console.log(process.env.REACT_APP_BASE_URL)
  return (
    <>
      <Layout/>
    </>
  );
}
export default App;
