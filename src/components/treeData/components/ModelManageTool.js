import _ from 'lodash';
import React, { Component } from 'react';
import { Popconfirm, Modal } from 'antd';
import ToolButtonEdit from './ToolButtonEdit';
import AddForm from './AddForm';

import styles from './ModelManageTool.cssmodule.scss';

class ModelManageTool extends Component {
  state = {
    showAddModal: false
  };

  feedBackAuth = () => {
    const { userProfile } = this.props;
    const { members, currentReviewItem } = this.props;
    const feedBackAuthMember = members.filter(
      item => item.userId === userProfile.userId && item.roleId === 110
    )[0];
    if (
      !_.isEmpty(feedBackAuthMember) &&
      currentReviewItem &&
      feedBackAuthMember.participantCompanyId === currentReviewItem.participantCompanyId
    ) {
      return true;
    }
    return false;
  };

  getPaddingHeight = () => {
    const { modelVersionList, editedModel } = this.props;
    const selectVersion = modelVersionList.find(
      item => item.modelAuditId === editedModel.modelAuditId
    );
    return selectVersion || {};
  };
  showAddModal = () => {
    this.setState({
      showAddModal: true
    });
  };
  getModelVersionsList = () => {};
  render() {
    const { onEdit, deleteModel = () => {}, currentReviewItem, hasEditGrant } = this.props;
    const { showAddModal } = this.state;

    return (
      <div className={styles.root}>
        <ToolButtonEdit
          title="新建"
          icon="fas fa-pencil-alt"
          onClick={this.showAddModal}
          disabled={!hasEditGrant}
          style={{
            height: 28,
            width: 74,
            position: 'relative',
            zIndex: 10,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0
          }}
          className={styles.newButton}
        />
        <Modal
          title="新建"
          width={520}
          footer={null}
          onCancel={this.handleCancel}
          visible={showAddModal}
          bodyStyle={{ minWidth: 520 }}
        >
          <AddForm submit={this.editPlanHandle} cancel={this.handleCancel} />
        </Modal>
        <ToolButtonEdit
          title="编辑"
          icon="fas fa-pencil-alt"
          onClick={onEdit}
          disabled={_.isEmpty(currentReviewItem)}
          style={{
            marginLeft: '-1px',
            height: 28,
            width: 74,
            position: 'relative',
            zIndex: 2,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0
          }}
        />

        <Popconfirm title="确认删除吗？" onConfirm={() => deleteModel()}>
          <ToolButtonEdit
            title="删除"
            type="danger"
            icon="far fa-fw fa-trash-alt"
            disabled={_.isEmpty(currentReviewItem)}
            style={{
              marginLeft: '-1px',
              height: 28,
              width: 74,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0
            }}
          />
        </Popconfirm>
      </div>
    );
  }
}
export default ModelManageTool;
