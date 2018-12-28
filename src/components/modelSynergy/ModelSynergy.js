import React, { Component } from "react";
import Helmet from "react-helmet";
import { HashRouter as Router, Route } from "react-router-dom";
import Consultation from "./components/Consultation";
class ModelSynergy extends Component {
  state = {
    data: this.props.data || []
  };
  render() {
    const { data } = this.state;
    return (
      <Router>
        <div>
          <Helmet title={"模型协商"} />
          <Route
            exact
            path="/project/model-synergy/consultation"
            children={props => <Consultation data={data} {...props} />}
          />
        </div>
      </Router>
    );
  }
}
const data = [];
for (let i = 1; i < 10; i++) {
  const obj = {};
  obj.key = i;
  obj.value = `模型协同会商名称啊啊啊哦呃
  是多少来考察呃${i}`;
  obj.moduleName = "XX大厦一楼";
  obj.version = "v12.3";
  obj.author = "豆豆皮 ";
  obj.time = "2018/07/22  14:23";
  data.push(obj);
}

ModelSynergy.defaultProps = {
  data
};

export default ModelSynergy;
