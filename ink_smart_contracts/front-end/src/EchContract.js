import metadata from './EchMetadata.json';
import { Abi, ContractPromise } from '@polkadot/api-contract';

export const defaultGasLimit = 300000n * 1000000n;
const contractAddress = '5GcTCgQeVfJzHauMNBwy2xcr77EyV6R85sPKNQghD22nRtGe';

export default function EchContract (api) {
  const abi = new Abi(metadata);
  return new ContractPromise(api, abi, contractAddress);
}
