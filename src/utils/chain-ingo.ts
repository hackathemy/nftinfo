export const getChainName = (chainId: any) => {
  if(chainId === 74638) {
      return 'MODE';
  }else if(chainId === 123420111) {
      return 'GELATO';
  }else if(chainId === 9719618) {
      return 'CALDERA';
  }else{
      return 'Unknown Chain';
  }
};