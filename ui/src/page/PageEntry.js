import { Switch, Route } from 'react-router-dom'

import Login from './Login';
import Layout from './Layout';

const PageEntry = function (props) {

    return (
        <Switch>
            <Route exact path="/" component={Layout} />
            <Route exact path="/login" component={Login} />
            <Route path="/" component={Layout} />
        </Switch>
    )
}

export default PageEntry;