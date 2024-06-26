import {
  Button,
  Input,
  Stack,
  Typography,
  SvgIcon,
  styled,
  FormControl,
  FormLabel,
  Alert,
} from "@mui/joy";

import { useState } from "react";
import { ethers } from "ethers";
import nftInfoJson from "@/json/nftinfo.json";
import pb from "@/lib/pocketbase";
import { getChainName } from "@/utils/chain-ingo";
import { useAccount } from "wagmi";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

//https://rarible.com/create/polygon-erc-721
export const Create = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [baseURI, setBaseURI] = useState("");
  const [metadata, setMetadata] = useState("");
  const [file, setFile] = useState(null);
  const account = useAccount();
  const handleDeploy = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const factory = new ethers.ContractFactory(
      nftInfoJson.abi,
      nftInfoJson.bytecode,
      signer
    );

    try {
      const contract = await factory.deploy(name, symbol, baseURI);
      const address = await contract.getAddress();
      console.log("Contract deployed at:", contract);
      const collection = {
        name: name,
        symbol: symbol,
        address: address,
        baseUri: baseURI,
        chainId: window.ethereum.networkVersion,
      };

      const record = await pb.collection("collections").create(collection);
      console.log(record);
      alert("Collection created!");
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
      window.location.reload();
    } catch (err) {
      console.error("Deployment failed:", err);
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://nftinfo.online/submit_formdata", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(`File uploaded successfully`);
        const meta = {
          description: `${name} Description`,
          external_url: "https://nftinfo.online",
          image: `https://nftinfo.online/${result.result.hash}`,
          name: name,
          attributes: [
            {
              trait_type: "DA",
              value: "Celestia",
            },
          ],
        };
        setMetadata(JSON.stringify({ namespace_key: name, metadata: meta }));
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleMetadataSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("https://nftinfo.online/submit_metadata", {
        method: "POST",
        body: metadata,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setBaseURI(`https://nftinfo.online/${result.result.namespace_key}/`);
      if (response.ok) {
        alert(`Metadata uploaded successfully`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography level="title-lg">
        Create NFT Collection with nftinfo.🟢nline
      </Typography>
      <Alert color="neutral">
        Images and metadata are uploaded to Celestia DA via nftinfo.online.
        Collections can be distributed to any chain currently connected to
        MetaMask.
      </Alert>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel>Chain</FormLabel>
            <Input
              placeholder="Chain"
              variant="outlined"
              readOnly
              value={window.ethereum.networkVersion}
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel>Collection Name</FormLabel>
            <Input
              placeholder="Collection Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <FormControl>
            <FormLabel>Collection Symbol</FormLabel>
            <Input
              placeholder="Symbol"
              variant="outlined"
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
            />
          </FormControl>
        </Stack>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Stack direction="row" spacing={2} alignItems="center">
              <Input
                type="file"
                onChange={handleFileChange}
                required
                sx={{ flexGrow: 1 }}
              />
              <Button type="submit" variant="solid" color="neutral">
                Upload Image
              </Button>
            </Stack>
          </FormControl>
        </form>
        <form onSubmit={handleMetadataSubmit}>
          <FormControl>
            <FormLabel>Metadata</FormLabel>
            <Stack direction="row" spacing={2} alignItems="center">
              <Input
                placeholder="Metadata"
                variant="outlined"
                value={metadata}
                sx={{ flexGrow: 1 }}
                onChange={(event) => setMetadata(event.target.value)}
              />
              <Button type="submit" variant="solid" color="neutral">
                Upload Metadata
              </Button>
            </Stack>
          </FormControl>
        </form>
        <FormControl>
          <FormLabel>Base URI</FormLabel>
          <Input
            placeholder="Base URI"
            variant="outlined"
            onChange={(event) => setBaseURI(event.target.value)}
            value={baseURI}
          />
        </FormControl>
        <Button onClick={handleDeploy} color="success">
          Create Collection
        </Button>
      </Stack>
    </Stack>
  );
};
