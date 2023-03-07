import { List, Select, notification } from 'antd';
import { Card, Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { useEffect, useState, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { ethers } from 'ethers';
import { useSigner } from 'wagmi';
import { getTokenURIs, tokenMintRoyaltyInfo, mint } from '@/service/contract';

interface GameNftMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  spike_info: SpikeInfo;
  attributes: attribute[];
}

interface attribute {
  trait_type: string;
  name: string;
  type: string;
  description: string;
  uri: string;
  size: number;
}

interface SpikeInfo {
  version: string;
  type: string;
  url: string;
}

interface GameTemplate {
  label: string;
  value: string;
}

interface ModuleTemplate {
  label: string;
  value: string;
}

const Mint = () => {
  useEffect(() => {
    initGameNftSelectData();
  }, []);

  const { data: signer } = useSigner();

  const [gameTemplate, setGameTemplate] = useState<GameTemplate[]>([]);
  const [selectedGameTemplate, setSelectedGameTemplate] = useState<number>(-1);
  const [selectedModuleTemplate, setSelectedModuleTemplate] =
    useState<number>(-1);
  const [mintingModuleData, setMintingModuleData] = useState<attribute[]>([]);

  const [moduleTemplate, setModuleTemplate] = useState<ModuleTemplate[]>([]);
  const [gameTokenId, setGameTokenId] = useState<string>('-1');
  //模块模版  tokenId 和 slotId的对应关系
  // const tokenIdToSlotId = new Map([
  //   [2, 2],
  //   [3, 3],
  //   [4, 4],
  // ]);

  const [open, setOpen] = useState(false);
  const nameRef = useRef<string>();
  const descriptionRef = useRef();
  const mintRoyaltyFeeRef = useRef();
  const marketRoyaltyFractionRef = useRef();
  const newUsageFeeRef = useRef();

  async function initGameNftSelectData() {
    //写死的游戏模版库tokenId列表
    const gameNftSelectData: GameTemplate[] = [];
    const gameTempalteTokenId: number[] = [1];
    for (let i = 0; i < gameTempalteTokenId.length; i++) {
      const tokenUri = await getTokenURIs(
        signer as ethers.Signer,
        gameTempalteTokenId[i],
      );
      console.log('tokenUri: ', tokenUri);
      await fetch(
        tokenUri +
          '?pinataGatewayToken=-KN8pJpq7hJ4kipqWyKUv9IYlB-Uq_D5mDfQa8c_WgWsfOmGQZZXP6rMPv7AX6zC',
      )
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          console.log('game : ');
          gameNftSelectData.push({
            value: gameTempalteTokenId[i] + '',
            label: body.name,
          });
        })
        .catch(() => {
          console.log('err');
        });
    }
    setGameTemplate(gameNftSelectData);

    //写死的模块模版库tokenId列表
    const moduleNftSelectData: ModuleTemplate[] = [];
    const moduleTempalteTokenId: number[] = [2, 3, 4];
    for (let i = 0; i < moduleTempalteTokenId.length; i++) {
      const tokenUri = await getTokenURIs(
        signer as ethers.Signer,
        moduleTempalteTokenId[i],
      );
      await fetch(
        tokenUri +
          '?pinataGatewayToken=-KN8pJpq7hJ4kipqWyKUv9IYlB-Uq_D5mDfQa8c_WgWsfOmGQZZXP6rMPv7AX6zC',
      )
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          console.log('game : ');
          moduleNftSelectData.push({
            value: moduleTempalteTokenId[i] + '',
            label: body.attributes.name,
          });
        })
        .catch(() => {
          console.log('err');
        });
    }
    setModuleTemplate(moduleNftSelectData);
  }

  const onGameTemplateChange = async (value: string) => {
    console.log(`selected game token id: ${value}`);
    //查询游戏内的模块tokenId列表
    // const slotIds = await getSlotsInfo(
    //   signer as ethers.Signer,
    //   parseInt(value),
    // );
    // console.log('slotIds : ', slotIds);
    // const moduleDataList: ModuleData[] = [];
    // for (let i = 0; i < slotIds.length; i++) {
    // check isFilled
    // if (slotIds[i][3] == false) {
    //   console.log('not fillled');
    //   continue;
    // }
    // const tokenUri = await getTokenURIs(
    //   signer as ethers.Signer,
    //   slotIds[i][2].toNumber(),
    // );
    // console.log('tokenUri: ', tokenUri);
    // await fetch(tokenUri)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((body) => {
    //     console.log('attr : ', body.attributes);
    //     moduleDataList.push({
    //       slotId: slotIds[i][0].toNumber(),
    //       name: body.name,
    //       description: body.description,
    //       tokenId: slotIds[i][2].toNumber(),
    //       tokenUri: tokenUri,
    //       attribute: body.attributes,
    //     });
    //   })
    //   .catch(() => {
    //     console.log('err');
    //   });
    // }
    // setMintingModuleData(moduleDataList);
    // setSelectedGameTemplate(parseInt(value));
    const tokenUri = await getTokenURIs(
      signer as ethers.Signer,
      parseInt(value),
    );
    console.log('tokenUri: ', tokenUri);
    await fetch(
      tokenUri +
        '?pinataGatewayToken=-KN8pJpq7hJ4kipqWyKUv9IYlB-Uq_D5mDfQa8c_WgWsfOmGQZZXP6rMPv7AX6zC',
    )
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        console.log('attr : ', body.attributes);
        setMintingModuleData(body.attributes);
      })
      .catch(() => {
        console.log('err');
      });
    setSelectedGameTemplate(parseInt(value));
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const removeSingleModule = (data: any) => {
    if (data.type == 'fixed' || data.name == 'modular.json') {
      notification.open({
        message: '',
        description: 'The module is fixed',
        onClick: () => {
          console.log('');
        },
      });
      return;
    }
    const moduleList: attribute[] = [];
    mintingModuleData.map((item) => {
      if (item.name != data.name) {
        moduleList.push({
          trait_type: item.trait_type,
          name: item.name,
          description: item.description,
          type: item.type,
          uri: item.uri,
          size: item.size,
        });
      }
    });
    setMintingModuleData(moduleList);
  };

  const PINATA_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NzllY2VjYy1lN2Q3LTQ0NGItYTcyZS02NzM1YTJlYTQ1ZmQiLCJlbWFpbCI6ImFzaHRvbmNoZW44M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2NlYjYzNTBkN2Y5NDZkYThiMzMiLCJzY29wZWRLZXlTZWNyZXQiOiI5MWI1YTQ4OGUwM2I4YWVlODVkYzFlZDgzM2JlMjFjMDMyYmJkNjg2YzMzNDRhMjJkMjRjOTFmMWYzY2EzYzU0IiwiaWF0IjoxNjc4MTYwNjMyfQ.NWeXskjkQjsO9RkX2MuZT_yqWQ-JnE6Gq3rVLQS_bNg';

  async function pinJson(data: string) {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + PINATA_JWT,
      },
      data: data,
    };

    return axios(config);
  }

  const uploadData = async (metadata: GameNftMetadata) => {
    const data = await pinJson(JSON.stringify(metadata));
    //https://gateway.pinata.cloud/ipfs
    console.log(data.data);
    return data.data;
  };

  const onModuleTemplateChange = (value: string) => {
    if (selectedGameTemplate == -1) {
      notification.open({
        message: '',
        description: 'please select a game template',
        onClick: () => {
          console.log('');
        },
      });
      return;
    }
    console.log(`selected module token id -----`);
    setSelectedModuleTemplate(parseInt(value));
    console.log(`selected module token id: ${value}`);
  };

  const addModule = async () => {
    if (selectedModuleTemplate === -1) {
      console.log('-1');
      return;
    }
    const tokenUri = await getTokenURIs(
      signer as ethers.Signer,
      selectedModuleTemplate,
    );
    const moduleList: attribute[] = [];

    await fetch(
      tokenUri +
        '?pinataGatewayToken=-KN8pJpq7hJ4kipqWyKUv9IYlB-Uq_D5mDfQa8c_WgWsfOmGQZZXP6rMPv7AX6zC',
    )
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        console.log('attr : ', body.attributes);
        for (let i = 0; i < mintingModuleData.length; i++) {
          //暂时屏蔽重复模块的过滤条件
          if (body.name == mintingModuleData[i].name) {
            notification.open({
              message: '',
              description: 'The module is redundant',
              onClick: () => {
                console.log('');
              },
            });
            return;
          }
        }

        mintingModuleData.map((item) => {
          moduleList.push({
            trait_type: item.trait_type,
            name: item.name,
            type: item.type,
            description: item.description,
            uri: item.uri,
            size: item.size,
          });
        });
        moduleList.push(body.attributes);
      })
      .catch(() => {
        console.log('err');
      });
    console.log('selectedModuleTemplate', selectedModuleTemplate);

    setMintingModuleData(moduleList);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    setOpen(false);
    if (
      nameRef.current == undefined ||
      descriptionRef.current == undefined ||
      mintRoyaltyFeeRef.current == undefined ||
      marketRoyaltyFractionRef.current == undefined ||
      newUsageFeeRef.current == undefined
    ) {
      notification.open({
        message: '',
        description: 'param error',
        onClick: () => {
          console.log('');
        },
      });
      return;
    }
    const name = nameRef.current.input.value;
    const description = descriptionRef.current.input.value;
    const mintRoyaltyFee = mintRoyaltyFeeRef.current.input.value;
    const marketRoyaltyFraction = marketRoyaltyFractionRef.current.input.value;
    const newUsageFee = newUsageFeeRef.current.input.value;
    console.log('name: ', name);
    console.log('description: ', description);
    console.log('mintRoyaltyFee: ', mintRoyaltyFee);
    console.log('marketRoyaltyFraction: ', marketRoyaltyFraction);
    console.log('newUsageFee: ', newUsageFee);
    const modulesMetadata: attribute[] = [];
    for (let i = 0; i < mintingModuleData.length; i++) {
      modulesMetadata.push(mintingModuleData[i]);
    }

    const gameNftMetadata: GameNftMetadata = {
      name: name,
      description: description,
      image: '',
      external_url: '',
      spike_info: {
        version: '1',
        type: 'Game',
        url: 'placeholder for icon',
      },
      attributes: modulesMetadata,
    };
    const pinataRes = await uploadData(gameNftMetadata);
    const tokenUri = 'https://oasis.mypinata.cloud/ipfs/' + pinataRes.IpfsHash;
    console.log('tokenUri: ', tokenUri);
    const fee = await tokenMintRoyaltyInfo(
      signer as ethers.Signer,
      selectedGameTemplate,
    );
    console.log('fee: ', fee);
    const { receipt } = await mint(
      signer as ethers.Signer,
      tokenUri,
      selectedGameTemplate,
      mintRoyaltyFee,
      marketRoyaltyFraction,
      newUsageFee,
      fee,
    );
    const tokenId = receipt.events[0].topics[3];
    //console.log('tokenid: ', tokenId);
    // notification.open({
    //   message: '',
    //   description: 'The game nft tokenId is ' + parseInt(gameTokenId, 16),
    //   onClick: () => {
    //     console.log('');
    //   },
    // });
    setGameTokenId(tokenId);
  };

  // async function attachBatchSlot() {
  //   if (gameTokenId == '-1') {
  //     notification.open({
  //       message: '',
  //       description: 'The game nft has no valid token id',
  //       onClick: () => {
  //         console.log('');
  //       },
  //     });
  //     return;
  //   }
  //   const slotIds: number[] = [];
  //   const tokenIds: number[] = [];
  //   const amounts: number[] = [];
  //   console.log('mintingModuleData: ', mintingModuleData);
  //   for (let i = 0; i < mintingModuleData.length; i++) {
  //     slotIds.push(mintingModuleData[i].slotId);
  //     tokenIds.push(mintingModuleData[i].tokenId);
  //     amounts.push(1);
  //   }
  //   await attachBatch(
  //     signer as ethers.Signer,
  //     parseInt(gameTokenId, 16),
  //     slotIds,
  //     tokenIds,
  //     amounts,
  //   );
  // }

  return (
    <div>
      <div className=" flex gap-2">
        <p>please select a game NFT Template : </p>
        <Select
          showSearch
          placeholder="Select a Game NFT Template"
          optionFilterProp="children"
          onChange={onGameTemplateChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={gameTemplate}
        />
        <p>please add a game module</p>
        <Select
          showSearch
          placeholder="Select a Game Module"
          optionFilterProp="children"
          onChange={onModuleTemplateChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={moduleTemplate}
        />
        <Button onClick={() => addModule()}>add module</Button>
      </div>

      <div>
        {
          <List
            size="large"
            grid={{
              gutter: 10,
              column: 4,
            }}
            dataSource={mintingModuleData}
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
                  extra={
                    <button
                      style={{
                        display:
                          item.type == 'fixed' || item.name == 'modular.json'
                            ? 'none'
                            : 'inline',
                      }}
                      onClick={() => removeSingleModule(item)}
                    >
                      X
                    </button>
                  }
                >
                  <p>description: {item.description}</p>
                </Card>
              </List.Item>
            )}
          />
        }
      </div>
      <Button type="primary" onClick={showDrawer}>
        mint
      </Button>
      {/* <Button
        type="primary"
        style={{ margin: '20px' }}
        onClick={() => attachBatchSlot()}
      >
        attach module
      </Button> */}
      <div>
        <Drawer
          title="Create a new strategy"
          width={500}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onSubmit} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter name',
                    },
                  ]}
                >
                  <Input ref={nameRef} placeholder="your nft name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="description"
                  label="description"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter game nft description',
                    },
                  ]}
                >
                  <Input
                    ref={descriptionRef}
                    placeholder="your game nft description"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="mintRoyaltyFee"
                  label="mintRoyaltyFee"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter mintRoyaltyFee',
                    },
                  ]}
                >
                  <Input
                    ref={mintRoyaltyFeeRef}
                    placeholder="your nft mintRoyaltyFee"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="marketRoyaltyFraction"
                  label="marketRoyaltyFraction"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter game nft marketRoyaltyFraction',
                    },
                  ]}
                >
                  <Input
                    ref={marketRoyaltyFractionRef}
                    placeholder="your game nft marketRoyaltyFraction"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="newUsageFee"
                  label="newUsageFee"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter newUsageFee',
                    },
                  ]}
                >
                  <Input
                    ref={newUsageFeeRef}
                    placeholder="your nft newUsageFee"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default Mint;
