import React from 'react';
import { List, Select } from 'antd';
import { useAccount, configureChains, chain } from 'wagmi';
import { Card, Button, Space } from 'antd';
import { useState } from 'react';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const Mint: React.FC = () => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const { address } = useAccount();

  const ModuleList = [
    { nftId: 0, tokenURI: 'www.baidu.com', charges: true },
    { nftId: 1, tokenURI: 'www.baidu.com', charges: true },
  ];

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <div>
      <div className=" flex gap-2">
        <Select
          showSearch
          placeholder="Select a Game NFT Template"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'tom',
              label: 'Tom',
            },
          ]}
        />

        <Select
          showSearch
          placeholder="Select a Game Module"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'tom',
              label: 'Tom',
            },
          ]}
        />
      </div>

      <div>
        {
          <List
            grid={{
              gutter: 16,
              column: 4,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={ModuleList}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title="NFT Module"
                  extra={<a>X</a>}
                  style={{
                    width: '300px',
                    height: '250px',
                    border: 'solid',
                    padding: '10px',
                    margin: '10px',
                  }}
                >
                  <p>{item.nftId}</p>
                  <p>{item.tokenURI}</p>
                  <p>{item.charges}</p>
                </Card>
              </List.Item>
            )}
          />
        }
      </div>

      <div>
        <Space direction="vertical">
          <Button
            type="primary"
            loading={loadings[0]}
            onClick={() => enterLoading(0)}
          >
            Mint
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Mint;
