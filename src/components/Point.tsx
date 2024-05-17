import { useCollections } from "@/hooks/useCollections";
import { Stack, Card, Typography, Box, Button, Grid } from "@mui/joy";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { Balance } from "./Balance";

export const Point = () => {
  const MODE = {
    NAME: "MODE",
    FILE: "l3mode-sepolia-config.yaml",
    CHAIN: "l3mode",
    PROVIDER: new ethers.JsonRpcProvider(process.env.MODE_PROVIDER),
    TOKEN: "0x697DAa49c4d93717cDdf6a9BE7e66421f3A26E66",
  };

  const GELATO = {
    NAME: "GELATO",
    FILE: "l3gelato-sepolia-config.yaml",
    CHAIN: "l3gelato",
    PROVIDER: new ethers.JsonRpcProvider(process.env.GELATO_PROVIDER),
    TOKEN: "0x03D9a13846cdD4F1B04641C96C906B1a709af228",
  };

  const CALDERA = {
    NAME: "CALDERA",
    FILE: "l3caldera-sepolia-config.yaml",
    CHAIN: "l3caldera",
    PROVIDER: new ethers.JsonRpcProvider(process.env.CALDERA_PROVIDER),
    TOKEN: "0xa7835945fed326E5CA05513CC13799a62860B13C",
  };

  const CHAINS = [MODE, GELATO, CALDERA];
  const account = useAccount();

  return (
    <Stack spacing={2}>
      <Typography level="title-lg">Point</Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {CHAINS.map((chain: any) => (
          <Grid xs={6} md={4}>
            <Card key={chain.id} variant="outlined">
              <Stack direction="row" alignItems="center">
                <Stack spacing={1} width="100%">
                  <Typography level="body-md">{chain.NAME}</Typography>
                  <Typography level="body-sm">
                    <Balance owner={account?.address} token={chain.TOKEN} />
                  </Typography>
                </Stack>
                <Box sx={{ marginLeft: 2 }}>
                  <Button variant="solid" color="success" onClick={() => {}}>
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
