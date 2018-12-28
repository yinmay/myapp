import _ from 'lodash';
import React from 'react';
import { Form, Input, Select, Divider } from 'antd';
import ToolButton from './ToolButton';


import styles from './AddForm.cssmodule.scss';

const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 }
  }
};

class AddForm extends React.PureComponent {
  state = {
    selectedModelId: null,

    model: {}
  };

  componentDidMount = async () => {
    // this.getModels();
    // await this.props.getModelsList();
  };




  render() {
    const {
      form: { getFieldDecorator },
      loading = false,
      cancel
    } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <Form onSubmit={this.submitHandle} hideRequiredMark>
            <Form.Item label="名称" colon={false} hasFeedback {...FORM_ITEM_LAYOUT}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '必填' }, { max: 20, message: '最多20个字' }]
              })(<Input placeholder="请输入" size="small" />)}
            </Form.Item>
          </Form>
        </div>
        <Divider style={{ marginTop: 0, marginBottom: 0 }} />
        <div className={styles.control}>
          <ToolButton
            title="取消"
            icon="fas fa-fw fa-times"
            style={{ marginRight: 6 }}
            onClick={cancel}
            disabled={loading}
            loading={loading}
          />
          <ToolButton
            type="primary"
            title="确定"
            icon="fas fa-fw fa-check"
            onClick={this.submitHandle}
            disabled={loading}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

/** 将presetValue属性(预设值)传入到field中, 否则无法实现,因为field组件中的value等会被antd form组件自动设定 */
const mapPropsToFields = props => {
  // 设定presetValues时, 会依据内容自动对item.value进行加工(如设定数据等)
  const { item } = props;
  if (_.isObject(item)) {
    return _.transform(item, (result, value, key) =>
      _.set(result, key, Form.createFormField({ value }))
    );
  }
  return {};
};

export default Form.create({ mapPropsToFields })(AddForm);
// export default Form.create()(LaunchForm);
