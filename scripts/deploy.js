const hre = require("hardhat");

async function main() {
  const ArvToken = await hre.ethers.getContractFactory("ArvToken");
  const arvToken = await ArvToken.deploy(
    "Arunava Token",
    "Arv",
    "1000000000000000000000"
  );

  await arvToken.deployed();

  console.log(`Contract deployed at: ${arvToken.address}`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});

