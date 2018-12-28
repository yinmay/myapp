import _ from 'lodash';
import React, { Component } from 'react';
import { Tree, Icon, Input } from 'antd';
import ModelManageTool from './components/ModelManageTool';
import styles from './TreeData.cssmodule.scss';


/** 将扁平化的嵌套数组转换为嵌套化的对象数组
 * @param {array} planList 要转换的扁平化数组
 * @param {(item, key) => bool} filter 扁平化数组中每个对象的匹配规则
 * @param {item => key} keygen 使用扁平化数组中的对象生成新的key
 * @param {any} init 初始key
 * @param {string} nestPath 嵌套对象结构中的对象挂载属性
 * @param {item => object} trans 扁平化数组中的对象的结构转换
 * @author ro6in
 */
const nestedListRecursion = (
    planList,
    {
      init = 0,
      nestPath = 'children',
      // trans = item => Object.assign({}, item),
      trans,
      filter = 'parentId',
      keygen = 'id'
    } = {}
  ) => {
    // 支持filter与keygen为字符串时的便捷调用方式
    const fileterFunc = _.isString(filter) ? (item, key) => _.get(item, filter) === key : filter;
    const keygenFunc = _.isString(keygen) ? item => _.get(item, keygen) : keygen;
  
    const trave = (list, key) => {
      const matchs = list.filter(item => fileterFunc(item, key));
      if (!_.isEmpty(matchs)) {
        return matchs.map(item => {
          const fat = _.isUndefined(trans) ? item : trans(item);
          const son = trave(list, keygenFunc(item));
          if (!_.isUndefined(son)) {
            _.set(fat, nestPath, son);
          }
  
          return fat;
        });
      }
      return undefined;
    };
  
    return trave(planList, init) || [];
  };

class ModelProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: this.props.treeData.sort((a, b) => a.order > b.order),
      expandedKeys: [],
      current: '',
      hasEditGrant: {},
      autoExpandParent: true,
      upDown: true
    };
  }
  onSelect = (selectedKeys, info) => {
    const { treeData } = this.state;
    const key = selectedKeys[0] || info.node.props.eventKey;
    this.setState(prevState => {
      const oldExpandedKeys = [...prevState.expandedKeys];
      const index = oldExpandedKeys.indexOf(key);
      if (!~index) {
        oldExpandedKeys.push(key);
      } else {
        oldExpandedKeys.splice(index, 1);
      }
      const selectId = +key;

      let current = '';
      if (selectedKeys[0]) {
        current = treeData.filter(p => p.id === selectId);
        current.key = key;
      }
      return { expandedKeys: _.uniq(_.compact(oldExpandedKeys)), current, autoExpandParent: false };
    });
  };

  onCheck = (e, key) => {
    e.stopPropagation();
    console.log(key);
  };

  onMoveUp = (e, parms) => {
    e.stopPropagation();
    this.moveFun({ parms, direction: 'up' });
  };
  moveFun = ({ parms, direction = 'up' }) => {
    this.setState({ upDown: false }, () => {
      const { treeData } = this.state;
      const { id, parentId } = parms;
      const parentIdData = treeData.filter(p => p.parentId === parentId);
      const index = _.findIndex(parentIdData, p => p.id === id);
      const { order } = parentIdData[index];
      const changeindex = direction === 'up' ? index - 1 : index + 1;
      const changeOrder = parentIdData[changeindex].order;
      const changeId = parentIdData[changeindex].id;
      for (let i = 0; i < treeData.length; i++) {
        const item = treeData[i];
        if (item.id === id) {
          item.order = changeOrder;
        }
        if (item.id === changeId) {
          item.order = order;
        }
      }
      this.setState({ treeData: treeData.sort((a, b) => a.order > b.order), upDown: true });
    });
  };
  // 移动函数
  onMoveDown = (e, parms) => {
    e.stopPropagation();
    this.moveFun({ parms, direction: 'down' });
  };
  handleAddTreeData = () => {
    const { treeData, current } = this.state;
    console.log(current);
  };

  onChange = e => {
    const { value } = e.target;
    const { treeData } = this.state;
    const getExpandedKeys = (value1, treeData1) => {
      const expandedKeys = [];
      const getParentKey = (key, treeData2) => {
        const filterTreeData = treeData1.filter(p => p.id === key);
        const { parentId } = filterTreeData[0];
        expandedKeys.push(parentId);
        if (parentId !== 0) {
          getParentKey(parentId, treeData2);
        }
      };
      treeData1.map(item => {
        if (item.name.indexOf(value1) > -1) {
          return getParentKey(item.id, treeData1);
        }
        return null;
      });
      return expandedKeys;
    };
    let expandedKeys = getExpandedKeys(value, treeData);
    expandedKeys = _.uniq(_.compact(expandedKeys)).map(item => String(item));
    this.setState({
      expandedKeys,
      autoExpandParent: true
    });
  };

  render() {
    const { TreeNode } = Tree;
    const { Search } = Input;
    const { treeData, expandedKeys, current, hasEditGrant, autoExpandParent, upDown } = this.state;
    const orderTreeData = treeData;
    this.treeDatalist = nestedListRecursion(orderTreeData, {
      init: 0,
      trans: item => ({
        name: item.name,
        key: item.id,
        type: item.type,
        parentId: item.parentId
      }),
      filter: 'parentId'
    });
    const loop = (data, path = '') =>
      data.map((item, index) => {
        const currentPath = path.length === 0 ? item.key : `${path}/${item.key}`;
        const title = (
          <span>
            <span>{item.name}</span>
            <a
              className={styles.check}
              onClick={e => this.onMoveUp(e, { id: item.key, parentId: item.parentId })}
              disabled={index === 0}
            >
              上移
            </a>
            <a
              className={styles.check}
              onClick={e => this.onMoveDown(e, { id: item.key, parentId: item.parentId })}
              disabled={index === data.length - 1}
            >
              下移
            </a>
            <a className={styles.check} onClick={e => this.onCheck(e, currentPath)}>
              查看
            </a>
          </span>
        );
        if (item.children && item.children.length) {
          return (
            <TreeNode
              icon={<Icon type="smile-o" />}
              key={item.key}
              title={title}
              allKey={currentPath}
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            icon={<Icon type="smile-o" />}
            key={item.key}
            title={title}
            allKey={currentPath}
          />
        );
      });
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <div>
            <ModelManageTool
              currentReviewItem={current}
              hasEditGrant={hasEditGrant}
              handleAddTreeData={this.handleAddTreeData}
            />
          </div>
          <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
          <Tree
            showLine
            showIcon
            onSelect={this.onSelect}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(this.treeDatalist)}
          </Tree>
        </div>
      </div>
    );
  }
}
const treeData = [
  { id: 1, parentId: 0, order: 1, type: 'danti', name: '教学楼' },
  { id: 6, parentId: 0, order: 2, type: 'liushuidun', name: 'liushuidun6' },
  { id: 2, parentId: 1, order: 1, type: 'zhuanye', name: '专业2' },
  { id: 3, parentId: 2, order: 2, type: 'louceng', name: '楼层3' },
  { id: 4, parentId: 3, order: 1, type: 'zidingyi', name: 'zidingyi4' },
  { id: 5, parentId: 4, order: 1, type: 'liushuidun', name: 'liushuidun5' },
  { id: 7, parentId: 2, order: 1, type: 'louceng', name: '楼层7' },
  { id: 8, parentId: 7, order: 1, type: 'liushuidun', name: 'liushuidun8' },
  { id: 9, parentId: 6, order: 1, type: 'liushuidun', name: 'liushuidun9' },
  { id: 10, parentId: 4, order: 2, type: 'liushuidun', name: 'liushuidun10' }
];

ModelProcess.defaultProps = {
  treeData
};

export default ModelProcess;
