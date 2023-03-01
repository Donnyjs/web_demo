import { useEffect, useState } from 'react';
import { Image, List } from 'antd';

interface DataType {
  address: string;
  tokenId: number;
  tokenUri: string;
  avatar: {
    url: string;
  };
  description: string;
}

const AssetCardList = () => {
  const demoData: DataType[] = [
    {
      address: '0x123',
      tokenId: 1,
      tokenUri: 'ipfs://xxx1',
      avatar: {
        url: 'url1',
      },
      description: 'demoNft',
    },
    {
      address: '0x234',
      tokenId: 1,
      tokenUri: 'ipfs://xxx2',
      avatar: {
        url: 'url2',
      },
      description: 'demoNft2',
    },
    {
      address: '0x567',
      tokenId: 1,
      tokenUri: 'ipfs://xxx3',
      avatar: {
        url: 'url3',
      },
      description: 'demoNft3',
    },
  ];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setData(demoData);

    // setLoading(true);
    // fetch('xxx')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.tokenId}>
            <List.Item.Meta
              avatar={
                <Image src="https://i0.hdslb.com/bfs/article/50e7b051652ff64ebce4632a26d65de44ea27a8e.jpg@942w_1338h_progressive.webp" />
              }
              title={<a href="https://ant.design">{item.tokenUri}</a>}
              description={item.description}
            />
            <div>Content</div>
          </List.Item>
        )}
      />{' '}
    </div>
  );
};

export default AssetCardList;
