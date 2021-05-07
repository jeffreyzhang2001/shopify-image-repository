import React, { useState } from 'react';
import Gallery from './Gallery';
import axios from 'axios';

import './App.css';
import { Button, Tabs, Modal, Form, Input } from 'antd';

export const App = () => {
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        handleAddPicture(values);
      })
      .catch(info => {
        console.log('Validation Failed:', info);
      });
  }

  const handleAddPicture = (values) => {
    axios.post('/add_image', {
      name: values.name,
      path: values.url
    })
      .then(res => {
        console.log(res.data.last_row_id); 
      });
    setIsModalVisible(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">Image Repository</h1>
        <p>(Shopify Application)</p>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>Add a Picture</Button>
        <Modal
          title="Add a Picture"
          visible={isModalVisible}
          onOk={onModalOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "This field is required."
                }
              ]}
            >
              <Input
                placeholder="Enter the name for your image"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="url"
              label="URL"
              rules={[
                {
                  required: true,
                  message: "This field is required."
                },
                {
                  type: "url",
                  message: "This field must be a valid url."
                }
              ]}
            >
              <Input
                placeholder="Enter an image URL here"
                type="url"
              />
            </Form.Item>
          </Form>
        </Modal>
      </header>
      <div className="App-body">
        <Tabs defaultActiveKey="1" type="card" size="large" centered>
          <TabPane tab="Gallery" key="1">
            <Gallery />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
