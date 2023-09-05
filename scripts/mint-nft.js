require("dotenv").config();
const sepolia_api_key_url = process.env.sepolia_api_key_url;
const metamask_public_key = process.env.metamask_public_key;
const metamask_private_key = process.env.metamask_private_key;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(sepolia_api_key_url);
const contract =
    require("../artifacts/contracts/NFT.sol/MyNFT.json");
console.log(JSON.stringify(contract.abi));

const contractAddress = "0x031ac728C205DAbCF3a2b0E53cDD12E625451eAb";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(metamask_public_key, "latest");
    //get latest nonce
    //the transaction
    const tx = {
        from: metamask_public_key,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(metamask_public_key, tokenURI).encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, metamask_private_key);
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        );

                    } else {
                        console.log("Something went wrong when submitting your transaction: ", err);
                    }
                }
            );
        })

        .catch((err) => {
            console.log(" Promise failed:", err);
        });
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmQSfU7TCf33XgYWBCBKvJATeZNSY7xjStC4X5ZMQj533c?_gl=1*lfx4nq*_ga*MTEwNjUwNjExMC4xNjkzOTA5OTUx*_ga_5RMPXG14TE*MTY5MzkwOTk1MC4xLjEuMTY5MzkxMDc2NC42MC4wLjA.");
