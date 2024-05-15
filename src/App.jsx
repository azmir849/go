import { HashRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <>
      <div>
         <HashRouter>
            <AppRouter />
         </HashRouter>
       </div>  
    </>
  )
}

export default App
