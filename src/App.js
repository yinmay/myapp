import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import ConditionScreening from "./components/dropdown/ConditionScreening";
import CardOperation from "./components/cardOperation/CardOperation";
import ModelSynergy from "./components/modelSynergy/ModelSynergy";
import TreeData from "./components/treeData/TreeData";
import TableComponent from './components/table/TableComponent'
import CheckAll from './components/checkAll/Index'
import ControlHeight from './components/controlHeight/ControlHeight'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <Link to="/dome1">示例demo1</Link>
            <Link to="/dome2" style={{ marginLeft: "20px" }}>
              示例demo2
            </Link>
            <Link
              to="/project/model-synergy/consultation"
              style={{ marginLeft: "20px" }}
            >
              /model-synergy
            </Link>
            <Link
              to="/project/tree-data"
              style={{ marginLeft: "20px" }}
            >
              /TreeData
            </Link>
            <Link
              to="/project/table"
              style={{ marginLeft: "20px" }}
            >
             /table
            </Link>
            <Link
              to="/project/check-all"
              style={{ marginLeft: "20px" }}
            >
             /check-all
            </Link>
            <Link
              to="/project/control-height"
              style={{ marginLeft: "20px" }}
            >
             /控制高度Control height
            </Link>
          </div>
          <hr />
          <Route exact path="/dome1" component={ConditionScreening} />
          <Route path="/dome2" component={CardOperation} />
          <Route
            path="/project/model-synergy/consultation"
            component={ModelSynergy}
          />
          <Route
            path="/project/tree-data"
            component={TreeData}
          />
            <Route
            path="/project/table"
            component={TableComponent}
          />
           <Route
            path="/project/check-all"
            component={CheckAll}
          />
          <Route
            path="/project/control-height"
            component={ControlHeight}
          />
        </div>
      </Router>
    );
  }
}

export default App;
