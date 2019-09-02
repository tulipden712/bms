import React from 'react';
// import PropTypes from 'prop-types';
import { Tooltip, Select } from 'antd';

const Option = Select.Option;

interface SelectAntdProps {
  title: string,
  loading: boolean,
  data: any[]
}

class SelectAntd extends React.Component<SelectAntdProps> {
  static defaultProps: Partial<SelectAntdProps> = {
    title: '',
    loading: false,
    data: []
  };

  /* static propTypes: Partial<SelectAntdProps> = {
    title: PropTypes.string,
    loading: PropTypes.bool,
    data: PropTypes.array
  }; */

  state = {
    selectedItems: []
  };

  renderOptions = (data: any) => {
    return (data || []).map((item: any) => {
      return (
        <Option value={`${item.key}`} key={item.key}>
          {item.value}
        </Option>
      );
    });
  };

  render() {
    const {
      title,
      loading,
      // showArrow,
      // allowClear,
      // mode,
      // labelInValue,
      // value,
      // maxTagTextLength,
      // maxTagCount,
      // maxTagPlaceholder,
      // onChange,
      // placeholder,
      data,
      // style,
      ...rest
    } = this.props;
    const { selectedItems } = this.state;
    const filteredOptions = data.filter(
      o => !selectedItems.map((e: any) => {
        return e.key;
      }).includes(o.key)
    );

    return (
      <Tooltip title={title}>
        <Select loading={loading} {...rest}>
          {this.renderOptions(filteredOptions)}
        </Select>
      </Tooltip>
    );
  }
};

export default SelectAntd;
