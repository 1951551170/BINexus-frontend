import { UploadOutlined } from '@ant-design/icons';
import { genChartByAiAsyncUsingPOST, genChartByAiUsingPOST } from '@/services/binexus/chartController';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { Button, Card, Form, Input, Select, Space, Upload, message } from 'antd';
import { useForm } from 'antd/es/form/Form';

/**
 * 添加图表(异步)页面
 * 
 */
const addChartAsync: React.FC = () => {
  const [from] = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);

  /**
   * 提交
   */
  const onFinish = async (values: any) => {
    //避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);

    const params = {
      ...values,
      file: undefined
    }
    try {
      const res = await genChartByAiAsyncUsingPOST(params, {}, values.file.file.originFileObj)
      if (!res?.data) {
        message.error("分析失败")
      } else {
        message.success("分析任务提交成功，稍后可在我的图表页面查看结果");
        from.resetFields();
      }
    } catch (e: any) {
      message.error("分析失败") + e.message;
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart-async">
      <Card title="智能分析">
        <Form
          form={from}
          name="addChart"
          labelAlign='left'
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item name="goal" label="分析目标" rules={[{ required: true, message: '请输入分析目标!' }]}>
            <TextArea placeholder='请输入你的分析需求，比如：分析网站的用户增长情况' />
          </Form.Item>

          <Form.Item name="name" label="图表名称">
            <Input placeholder='请输入图表名称' />
          </Form.Item>

          <Form.Item
            name="chartType"
            label="图表类型"
          >
            <Select
              options={[
                { value: '折线图', label: '折线图' },
                { value: '柱状图', label: '柱状图' },
                { value: '堆叠图', label: '堆叠图' },
                { value: '饼图', label: '饼图' },
                { value: '雷达图', label: '雷达图' },
              ]} />
          </Form.Item>

          <Form.Item name="file" label="原始数据">
            <Upload name="file" maxCount={1}>
              <Button icon={<UploadOutlined />}>上传CSV文件</Button>
            </Upload>
          </Form.Item>


          <Form.Item wrapperCol={{ span: 16, offset: 5 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default addChartAsync;
