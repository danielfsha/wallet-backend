const express = require("express");
const cors = require("cors");

const serverlessHttp = require("serverless-http");


const Moralis = require("moralis").default;

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors())

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get("/.netlify/functions/api/walletInfo", async (req, res) => {
    try {
        const address = req.query.address;
        const chain = req.query.chain;

        const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
            "chain": chain,
            "address": address
        });

        const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
        });

        const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
            "chain": chain,
            "format": "hex",
            "mediaItems": false,
            "address": address
        });

        const transactions = await Moralis.EvmApi.transaction.getWalletTransactions({
            address,
            chain,
        });

        return res.status(200).json({
            nativeBalance,
            tokens,
            nfts: nfts.result,
            transactions: transactions.result
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

const startServer = async () => {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

startServer();


const handler = serverlessHttp(app);

module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result
}