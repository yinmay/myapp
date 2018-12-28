import React, { Component } from "react";
import { Tooltip, Card } from "antd";
import styles from "./Consultation.cssmodule.scss";
import AddConsultation from "./AddConsultation";
class Consultation extends Component {
  render() {
    const { data } = this.props;
    // console.log(data);

    const listItems = data.map(p => {
      const { key, value, moduleName, version, author, time } = p;

      return (
        <Card
          style={{
            margin: 6
          }}
          className={styles.item}
          bordered={false}
          key={key}
          actions={[<a>查看</a>]}
        >
          12313
        </Card>
      );
    });
    return (
      <div className={styles.root}>
        <div className={styles.card}>
          {" "}
          <AddConsultation />
          {listItems}
        </div>
      </div>
    );
  }
}
export default Consultation;
