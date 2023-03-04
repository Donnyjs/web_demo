import { BigNumber, ethers } from 'ethers';
import GAME_ABI from '@/service/gameComposableNFT.json';

export const getGameNFTContract = (signer: ethers.Signer): ethers.Contract => {
  return new ethers.Contract(
    '0x9bcF34b02ba3960F25c1430840F73E8ffc27f68f',
    GAME_ABI,
    signer,
  );
};

export const getTokenURIs = (signer: ethers.Signer, tokenId: number) => {
  try {
    const nftContract = getGameNFTContract(signer);
    const tokenURI = nftContract.tokenURI(tokenId);
    return tokenURI;
  } catch (error: any) {
    console.log('error query tokenURI ', error.reason, error);
    return '';
  }
};

export const getTokenIdsFromAddress = (signer: ethers.Signer) => {
  try {
    const nftContract = getGameNFTContract(signer);
    console.log('signer: ', signer);
    const tokenIds = nftContract.balanceOfTokens(signer.getAddress());
    return tokenIds;
  } catch (error: any) {
    console.log('error query tokenIds: ', error.reason, error);
    return '';
  }
};

export const getSlotsInfo = (signer: ethers.Signer, tokenId: number) => {
  try {
    const nftContract = getGameNFTContract(signer);
    const SlotsInfo = nftContract.getTokenSlotsInfo(tokenId);
    console.log('slots: ', SlotsInfo);

    return SlotsInfo;
  } catch (error: any) {
    console.log('error query tokenURI ', error.reason, error);
    return '';
  }
};

export const mint = async (
  signer: ethers.Signer,
  tokenURI: string,
  //0
  baseNFTTokenID: number,
  mintRoyaltyFee: number,
  marketRoyaltyFraction: number,
  newUsageFee: number,
  payable: BigNumber,
) => {
  try {
    const nftContract = getGameNFTContract(signer);
    const tx = await nftContract.mint(
      tokenURI,
      baseNFTTokenID,
      mintRoyaltyFee,
      marketRoyaltyFraction,
      newUsageFee,
      { value: payable },
    );

    console.log('minting NFT...');
    const receipt = await tx.wait();
    console.group();
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log('[SUCCESS] mint NFT receipt:', receipt);
    console.groupEnd();
    return { receipt };
  } catch (error: any) {
    console.log('error mint NFT ', error.reason, error);
    return '';
  }
};

export const attachBatch = async (
  signer: ethers.Signer,
  tokenId: number,
  slotIds: number[],
  slotAssetTokenIds: number[],
  amount: number[],
) => {
  try {
    const nftContract = getGameNFTContract(signer);
    const tx = await nftContract.attachBatch(
      tokenId,
      slotIds,
      slotAssetTokenIds,
      amount,
    );

    console.log('attach Slot...');
    const receipt = await tx.wait();
    console.group();
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log('[SUCCESS] attach Slot receipt:', receipt);
    console.groupEnd();
    return { receipt };
  } catch (error: any) {
    console.log('error attach Slot ', error.reason, error);
    return '';
  }
};

export const tokenMintRoyaltyInfo = async (
  signer: ethers.Signer,
  tokenId: number,
) => {
  try {
    const nftContract = getGameNFTContract(signer);
    const royaltyInfo = await nftContract.tokenMintRoyaltyInfo(tokenId);
    console.log('This is RoyaltyInfo', royaltyInfo[0], '-----', royaltyInfo[1]);

    return royaltyInfo[1];
  } catch (error: any) {
    console.log('error query tokenMintRoyaltyInfo ', error.reason, error);
    return '';
  }
};
