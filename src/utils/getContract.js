import ContractAbi from "../artifacts/contracts/OurTube.sol/OurTube.json";
import { ethers } from "ethers";

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(
    "0x1394fbE5B52Cd3b1FC2F0867326259a374D23d36",
    ContractAbi.abi,
    signer
  );
  console.log(contract);
  return contract;
}
