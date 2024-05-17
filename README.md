# 😶‍🌫️ nftinfo.online

NFT.info is a platform based on blockchain technology that allows users to convert and manage digital assets into NFTs (Non-Fungible Tokens). The platform integrates NFTs issued on various blockchain networks, enabling users to easily trade them. Additionally, it ensures a safe NFT experience for users by leveraging Celestia's Data Availability (DA) functionality to guarantee the reliability and immutability of data.
<br></br>
# 🖼️ Background

NFT.info is an innovative platform that combines blockchain technology with distributed file systems to ensure the security and accessibility of data. It is designed to securely store and access data for digital assets such as NFTs (Non-Fungible Tokens). While many current NFT platforms use IPFS (InterPlanetary File System), this method has issues where data cannot be found if the seed is inactive. NFT.info addresses these issues to provide a more reliable service for users.
<br></br>
# 🚨 Problem & Solution

## **Problems**
1. IPFS Data Accessibility Issues
IPFS stores data in a decentralized manner, distributing it across multiple nodes in the network. However, if specific seeds are inactive, the data cannot be found, leading to instability in data access. This can be particularly problematic for important digital assets like NFTs.

2. Need to Build Separate CDN
Many services need to build their own CDN (Content Delivery Network) to ensure the speed and accessibility of data on IPFS. This results in additional costs and management burdens. Moreover, this approach can partially compromise the benefits of decentralization, as issues with intermediary servers can affect data accessibility.

## **Solutions**
NFT.info proposes several key solutions to address these problems.

1. Ensuring Data Availability with Celestia DA
NFT.info uses Celestia DA (Data Availability) when recording data on the blockchain. Celestia guarantees data availability, ensuring stable access to data stored in distributed file systems like IPFS. Even without active seeds, data can be reliably accessed, enhancing overall data stability and allowing users to access their data anytime.

2. No Need to Build Separate CDN
NFT.info is designed to always be online without the need to build a separate CDN service. This platform leverages third-party services while ensuring that data can be accessed anytime, anywhere. This approach reduces costs and management burdens while maintaining the benefits of decentralization. Users can enjoy stable data access without complex configurations.
<br></br>
# 📌 KEY Point

Services that use IPFS build their own separate CDN to guarantee speed or data. Or record the image offchain
**nftinfo.online (NFT.info)** is not only recorded on the blockchain using Celestia DA, but is also designed so that there is no need to build a separate CDN service.

![image](https://github.com/hackathemy/nftinfo/assets/144579614/64cfdc07-1ee5-4507-a303-d6e290e0e136)
<br></br>
# 💡 Additional Features
1. NFT Minting Functionality
NFT.info includes NFT minting functionality, allowing users to store various image files and metadata JSON files on Celestia-based DA through the platform and mint NFTs. This feature enables users to easily create and manage their digital assets.

2. Integration with NFT Marketplaces
NFTs minted through NFT.info can be sold on various NFT marketplaces such as Opensea and Rarible. This feature provides users with the opportunity to market and sell their creations in broader markets, maximizing revenue potential.
<br></br>
# 📜 Contract
- [NFT.info](https://github.com/hackathemy/nftinfo)
- [Celestia-DA](https://github.com/hackathemy/celestia-da-proxy-api)
- [Bridge](https://github.com/hackathemy/hyperlane)
<br></br>
# 🛠️ Logic
![image](https://github.com/hackathemy/nftinfo/assets/144579614/7fac9f98-8409-4620-9e42-4f330c637ace)

## Storage Logic:

Image data and metadata JSON are stored using Celestia DA for data storage and data availability purposes.
Image data is stored within a single namespace by default, allowing multiple images to be stored without distinguishing between namespaces.
NFTs, however, use separate DA namespaces according to their collections. As the index increases, the metadata for the NFT collections is organized accordingly.

## Search Logic:

The search logic is designed as follows:
 - Image Data: The image data is indexed and searchable via the commitment hash through the celestia-da-proxy-api's own file.db.
 - Metadata: Metadata is searchable using the combination of namespace and index number.
This way, each NFT collection matches a namespace with the collection key of the base URI. By incrementing the URL index number, users can sequentially access the NFT metadata.
<br></br>
# ✨ Features

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
<br></br>
# **Expected Benefits**
NFT.info offers several key benefits:

- **Data Stability:** Ensuring data availability through Celestia DA allows users to access data anytime, without seed issues.
- **Cost Reduction:** Eliminating the need for a separate CDN reduces costs and management burdens.
- **Improved User Experience:** Maintaining an always-online state allows users to access data anytime, significantly enhancing user experience.
- **Maintained Decentralization:** Leveraging blockchain and distributed file systems maintains the advantages of decentralization while providing a reliable data storage solution.
- **NFT Minting and Selling:** Users can easily mint NFTs and sell them on various marketplaces, offering opportunities for revenue generation.
<br></br>
# **Conclusion**

NFT.info is an innovative platform that combines the strengths of blockchain and distributed file systems to ensure the stability and accessibility of data. By addressing the traditional challenges of IPFS and leveraging Celestia DA for data availability, NFT.info offers a reliable data storage and access solution. The platform eliminates the need for separate CDN services, reducing costs and improving user experience. Additionally, with NFT minting functionality and marketplace integration, NFT.info enables users to create and sell digital assets easily. Overall, NFT.info provides a trustworthy and efficient solution for data storage and access in the digital asset space.
