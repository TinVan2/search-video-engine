import { Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import { LazyMain, LazySearchBox } from './RoutingConfig';

function App() {
    const history = useHistory();
    return (
        // <div className="App">
        //   <header className="App-header">
        //     <p>
        //       Video search engine
        //     </p>
        //     <VideoPlayer />
        //   </header>
        // </div>
        <Suspense fallback={<></>}>
            <BrowserRouter>
                <>
                    <Switch>
                        <Route path="/home" render={(props) => <LazySearchBox {...props} />} />
                        <Route path="/" render={(props) => <LazyMain {...props} />} />
                    </Switch>
                </>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
