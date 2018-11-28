import React from "react";
import { persistStore } from "redux-persist";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import Layout from "./components/Layout";
import DocViewer from "./containers/DocViewer";

import store from "./redux/store";
import ReactLoading from "react-loading";
//import {getTopicMapVersion, getTopicMapHash} from './constants/versions';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { rehydrated: true };
  }

  componentWillMount() {
    // console.log("............................................................................................")
    // console.log("....................... TopicMaps Wuppertal ("+getTopicMapVersion()+")")
    // console.log("....................... BuildNumber: "+getTopicMapHash())
    // console.log("............................................................................................")
    
    persistStore(store, null, () => {
      let thisHere = this;
      console.log('persistStore ');
      
      setTimeout(() => {
        thisHere.setState({ rehydrated: true });
      }, 1);
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        <div>
          <main>
            <ReactLoading
              style={{ margin: "auto", width: "30%", height: "60%", padding: "50px" }}
              type="spin"
              color="#444"
            />
          </main>
        </div>
      );
    } else {
      return (
        <div>
          <main>
            <Route component={Layout} />
            <Switch>
              <Route exact path="/:topic?/:docPackageId?/:file?" component={DocViewer} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      );
    }
  }
}
