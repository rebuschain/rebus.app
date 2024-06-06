import env from '@beam-australia/react-env';

export const config = {
	RPC_URL: env('RPC_URL'),
	REST_URL: env('REST_URL'),
	EXPLORER_URL: env('EXPLORER_URL'),
	EVM_EXPLORER_URL: env('EVM_EXPLORER_URL'),
	NETWORK_NAME: env('NETWORK_NAME'),
	NETWORK_TYPE: env('NETWORK_TYPE'),
	CHAIN_ID: env('CHAIN_ID'),
	COIN_DENOM: env('COIN_DENOM'),
	COIN_MINIMAL_DENOM: env('COIN_MINIMAL_DENOM'),
	COIN_DECIMALS: parseInt(env('COIN_DECIMALS'), 10),
	PREFIX: env('PREFIX'),
	GAS_PRICE_STEP_AVERAGE: parseFloat(env('GAS_PRICE_STEP_AVERAGE')),
	NFT_ID_ORG_NAME: env('NFT_ID_ORG_NAME'),
};
