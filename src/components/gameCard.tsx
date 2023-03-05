import { useEffect, useState } from 'react';
import { useSigner } from 'wagmi';
import { Card, List, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  getTokenIdsFromAddress,
  getTokenURIs,
  getSlotsInfo,
} from '@/service/contract';
import { ethers } from 'ethers';

export interface GameNftData {
  name: string;
  description: string;
  tokenId: number;
  tokenUri: string;
}

function GameNftList() {
  const { data: signer } = useSigner();
  const [loading, setLoading] = useState(false);
  const [gameNftData, setGameNftData] = useState<GameNftData[]>([]);
  const navigate = useNavigate();

  //获取该钱包地址下的game nft
  async function getData() {
    if (loading) {
      return;
    }
    setLoading(true);
    const tokenIdList = await getTokenIdsFromAddress(signer as ethers.Signer);
    console.log('tokenId: ', tokenIdList);
    const tokenUriList: GameNftData[] = [];
    for (let i = 0; i < tokenIdList.length; i++) {
      const tokenUri = await getTokenURIs(
        signer as ethers.Signer,
        tokenIdList[i].toNumber(),
      );
      console.log('tokenUri: ', tokenUri);
      tokenUriList.push({
        tokenId: tokenIdList[i].toNumber(),
        name: '',
        tokenUri: tokenUri,
        description: '',
      });
    }
    const showData: GameNftData[] = [];
    for (let i = 0; i < tokenUriList.length; i++) {
      await fetch(tokenUriList[i].tokenUri)
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          //排除模块nft
          if (body.spike_info.type == 'Game') {
            console.log('game : ');
            showData.push({
              name: body.name,
              description: body.description,
              tokenId: tokenUriList[i].tokenId,
              tokenUri: tokenUriList[i].tokenUri,
            });
          }
        })
        .catch(() => {
          console.log('err');
          setLoading(false);
        });
    }
    setLoading(false);
    setGameNftData(showData);
  }

  const handleGameNftInfo = async (data: any) => {
    const slotIds = await getSlotsInfo(signer as ethers.Signer, data.tokenId);
    console.log('slotIds : ', slotIds);
    const tokenUriList: GameNftData[] = [];
    for (let i = 0; i < slotIds.length; i++) {
      // check isFilled
      if (slotIds[i][3] == false) {
        console.log('not fillled');
        continue;
      }
      console.log('tokenId : ', slotIds[i][2].toNumber());
      const tokenUri = await getTokenURIs(
        signer as ethers.Signer,
        slotIds[i][2].toNumber(),
      );
      console.log('tokenUri: ', tokenUri);
      tokenUriList.push({
        tokenId: slotIds[i][2].toNumber(),
        name: '',
        tokenUri: tokenUri,
        description: '',
      });
    }

    const showData: GameNftData[] = [];
    for (let i = 0; i < tokenUriList.length; i++) {
      await fetch(tokenUriList[i].tokenUri)
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          //排除模块nft
          if (body.spike_info.type == 'Modular') {
            console.log('game : ');
            showData.push({
              name: body.name,
              description: body.description,
              tokenId: tokenUriList[i].tokenId,
              tokenUri: tokenUriList[i].tokenUri,
            });
          }
        })
        .catch(() => {
          console.log('err');
          setLoading(false);
        });
    }
    navigate('/module', { state: showData });
  };

  useEffect(() => {
    console.log('');
  }, []);

  return (
    <div>
      <Button onClick={() => getData()}>query your game nft</Button>
      <List
        size="large"
        grid={{
          gutter: 10,
          column: 4,
        }}
        dataSource={gameNftData}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{
                width: '100%',
                height: '250px',
                border: 'solid',
                position: 'relative',
                margin: '20px',
              }}
              extra={
                <button onClick={() => handleGameNftInfo(item)}>info</button>
              }
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
}

export default GameNftList;
