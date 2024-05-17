import {
  Button,
  Input,
  Stack,
  Typography,
  SvgIcon,
  styled,
  FormControl,
  FormLabel,
} from "@mui/joy";

import { useState } from "react";
import { ethers } from "ethers";
import nftInfoJson from "@/json/nftinfo.json";
import pb from "@/lib/pocketbase";

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
          description: "Celestia DA Based Dragon NFT Collection",
          external_url: "https://nftinfo.online",
          image: `https://nftinfo.online/${result.result.hash}`,
          name: "Celestia First DA Dragon",
          attributes: [
            {
              trait_type: "Color Palette",
              value: "Pastel pinks, blues, and purples",
            },
            {
              trait_type: "Environment",
              value: "Clouds with twinkling stars",
            },
            {
              trait_type: "Disposition",
              value: "Friendly and playful",
            },
            {
              trait_type: "Special Feature",
              value: "Translucent, ethereal wings",
            },
            {
              trait_type: "Magic Power",
              value: "Can manipulate weather patterns",
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
      setBaseURI(`https://nftinfo.online/${result.result.namespace_key}`);
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
                readOnly
                sx={{ flexGrow: 1 }}
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
            value={baseURI}
            readOnly
          />
        </FormControl>
        <Button onClick={handleDeploy} color="success">
          Create Collection
        </Button>
      </Stack>
    </Stack>
  );
};
