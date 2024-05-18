"use client";

import {
  Button,
  Container,
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";

import { Account } from "@/components/Account";
import { Collection } from "@/components/Collection";
import { Create } from "@/components/Create";
import { useAccount, useWriteContract } from "wagmi";
import { useState } from "react";
import NFTINFO_ABI from "@/abi/\bINFTINFO.abi";
import { Point } from "@/components/Point";
import { getChainName } from "@/utils/chain-ingo";

function App() {
  const account = useAccount();
  const { writeContract } = useWriteContract();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  const handleMintClick = (collection: any) => {
    setSelectedCollection(collection);
    setOpen(true);
  };

  return (
    <Container sx={{ p: 5 }} maxWidth="lg">
      <Tabs
        value={index}
        onChange={(event, value) => setIndex(value as number)}
      >
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between">
            <Typography level="h1">nftinfo.🟢nline</Typography>
            <TabList disableUnderline>
              <Tab disableIndicator>Collections</Tab>
              <Tab disableIndicator>Create</Tab>
              <Tab disableIndicator>Point</Tab>
            </TabList>
            <Account />
          </Stack>
          <TabPanel value={0}>
            <Collection onMintClick={handleMintClick} />
          </TabPanel>
          <TabPanel value={1}>
            <Create />
          </TabPanel>
          <TabPanel value={2}>
            <Point />
          </TabPanel>
        </Stack>
      </Tabs>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Mint</DialogTitle>
          <DialogContent>
            <Stack>
              <Typography level="body-md">
                {selectedCollection?.name}( {selectedCollection?.symbol} )
              </Typography>
              <Typography level="body-md">
                Chain ID : {selectedCollection?.chainId}
              </Typography>
            </Stack>
          </DialogContent>
          <Button
            color="success"
            onClick={async () => {
              try {
                const result = await writeContract({
                  abi: NFTINFO_ABI,
                  address: selectedCollection.address,
                  functionName: "mint",
                  args: [account.address],
                });

                const data = {
                  chain: getChainName(window.ethereum.chainId),
                  recipient: account.address,
                  amount: 1,
                };

                const response = await fetch(
                  "http://13.125.79.9:3000/hyperlane/transfer",
                  {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                const transferResult = await response;
                console.log(transferResult);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Mint
          </Button>
        </ModalDialog>
      </Modal>
    </Container>
  );
}

export default App;
