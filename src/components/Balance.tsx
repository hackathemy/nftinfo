import { ethers } from "ethers";
import { useBalance } from "wagmi";

type IProps = {
  owner: any;
  token: any;
};

export const Balance = ({ owner, token }: IProps) => {
  const { data: balance, isError } = useBalance({
    address: owner,
    token: token,
  });
  return (
    <>
      {balance?.formatted} {balance?.symbol}
    </>
  );
};
