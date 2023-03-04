import { useEffect, useState } from 'react';
import { Card, List, notification } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd/es/radio';

interface ModuleNftData {
  name: string;
  description: string;
  tokenId: number;
}

const ModuleNftList = () => {
  const [loading, setLoading] = useState(false);
  const [moduleNftData, setData] = useState<ModuleNftData[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const backHome = () => {
    navigate('/home');
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const data = location.state;
    console.log('locationData: ', data);
    const showData: ModuleNftData[] = [];
    if (data.length == 0) {
      notification.open({
        message: '',
        description: 'The game nft has no valid module nft',
        onClick: () => {
          console.log('');
        },
      });
    }
    for (let i = 0; i < data.length; i++) {
      showData.push({
        tokenId: data[i].tokenId,
        name: data[i].name,
        description: data[i].description,
      });
    }
    setData(showData);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div>
      <Button onClick={() => backHome()}>back home</Button>
      <List
        size="large"
        grid={{
          gutter: 10,
          column: 4,
        }}
        dataSource={moduleNftData}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{
                width: '100%',
                height: '250px',
                margin: '20px',
                border: 'solid',
                position: 'relative',
              }}
              title={item.name}
            >
              <p>description: {item.description}</p>
              <p>tokenId: {item.tokenId}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ModuleNftList;
