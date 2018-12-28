import _ from "lodash";
import React from "react";
import { Select, Button, Icon, Input } from "antd";
import { withRouter } from "react-router";

import styles from "./DropdownComponent.cssmodule.scss";

class DropdownComponent extends React.Component {
  state = {
    clickEvent: null,
    eventType: null,
    current: null,
    attrs: this.props.attrs,
    selectedItems: this.props.defaultSelects || []
  };
  onClick(event) {
    console.log(event); // => nullified object.
    console.log(event.type); // => "click"
    const eventType = event.type; // => "click"

    setTimeout(function() {
      console.log(event.type); // => null
      console.log(eventType); // => "click"
    }, 0);

    // Won't work. this.state.clickEvent will only contain null values.
    this.setState({ clickEvent: event });

    // You can still export event properties.
    this.setState({ eventType: event.type });
  }
  handleChangeSelect(value) {
    const { attrs } = this.state;
    this.setState({ current: _.find(attrs, { key: value }) });
  }

  handleClickAddSelected() {
    const { attrs, selectedItems, current } = this.state;
    if (current !== null) {
      const newSelectedItem = [...selectedItems, current];
      const newAttrs = attrs.filter(p => p.key !== current.key);
      this.setState({
        selectedItems: newSelectedItem,
        attrs: newAttrs,
        current: null
      });
    }
  }

  handleClickDeleteSelected(key) {
    const { attrs, selectedItems } = this.state;
    const delItem = _.find(selectedItems, { key });
    const newAttrs = [...attrs, delItem];
    const newSelectedItem = selectedItems.filter(p => p.key !== delItem.key);
    this.setState({ selectedItems: newSelectedItem, attrs: newAttrs });
  }

  handleClickSure() {
    const { changDataSource } = this.props;
    const { selectedItems } = this.state;
    const obj = [...selectedItems];
    const result = {};
    _.map(obj, p => {
      const inputName = "input";
      const newKey = inputName + p.key;
      result[p.value] = this[newKey].input.value;
    });
    changDataSource(result);
  }

  handleClickCancel() {
    const { changDataCancel } = this.props;
    this.formList.reset();
    changDataCancel();
  }

  render() {
    console.log(this);
    const { attrs, selectedItems, current } = this.state;
    const disabled = { disabled: current !== null ? "" : "disabled" };
    const inputName = "input";
    return (
      <div className={styles.root}>
        <div className={styles.select}>
          <div>
            <Select
              onChange={value => this.handleChangeSelect(value)}
              value={_.get(current, "value")}
            >
              {attrs.map(({ key, value }) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </div>
          <Button
            title="添加"
            type="primary"
            {...disabled}
            onClick={() => this.handleClickAddSelected()}
          >
            <Icon type="plus" />添加
          </Button>
        </div>
        <div className={styles.form}>
          <form
            ref={el => {
              this.formList = el;
            }}
          >
            {selectedItems.map(({ key, value }) => (
              <div key={key} className={styles.selected}>
                <div className={styles.text} title={value}>
                  <div>{value}</div>
                </div>
                <div className={styles.input}>
                  <Input
                    placeholder="请输入内容"
                    ref={input => {
                      const newname = inputName + key;
                      this[newname] = input;
                    }}
                  />
                </div>
                <div className={styles.btn}>
                  <Button
                    size="small"
                    onClick={() => this.handleClickDeleteSelected(key)}
                  >
                    <Icon type="delete" />
                  </Button>
                </div>
              </div>
            ))}
          </form>
        </div>
        <div onClick={e => this.onClick(e)} className={styles.footer}>
          <Button>测试</Button>
          <Button onClickCapture={() => this.handleClickCancel()}>取消</Button>
          <Button type="primary" onClick={() => this.handleClickSure()}>
            确定
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(DropdownComponent);
