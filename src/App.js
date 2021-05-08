import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import axios from 'axios';

import './App.css';
import { Button, Tabs, Modal, Form, Input } from 'antd';

const pageImageLimit = 6;

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
        // On success, update images locally (mutation) without invalidating cache
        setNumImages(numImages + 1);
        // Last page is at capacity
        if (numImages % pageImageLimit === 0) {
          const lastPageIndex = numImages/pageImageLimit
          setImages(prevImages => ({ ...prevImages, [lastPageIndex+1]: [{name: values.name, path: values.url, rowid: res.data.last_row_id}] }));
        } else {
          const lastPageIndex = Math.ceil(numImages/pageImageLimit)
          setImages(prevImages => ({ ...prevImages, [lastPageIndex]: [...prevImages[lastPageIndex], {name: values.name, path: values.url, rowid: res.data.last_row_id}] }));
        }
      });
    setIsModalVisible(false);
  }

  const [numImages, setNumImages] = useState(0);
  const [images, setImages] = useState({});
  const [currPage, setCurrPage] = useState(1);

  // Fetch and cache number of image records on first load for pagination purposes
  useEffect(() => {
    axios.get('/get_num_image_records')
      .then(res => {
        setNumImages(res.data.num_image_records);
      });
  }, []);

  const fetchImages = (limit, offset) => {
    axios.get('/get_images', { params: { limit, offset }})
      .then(res => {
        setImages(prevImages => ({ ...prevImages, [currPage]: res.data.images }));
      });
  }

  useEffect(() => {
    fetchImages(pageImageLimit, 0);
  }, []);

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
            <Gallery
              numImages={numImages}
              images={images}
              setImages={setImages}
              currPage={currPage}
              setCurrPage={setCurrPage}
              fetchImages={fetchImages}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
