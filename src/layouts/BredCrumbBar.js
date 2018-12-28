import _ from "lodash";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Breadcrumb, Icon } from "antd";
import styles from "./BredCrumbBar.cssmodule.scss";

class ModelDifferenceBar extends React.Component {
  onChangeRoute = path => {
    const { routes, history } = this.props;
    const index = _.findIndex(routes, p => p.path === path);
    const newPath = routes[index !== 0 ? index - 1 : 0].path;
    history.push(newPath);
  };
  render() {
    const { routes } = this.props;
    const len = routes.length;
    const extraBreadcrumbItems = routes.map((p, index) => {
      const { path, text, isLink, hasDel } = p;
      const isActive = len - 1 === index;
      let activeClassName = "";
      let disabled = {};
      if (isActive) {
        activeClassName = "active";
        disabled = { disabled: "disabled" };
      }
      if (isLink) {
        if (hasDel) {
          return (
            <Breadcrumb.Item key={path} className={activeClassName}>
              <Link to={path} {...disabled}>
                {text}
              </Link>
              <Icon type="close" onClick={() => this.onChangeRoute(path)} />
            </Breadcrumb.Item>
          );
        }
        return (
          <Breadcrumb.Item key={path} className={activeClassName}>
            <Link to={path} {...disabled}>
              {text}
            </Link>
          </Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={path} className={activeClassName}>
          {text}
        </Breadcrumb.Item>
      );
    });

    return (
      <div className={styles.root}>
        <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
      </div>
    );
  }
}
export default withRouter(ModelDifferenceBar);
