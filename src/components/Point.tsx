import { useCollections } from "@/hooks/useCollections";
import { Stack, Card, Typography, Box, Button, Grid } from "@mui/joy";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { Balance } from "./Balance";

export const Point = () => {
  const MODE = {
    NAME: "MODE",
    CHAIN: "l3mode",
    PROVIDER: new ethers.JsonRpcProvider(process.env.MODE_PROVIDER),
    TOKEN: "0x697DAa49c4d93717cDdf6a9BE7e66421f3A26E66",
    CHAIN_ID: 74638,
  };

  const GELATO = {
    NAME: "GELATO",
    CHAIN: "l3gelato",
    PROVIDER: new ethers.JsonRpcProvider(process.env.GELATO_PROVIDER),
    TOKEN: "0x03D9a13846cdD4F1B04641C96C906B1a709af228",
    CHAIN_ID: 123420111,
  };

  const CALDERA = {
    NAME: "CALDERA",
    CHAIN: "l3caldera",
    PROVIDER: new ethers.JsonRpcProvider(process.env.CALDERA_PROVIDER),
    TOKEN: "0xa7835945fed326E5CA05513CC13799a62860B13C",
    CHAIN_ID: 9719618,
  };

  const SEPOLIA_GELATO = {
    NAME: "SEPOLIA(GELATO HACKA)",
    CHAIN: "sepolia",
    TOKEN: "0x5cbA335619c67b652D146bef6D68A4ca011344CF",
    CHAIN_ID: 11155111,
  };

  const SEPOLIA_MODE = {
    NAME: "SEPOLIA(MODE HACKA)",
    CHAIN: "sepolia",
    TOKEN: "0x5cbA335619c67b652D146bef6D68A4ca011344CF",
    CHAIN_ID: 11155111,
  };

  const SEPOLIA_CALDERA = {
    NAME: "SEPOLIA(CALDERA HACKA)",
    CHAIN: "sepolia",
    TOKEN: "0x5cbA335619c67b652D146bef6D68A4ca011344CF",
    CHAIN_ID: 11155111,
  };
  const CHAINS = [
    MODE,
    GELATO,
    CALDERA,
    SEPOLIA_GELATO,
    SEPOLIA_MODE,
    SEPOLIA_CALDERA,
  ];
  const account = useAccount();

  const bridge = async (chain: any) => {

    const data = {
      chain: chain,
      recipient: account.address,
      amount: 1
    };
    const response = await fetch("http://localhost:3000/hyperlane/bridge", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const transferResult = await response.json();
    console.log(transferResult);
  }

  return (
    <Stack spacing={2}>
      <Typography level="title-lg">Point</Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {CHAINS.map((chain: any) => (
          <Grid xs={6} md={4} key={chain.CHAIN_ID}>
            <Card variant="outlined">
              <Stack direction="row" alignItems="center">
                {account && (
                  <Stack spacing={1} width="100%">
                    <Typography level="body-md">{chain.NAME}</Typography>
                    <Typography level="body-sm">
                      <Balance
                        chainId={chain.CHAIN_ID}
                        owner={account.address}
                        token={chain.TOKEN}
                      />
                    </Typography>
                  </Stack>
                )}
                <Box sx={{ marginLeft: 2 }}>
                  <Button variant="solid" color="success" onClick={() => bridge(chain.NAME)}>
                    Bridge
                  </Button>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
