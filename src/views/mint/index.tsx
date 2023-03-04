import React from 'react';
import { List, Select } from 'antd';
import { Card, Button, Space } from 'antd';
import { useState } from 'react';
import { useContractRead, useContractWrite, useSigner } from 'wagmi';
import GAME_ABI from '@/service/gameComposableNFT.json';
import { ethers } from 'ethers';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PINATA_JWT } from '@/constants';
import { getTokenURIs, getTokenIdsFromAddress, mint } from '@/service/contract';

function Test() {
  const info = useContractRead({
    address: '0x9bcF34b02ba3960F25c1430840F73E8ffc27f68f',
    abi: GAME_ABI,
    functionName: 'getTokenSlotsInfo',
    args: [1],
  });
  console.log(info);
}

const Mint: React.FC = () => {
  const [tokenId] = useState(1);
  const [address] = useState('0x0607125636AAeBf08F1b8f94ce284c62302D890B');
  const { data: signer } = useSigner();
  // const pinJson = (data: string) => {
  //   const config: AxiosRequestConfig = {
  //     method: 'post',
  //     url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: PINATA_JWT,
  //     },
  //     data: data,
  //   };

  //   const res = axios(config);
  //   return res;
  // };

  async function pinJson(data: string) {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'Content-Type': 'application/json',
        Authorization: PINATA_JWT,
      },
      data: data,
    };

    return axios(config);
  }

  const getData = async () => {
    const data = await pinJson(JSON.stringify(GAME_ABI));
    console.log(data.data);
  };
  //getData();

  const getTokenURI = (tokenId: number) => {
    return useContractRead({
      address: '0x9bcF34b02ba3960F25c1430840F73E8ffc27f68f',
      abi: GAME_ABI,
      functionName: 'tokenURI',
      args: [tokenId],
    });
  };

  console.log('tokenURI: ' + getTokenURI(1).data);
  const getSlotsInfo = (tokenId: number) => {
    return useContractRead({
      address: '0x9bcF34b02ba3960F25c1430840F73E8ffc27f68f',
      abi: GAME_ABI,
      functionName: 'getTokenSlotsInfo',
      args: [tokenId],
    });
  };
  console.log('SlotsInfo: ' + getSlotsInfo(tokenId).data);

  // const getTokenIdsFromAddress = (address: string) => {
  //   return useContractRead({
  //     address: '0x9bcF34b02ba3960F25c1430840F73E8ffc27f68f',
  //     abi: GAME_ABI,
  //     functionName: 'balanceOfTokens',
  //     args: [address],
  //   });
  // };
  // console.log(
  //   'getTokenIdsFromAddress: ' + getTokenIdsFromAddress(address).data,
  // );

  const mintNFT = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: '0x9bcF34b02ba3960F25c1430840F73E8ffc27f68f',
    abi: GAME_ABI,
    functionName: 'mint',
    args: [
      'https://demo.eclair.spike.network/Demo.json',
      //baseNFTTokenID
      0,
      //mintRoyaltyFee Unit:wei
      1,
      //marketRoyaltyFraction Unit:<10000
      1,
      //newUsageFee Unit:wei
      1,
    ],
    overrides: {
      // payable
      value: ethers.utils.parseEther('0'),
    },
  });
  //console.log(mint.data);

  const attachBatch = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: '0x9bcF34b02ba3960F25c1430840F73E8ffc27f68f',
    abi: GAME_ABI,
    functionName: 'attachBatch',
    // slotIds,slotAssetTokenIds,amount
    args: [tokenId, [1], [2], [1]],
  });

  const getTokenMintRoyaltyInfo = (tokenId: number) => {
    return useContractRead({
      address: '0x9bcF34b02ba3960F25c1430840F73E8ffc27f68f',
      abi: GAME_ABI,
      functionName: 'tokenMintRoyaltyInfo',
      args: [tokenId],
    });
  };
  console.log(getTokenMintRoyaltyInfo(tokenId).data);

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
            // onClick={async () => {
            //   const aaa = await getTokenIdsFromAddress(signer as ethers.Signer);
            //   console.log('test2', aaa);
            // }}
            onClick={async () => {
              const aaa = await mint(
                signer as ethers.Signer,
                'https://demo.eclair.spike.network/Demo.json',
                0,
                1,
                1,
                1,
                '0',
              );
              console.log('mint receipt: ', aaa);
            }}
          >
            Mint
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Mint;
