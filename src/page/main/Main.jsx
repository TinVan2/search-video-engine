import React, { Suspense } from 'react';
import { Switch, useParams, Route } from 'react-router';
import { LazySearchBox, LazyVideoDetailPlayer } from '../../RoutingConfig';
import TopFilterBox from '../result/TopFilterBox';

const Main = (props) => {
    const params = useParams();
    return (
        <div className="vh-100 wh-100">
            <TopFilterBox />
            <Suspense fallback={<></>}>
                <Switch>
                    <Route path="/search-video/:keywork" render={(props) => <LazySearchBox {...props} />} />
                    <Route path="/video/:videoId" render={(props) => <LazyVideoDetailPlayer {...props} />} />
                </Switch>
            </Suspense>
        </div>
    );
};

export default Main;
