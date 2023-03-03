import React from 'react';
import { List, Select } from 'antd';
import { Card, Button, Space } from 'antd';
import { useState } from 'react';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import GAME_ABI from '@/service/gameComposableNFT.json';

const Mint: React.FC = () => {
  const [tokenId] = useState(1);

  const getTokenURI = (tokenId: number) => {
    return useContractRead({
      address: '0x842b364bfe72440BA08E1A73FcAcfEc87FabC9f3',
      abi: GAME_ABI,
      functionName: 'tokenURI',
      args: [tokenId],
    });
  };

  console.log(getTokenURI(1).data);
  const getSlotsInfo = (tokenId: number) => {
    return useContractRead({
      address: '0x842b364bfe72440BA08E1A73FcAcfEc87FabC9f3',
      abi: GAME_ABI,
      functionName: 'getTokenSlotsInfo',
      args: [tokenId],
    });
  };
  console.log(getSlotsInfo(tokenId).data);

  //console.log(data);

  const mint = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: '0x842b364bfe72440BA08E1A73FcAcfEc87FabC9f3',
    abi: GAME_ABI,
    functionName: 'mint',
    args: [
      'https://gateway.pinata.cloud/ipfs/QmVeugxfKTUoy7tsKck4QkQA55pW4y8jP8DJtFHorRgA8y',
      //baseNFTTokenID
      0,
      //mintRoyaltyFee Unit:wei
      1,
      //marketRoyaltyFraction Unit:<10000
      1,
      //newUsageFee Unit:wei
      1,
    ],
  });
  console.log(mint.data);

  const attachBatch = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: '0x842b364bfe72440BA08E1A73FcAcfEc87FabC9f3',
    abi: GAME_ABI,
    functionName: 'attachBatch',
    // slotIds,slotAssetTokenIds,amount
    args: [tokenId, [], [], []],
  });

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

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
            onClick={() => mint.write()}
          >
            Mint
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Mint;
