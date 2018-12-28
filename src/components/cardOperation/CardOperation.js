import _ from "lodash";
import React from "react";
import { Button, Icon, Input } from "antd";
import styles from "./CardOperation.cssmodule.scss";
import CardForm from "./components/CardForm";

class CardOperation extends React.Component {
  state = {
    current: null,
    data: this.props.dataResourcesa,
    showModal: false,
    isAdd: false
  };

  changeShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleClickAdd = () => {
    this.setState({ isAdd: true, showModal: true });
  };

  handleClickEdit = () => {
    this.setState({ isAdd: false, showModal: true });
  };

  handleClickDelete = () => {
    this.setState({ current: null });
  };

  handleClickChangeCurrent(key) {
    const { data } = this.state;
    const newCurrent = _.find(data, { key });

    this.setState(prevState => {
      const { current } = prevState;
      if (current !== null && current.key === key) {
        return { current: null, content: null };
      }
      return { current: newCurrent };
    });
  }
  onSearchThrottle = kw => {
    const { dataResourcesa } = this.props;
    console.log(kw);
    const result = _.filter(dataResourcesa, p => {
      const regStr = new RegExp(kw);
      return regStr.test(p.value);
    });
    console.log(result);
    this.setState({ data: result });
  };
  handleAddEdit = async values =>
    new Promise(resolve => {
      setTimeout(() => resolve(console.log(values)), 2000);
    });

  render() {
    const { data: dataArr, current, showModal, isAdd } = this.state;
    const disabled = { disabled: current !== null ? "" : "disabled" };
    const currentKey = _.get(current, "key");
    return (
      <div className={styles.root}>
        {showModal && (
          <CardForm
            isAdd={isAdd}
            showModal={showModal}
            content={current}
            changeShowModal={this.changeShowModal}
            handleAddEdit={this.handleAddEdit}
          />
        )}
        <div className={styles.head}>
          <Button onClick={this.handleClickAdd}>
            <Icon type="plus" />
          </Button>
          <Button {...disabled} onClick={this.handleClickEdit}>
            <Icon type="edit" />
          </Button>
          <Button {...disabled} onClick={this.handleClickDelete}>
            <Icon type="delete" />
          </Button>
          <div className={styles.search}>
            <Input.Search
              placeholder="输入卡片关键字"
              enterButton={
                <Icon
                  type="search"
                  className={styles.icon}
                  onClick={this.onSearchThrottle}
                />
              }
              // onChange={e => this.onSearchThrottle(e.target.value)}
              onSearch={this.onSearchThrottle}
            />
          </div>
        </div>
        <div className={styles.lists}>
          {dataArr.map(({ key, value }) => (
            <div
              onClick={() => this.handleClickChangeCurrent(key)}
              className={currentKey === key ? styles.itemActive : styles.item}
              key={key}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const dataResourcesa = [];
for (let i = 0; i < 10; i++) {
  const obj = {};
  obj.key = i;
  obj.value = `第${i +
    1}个列表项目的内容数据,这里的内容很长很长这里的内容很长很长这里的内容很长很长这里的内容很长很长132456464216`;
  dataResourcesa.push(obj);
}
CardOperation.defaultProps = {
  dataResourcesa
};

export default CardOperation;
