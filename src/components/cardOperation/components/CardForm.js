import _ from 'lodash';
import React from 'react';
import { Button, Input, Form, Modal } from 'antd';
import styles from './CardForm.cssmodule.scss';

class CardForm extends React.Component {
  state = {
    content: this.props.isAdd ? '' : _.get(this.props.content, 'value')
  };
  handChangeContent = e => {
    this.setState({ content: e.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const { changeShowModal, handleAddEdit } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const val = await handleAddEdit(values);
        console.log(val);
        changeShowModal();
      }
    });
  };
  componentWillUnmount() {
    this.onSubmit = null;
    this.handChangeContent = null;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isAdd, changeShowModal, showModal } = this.props;
    const { content } = this.state;
    const { TextArea } = Input;
    const title = isAdd ? '添加' : '编辑';
    return (
      <Modal title={title} visible={showModal} closable={false} footer={null}>
        <Form onSubmit={this.onSubmit}>
          <Form.Item>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入卡片详情！' }],
              validateTrigger: ['onBlur', 'onChange']
            })(
              <div className={styles.content}>
                <span>卡片详情：</span>
                <TextArea
                  onChange={this.handChangeContent}
                  autoFocus
                  placeholder="请输入卡片详情"
                  value={content}
                  rows={4}
                />
              </div>
            )}
          </Form.Item>
          <div className={styles.fromfooter}>
            <Button onClick={changeShowModal}>取消</Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(CardForm);
