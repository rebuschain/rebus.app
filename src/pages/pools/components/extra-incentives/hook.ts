// CONTRACT: Use with `observer`
import { useStore } from 'src/stores';
import { ExtraGaugeInPool } from 'src/config';

export const useFilteredExtraIncentivePools = () => {
	const { chainStore, queriesStore } = useStore();

	const queries = queriesStore.get(chainStore.currentOsmosis.chainId);

	return Object.keys(ExtraGaugeInPool)
		.filter(poolId => {
			const inner = ExtraGaugeInPool[poolId];
			const data = Array.isArray(inner) ? inner : [inner];

			if (data.length === 0) {
				return false;
			}

			const pool = queries.rebus.queryGammPools.getPoolFromPagination(poolId);
			if (!pool) {
				return false;
			}

			const gaugeIds = data.map(d => d.gaugeId);
			const gauges = gaugeIds.map(gaugeId => queries.rebus.queryGauge.get(gaugeId));

			let maxRemainingEpoch = 0;
			for (const gauge of gauges) {
				if (maxRemainingEpoch < gauge.remainingEpoch) {
					maxRemainingEpoch = gauge.remainingEpoch;
				}
			}

			return maxRemainingEpoch > 0;
		})
		.map(poolId => {
			const inner = ExtraGaugeInPool[poolId];
			const data = Array.isArray(inner) ? inner : [inner];

			const pool = queries.rebus.queryGammPools.getPoolFromPagination(poolId);

			return {
				poolId,
				currencies: pool!.poolAssets.map(asset => asset.amount.currency),
				gaugeIds: data.map(d => d.gaugeId),
				// Assume that the incentive denom should be same.
				incentiveDenom: data[0].denom,
			};
		});
};
