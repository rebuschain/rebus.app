import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { CenterSelf, PoolCardListGridContainer } from 'src/components/layouts/containers';
import { TitleText } from 'src/components/texts';
import { PoolAssetCard } from 'src/pages/pool/components/pool-catalyst/pool-asset-card';
import { useStore } from 'src/stores';
import useWindowSize from 'src/hooks/use-window-size';

interface Props {
	poolId: string;
}

export const PoolCatalyst = observer(function PoolCatalyst({ poolId }: Props) {
	const { chainStore, queriesStore, accountStore, walletStore } = useStore();

	const { isMobileView } = useWindowSize();

	const queries = queriesStore.get(chainStore.currentOsmosis.chainId);
	const pool = queries.rebus.queryGammPools.getPool(poolId);

	const account = accountStore.getAccount(chainStore.currentOsmosis.chainId);
	const address = walletStore.isLoaded ? walletStore.rebusAddress : account.bech32Address;
	// ShareRatio가 백분률로 온다는 것을 주의하자.
	const shareRatio = queries.rebus.queryGammPoolShare.getAllGammShareRatio(address, poolId);

	if (!pool) {
		return null;
	}

	return (
		<PoolCatalystContainer>
			<TitleText isMobileView={isMobileView} pb={isMobileView ? 10 : 24}>
				Pool Catalyst
			</TitleText>
			<PoolCardListGridContainer>
				{/* TODO: IntPretty에 mul과 quo도 추가하자... */}
				{pool.poolRatios.map((poolRatio, i) => {
					return (
						<PoolAssetCard
							key={poolRatio.amount.currency.coinMinimalDenom}
							index={i}
							ratio={poolRatio.ratio.toString()}
							denom={poolRatio.amount.currency.coinDenom}
							totalAmount={poolRatio.amount
								.trim(true)
								.shrink(true)
								.toString()}
							myAmount={poolRatio.amount
								.mul(shareRatio.increasePrecision(2))
								.trim(true)
								.shrink(true)
								.toString()}
							isMobileView={isMobileView}
						/>
					);
				})}
			</PoolCardListGridContainer>
		</PoolCatalystContainer>
	);
});

const PoolCatalystContainer = styled(CenterSelf)`
	padding-bottom: 40px;
`;
