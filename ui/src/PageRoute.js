import {Route, Switch} from 'react-router-dom';

import App from "./pages/App";
import Page404 from "./pages/page404";

const route = function (props) {
    return (<Switch>
        <Route exact path="/" component={App}/>
        {/*<Route exact path="/login" component={Login} />*/}
        <Route path="/" component={Page404}/>
    </Switch>);
}

export default route;