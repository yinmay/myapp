import _ from 'lodash';
import React from 'react';

import DropdownComponent from './components/DropdownComponent';
import RightView from './components/RightView';
import styles from './ConditionScreening.cssmodule.scss';

class ConditionScreening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.listItems
    };
  }
  changDataSource = obj => {
    const { listItems } = this.props;
    const filterItems = [...listItems];
    let itmes = [];
    if (!_.isEmpty(obj)) {
      _.reduce(
        obj,
        (result, value, key) => {
          const result2 = _.filter(result, p => {
            const regStr = new RegExp(value);
            return regStr.test(p[key]);
          });
          itmes = result2;
          return result2;
        },
        filterItems
      );
    } else {
      itmes = [...listItems];
    }
    this.setState({ dataSource: itmes });
  };
  changDataCancel = () => {
    const { listItems } = this.props;
    const filterItems = [...listItems];
    this.setState({ dataSource: filterItems });
  };
  render() {
    const { attrs } = this.props;
    const { dataSource } = this.state;
    // this.props.history.push('/project/selector');
    return (
      <div
        className={styles.root}
      >
        <div className={styles.left}>
          <DropdownComponent
            attrs={attrs}
            changDataSource={this.changDataSource}
            changDataCancel={this.changDataCancel}
          />
        </div>
        <div className={styles.right}>
          <RightView dataSource={dataSource} />
        </div>
      </div>
    );
  }
}

const listItems = [];

for (let i = 1; i < 30001; i++) {
  const obj = {};
  obj.key = `${i}`;
  obj.A = `台风A${i}`;
  obj.B = `台风B${i}`;
  obj.C = `台风C${i}`;
  obj.D = `台风D${i}`;
  obj.E = `台风E${i}`;
  obj.value = `台风A${i},台风B${i},台风C${i},台风D${i},台风E${i}`;
  listItems.push(obj);
}
const attrs = [
  { key: '1', value: 'A' },
  { key: '2', value: 'B' },
  { key: '3', value: 'C' },
  { key: '4', value: 'D' },
  { key: '5', value: 'E' }
];

ConditionScreening.defaultProps = {
  attrs: [...attrs],
  listItems: [...listItems]
};

export default ConditionScreening;
