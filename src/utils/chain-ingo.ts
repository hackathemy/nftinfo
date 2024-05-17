export const getChainName = (chainId: any) => {
  if(chainId === '0x1238e') {
      return 'MODE';
  }else if(chainId === "0x75b3dcf") {
      return 'GELATO';
  }else if(chainId === "0x944f42") {
      return 'CALDERA';
  }else{
      return 'Unknown Chain';
  }
};