
import hre from "hardhat";

async function main() {
  const ApprovalRegistry = await hre.ethers.getContractFactory(
    "ApprovalRegistry"
  );

  const contract = await ApprovalRegistry.deploy();

  await contract.waitForDeployment();

  console.log(
    "ApprovalRegistry deployed to:",
    await contract.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

