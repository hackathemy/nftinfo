import { ethers } from "ethers";
import { useBalance } from "wagmi";

type IProps = {
  owner: any;
  token: any;
  chainId: any;
};

export const Balance = ({ chainId, owner, token }: IProps) => {
  const {
    data: balance,
    error,
    isError,
  } = useBalance({
    address: owner,
    token: token,
    chainId: chainId,
  });
  console.log(error);
  return (
    <>
      {balance?.formatted} {balance?.symbol}
    </>
  );
};
