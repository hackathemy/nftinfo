# 😶‍🌫️ nftinfo.online

NFT.info is a platform based on blockchain technology that allows users to convert and manage digital assets into NFTs (Non-Fungible Tokens). The platform integrates NFTs issued on various blockchain networks, enabling users to easily trade them. Additionally, it ensures a safe NFT experience for users by leveraging Celestia's Data Availability (DA) functionality to guarantee the reliability and immutability of data.

## 📌 KEY Point

Services that use IPFS build their own separate CDN to guarantee speed or data. Or record the image offchain
**nftinfo.online (NFT.info)** is not only recorded on the blockchain using Celestia DA, but is also designed so that there is no need to build a separate CDN service.

![image](https://github.com/hackathemy/nftinfo/assets/144579614/64cfdc07-1ee5-4507-a303-d6e290e0e136)
<br></br>
## ✨ API Features

![image](https://github.com/hackathemy/nftinfo/assets/144579614/7fac9f98-8409-4620-9e42-4f330c637ace)

**Displaying Metadata via BASE URI:**
- NFT.info displays metadata, including PNG and SVG files, through BASE URI. It's specified in the format "NFTinfo.online/random_number" to easily locate the metadata of a particular NFT.

**Celestia DA-Based Data Storage:**
- NFT.info stores images and metadata of NFTs in BASE64 format in Celestia's data repository, enhancing the security and availability of data by leveraging blockchain technology.

**NFT Minting and Upload:**
- Users can mint NFTs on the platform and upload them when ready. This enables users to create and register NFTs independently.

**NFT Mint Page and Collection:**
- NFT.info includes features such as NFT mint pages and collections, allowing users to easily mint and manage NFTs.

**Metadata Input and Sales on OpenSea:**
- Users can input metadata for their NFTs and sell them on OpenSea, facilitating user-to-user exchanges.

**Celestia DA-Based Storage and Data Availability:**
- To overcome data retrieval issues associated with IPFS, NFT.info utilizes Celestia's Data Availability (DA) functionality, improving data retrieval speed and reliability.
