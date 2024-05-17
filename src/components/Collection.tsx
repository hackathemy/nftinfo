import { useCollections } from "@/hooks/useCollections";
import { Stack, Card, Typography, Box, Button, Grid } from "@mui/joy";
import { useAccount } from "wagmi";

export const Collection = ({ onMintClick }: any) => {
  const account = useAccount();
  const { data: collections }: any = useCollections();

  return (
    <Stack spacing={2}>
      <Typography level="title-lg">Collections</Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {collections &&
          collections.map((collection: any) => (
            <Grid xs={6} md={4}>
              <Card key={collection.id} variant="outlined">
                <Stack direction="row" alignItems="center">
                  <Stack spacing={1} width="100%">
                    <Typography level="h4">{collection.name}</Typography>
                    <Typography level="body-md" textColor="text.secondary">
                      {collection.symbol}
                    </Typography>
                    <Typography level="body-sm" textColor="text.secondary">
                      Chain ID: {collection.chainId}
                    </Typography>
                  </Stack>
                  <Box sx={{ marginLeft: 2 }}>
                    <Button
                      variant="solid"
                      color="success"
                      onClick={() => onMintClick(collection)}
                    >
                      Mint
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
