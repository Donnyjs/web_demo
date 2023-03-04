import { ethers, utils } from 'ethers';
import GAME_ABI from '@/service/gameComposableNFT.json';
import { useSigner } from 'wagmi';

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
    console.log('This is a test', tokenURI);

    return tokenURI;
  } catch (error: any) {
    console.log('error query tokenURI ', error.reason, error);
    return '';
  }
};

export const getTokenIdsFromAddress = (signer: ethers.Signer) => {
  try {
    const nftContract = getGameNFTContract(signer);
    const tokenIds = nftContract.balanceOfTokens(signer.getAddress());
    console.log('This is a test', tokenIds);

    return tokenIds;
  } catch (error: any) {
    console.log('error query tokenURI ', error.reason, error);
    return '';
  }
};

export const getSlotsInfo = (signer: ethers.Signer, tokenId: number) => {
  try {
    const nftContract = getGameNFTContract(signer);
    const SlotsInfo = nftContract.getTokenSlotsInfo(tokenId);
    console.log('This is a test', SlotsInfo);

    return SlotsInfo;
  } catch (error: any) {
    console.log('error query tokenURI ', error.reason, error);
    return '';
  }
};

export const mint = async (
  signer: ethers.Signer,
  tokenURI: string,
  baseNFTTokenID: number,
  mintRoyaltyFee: number,
  marketRoyaltyFraction: number,
  newUsageFee: number,
  payable: string,
) => {
  try {
    const nftContract = getGameNFTContract(signer);
    const tx = await nftContract.mint(
      tokenURI,
      baseNFTTokenID,
      mintRoyaltyFee,
      marketRoyaltyFraction,
      newUsageFee,
      { value: ethers.utils.parseEther(payable) },
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
