import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Loader } from 'src/components/common/loader';
import { CenterSelf, FullScreenContainer } from 'src/components/layouts/containers';
import { LockupAbledPoolIds, PromotedLBPPoolIds } from 'src/config';
import { colorPrimaryDark } from 'src/emotion-styles/colors';
import { PoolCatalyst } from 'src/pages/pool/components/pool-catalyst';
import { PoolInfoHeader } from 'src/pages/pool/components/pool-info-header';
import { useStore } from 'src/stores';
import { QueriedPoolBase } from 'src/stores/rebus/query/pool';
import { LbpCatalyst } from './components/lbp-catalyst';
import { LiquidityMining } from './components/liquidity-mining';
import { usePoolSwapConfig } from 'src/pages/pool/components/pool-info-header/use-pool-swap-config';
import { useFakeFeeConfig } from 'src/hooks/tx';
import { PoolSwapClipboardContent } from 'src/pages/pool/components/pool-info-header/pool-swap-dialog';
import { TitleText } from 'src/components/texts';
import useWindowSize from 'src/hooks/use-window-size';
import { ROUTES } from 'src/constants/routes';

interface QueryParams {
	/**pool id*/
	id: string;
}

const PoolPage: FunctionComponent = observer(() => {
	const history = useHistory();
	const match = useRouteMatch<QueryParams>();

	const { chainStore, queriesStore } = useStore();

	const queries = queriesStore.get(chainStore.currentOsmosis.chainId);
	const observablePool = queries.rebus.queryGammPools.getObservableQueryPool(match.params.id);
	const pool = observablePool.pool;

	useEffect(() => {
		if (!observablePool.isFetching && !observablePool.pool) {
			// Invalid request.
			history.push(ROUTES.POOLS);
		}
	}, [history, observablePool.isFetching, observablePool.pool]);

	if (!pool) {
		return (
			<FullScreenContainer>
				<LoaderStyled />
			</FullScreenContainer>
		);
	}

	const isSuperfluidEnabled = queries.rebus.querySuperfluidPools.isSuperfluidPool(match.params.id);

	return (
		<FullScreenContainer>
			<PoolInfoHeaderSection>
				<PoolInfoHeaderWrapper>
					<CenterSelf>
						<PoolInfoHeader poolId={pool.id} isLBP={isLbp(pool.smoothWeightChangeParams)} />
					</CenterSelf>
				</PoolInfoHeaderWrapper>
			</PoolInfoHeaderSection>

			{isLbp(pool.smoothWeightChangeParams) ? (
				<LBPInPageSwapClipboardSection>
					<CenterSelf style={{ paddingTop: 40, paddingBottom: 40 }}>
						<LBPInPageSwapClipboard poolId={pool.id} />
					</CenterSelf>
				</LBPInPageSwapClipboardSection>
			) : null}

			<LiquidityMiningSection>
				{/* 인센티브를 받을 수 있는 풀 또는 config에서 설정된 풀의 경우만 Synthesis를 표시한다. */}
				{(queries.rebus.queryIncentivizedPools.isIncentivized(pool.id) || LockupAbledPoolIds[pool.id]) && (
					<CenterSelf>
						<LiquidityMining poolId={pool.id} isSuperfluidEnabled={isSuperfluidEnabled} />
					</CenterSelf>
				)}
				{isLbp(pool.smoothWeightChangeParams) && <LbpCatalyst pool={pool} lbpParams={pool.smoothWeightChangeParams} />}
			</LiquidityMiningSection>

			<PoolCatalystSection>
				<CenterSelf>
					<PoolCatalyst poolId={pool.id} />
				</CenterSelf>
			</PoolCatalystSection>
		</FullScreenContainer>
	);
});

export const LBPInPageSwapClipboard: FunctionComponent<{
	poolId: string;
}> = ({ poolId }) => {
	const { chainStore, queriesStore, accountStore, walletStore } = useStore();

	const account = accountStore.getAccount(chainStore.currentOsmosis.chainId);
	const queries = queriesStore.get(chainStore.currentOsmosis.chainId);
	const address = walletStore.isLoaded ? walletStore.rebusAddress : account.bech32Address;

	const config = usePoolSwapConfig(
		chainStore,
		chainStore.currentOsmosis.chainId,
		address,
		queries.queryBalances,
		poolId,
		queries.rebus.queryGammPools
	);
	const feeConfig = useFakeFeeConfig(
		chainStore,
		chainStore.currentOsmosis.chainId,
		account.msgOpts.swapExactAmountIn.gas
	);
	config.setFeeConfig(feeConfig);

	useEffect(() => {
		const lbpConfig = PromotedLBPPoolIds.find(c => c.poolId === poolId);
		if (lbpConfig) {
			config.setUserBuyPrioritaryDenom(lbpConfig.baseDenom);
		}
	}, [config, poolId]);

	const { isMobileView } = useWindowSize();

	return (
		<PoolSwapClipboardContainer>
			<div className="px-5 md:px-0">
				<TitleText isMobileView={isMobileView} pb={isMobileView ? 10 : 24}>
					Purchase Tokens
				</TitleText>
			</div>
			<div className="bg-card p-5 md:p-0 md:bg-transparent">
				<PoolSwapClipboardContent config={config} />
			</div>
		</PoolSwapClipboardContainer>
	);
};

const PoolInfoHeaderSection = styled.div`
	position: relative;
`;

const PoolInfoHeaderWrapper = styled.div`
	padding: 84px 20px 20px;
	width: 100%;
	position: relative;
	z-index: 10;
	@media (min-width: 768px) {
		padding: 40px;
	}
`;

const LBPInPageSwapClipboardSection = styled.div`
	background-color: ${colorPrimaryDark};
	width: 100%;
	@media (min-width: 768px) {
		padding: 0 40px;
	}
`;

const PoolSwapClipboardContainer = styled.div`
	width: 100%;
	@media (min-width: 768px) {
		max-width: 600px;
	}
`;

const LiquidityMiningSection = styled.div`
	background-color: ${colorPrimaryDark};
	width: 100%;
	@media (min-width: 768px) {
		padding: 0 40px;
	}
`;

const PoolCatalystSection = styled.div`
	background-color: ${colorPrimaryDark};
	width: 100%;
	padding: 40px 20px 20px;
	@media (min-width: 768px) {
		padding: 40px;
	}
`;

const LoaderStyled = styled(Loader)`
	width: 6rem;
	height: 6rem;
	@media (min-width: 768px) {
		width: 12.5rem;
		height: 12.5rem;
	}
`;

function isLbp(
	smoothWeightChangeParams: QueriedPoolBase['smoothWeightChangeParams']
): smoothWeightChangeParams is NonNullable<QueriedPoolBase['smoothWeightChangeParams']> {
	return smoothWeightChangeParams != null;
}

export default PoolPage;
