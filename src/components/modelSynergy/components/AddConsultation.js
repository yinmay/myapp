import React from "react";
import { Icon } from "antd";
import styles from "./AddConsultation.cssmodule.scss";

const AddConsultation = props => {
  const { handleAdd } = props;
  return (
    <div className={styles.root}>
      <Icon type="plus" />
      <span>发起会商</span>
    </div>
  );
};
export default AddConsultation;
