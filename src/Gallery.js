import { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, Image, Button, Row, Col } from 'antd';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/get_images')
      .then(res => {
        setImages(res.data.images);
      });
  }, []);

  return (
    <Row gutter={[8, 8]}>
      {images.map((image, i) => (
        <Col span={8} className="col" key={i}>
          <Card
            title={image.name}
            style={{ width: 300 }}
          >
            <Image src={image.path} style={{ borderRadius: 4 }}/>
            <Button type="primary">Buy</Button>
          </Card>
        </Col>
      ))}
    </Row>
  ) 
}

export default Gallery;
