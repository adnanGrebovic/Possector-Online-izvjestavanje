import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import App from './app';
import data from './data/ConfigureData';

// ----------------------------------------------------------------------


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


    root.render(
      <StrictMode>
        <Provider store={data}>
          <HelmetProvider>
            <BrowserRouter>
              <Suspense>
                <App />
              </Suspense>
            </BrowserRouter>
          </HelmetProvider>
        </Provider>
      </StrictMode>
    );
  
