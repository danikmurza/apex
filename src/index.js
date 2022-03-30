import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './component/App';


const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(<App/>)

