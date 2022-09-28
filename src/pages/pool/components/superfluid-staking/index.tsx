import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useMemo, useState } from 'react';
import { TitleText } from 'src/components/texts';
import useWindowSize from 'src/hooks/use-window-size';
import { useStore } from 'src/stores';
import { Staking } from '@keplr-wallet/stores';
import { CoinPretty, Dec, DecUtils } from '@keplr-wallet/unit';
import { UpgradeLockedLPToSuperfluidDialog } from 'src/dialogs';

export const SuperfluidStaking: FunctionComponent<{ poolId: string }> = observer(({ poolId }) => {
	const { isMobileView } = useWindowSize();
	const { accountStore, queriesStore, chainStore, priceStore, walletStore } = useStore();

	const account = accountStore.getAccount(chainStore.currentOsmosis.chainId);
	const queries = queriesStore.get(chainStore.currentOsmosis.chainId);
	const poolShareCurrency = queries.rebus.queryGammPoolShare.getShareCurrency(poolId);
	const address = walletStore.isLoaded ? walletStore.rebusAddress : account.bech32Address;

	const lockableDurations = queries.rebus.queryLockableDurations.lockableDurations;

	const superfluidAPYWithPoolAPY = useMemo(() => {
		const superfluidAPY = queries.cosmos.queryInflation.inflation.mul(
			queries.rebus.querySuperfluidOsmoEquivalent.estimatePoolAPROsmoEquivalentMultiplier(poolId)
		);

		if (lockableDurations.length > 0) {
			const poolAPY = queries.rebus.queryIncentivizedPools.computeAPY(
				poolId,
				lockableDurations[lockableDurations.length - 1],
				priceStore,
				priceStore.getFiatCurrency('usd')!
			);

			return superfluidAPY.add(poolAPY);
		} else {
			return superfluidAPY;
		}
	}, [
		lockableDurations,
		poolId,
		priceStore,
		queries.cosmos.queryInflation.inflation,
		queries.rebus.queryIncentivizedPools,
		queries.rebus.querySuperfluidOsmoEquivalent,
	]);

	const superfluidDelegations = queries.rebus.querySuperfluidDelegations
		.getQuerySuperfluidDelegations(address)
		.getDelegations(poolShareCurrency);
	const queryActiveValidators = queries.cosmos.queryValidators.getQueryStatus(Staking.BondStatus.Bonded);
	const activeValidators = queryActiveValidators.validators;
	const superfluidDelegatedValidators = activeValidators.filter(activeValidator =>
		superfluidDelegations?.some(delegation => delegation.validator_address === activeValidator.operator_address)
	);

	const totalDelegations = useMemo(() => {
		let r = new CoinPretty(poolShareCurrency, new Dec(0));
		if (superfluidDelegations) {
			for (const del of superfluidDelegations) {
				r = r.add(del.amount);
			}
		}
		return r;
	}, [poolShareCurrency, superfluidDelegations]);

	const upgradableLPLockIds:
		| {
				amount: CoinPretty;
				lockIds: string[];
		  }
		| undefined = (() => {
		if (lockableDurations.length > 0) {
			return queries.rebus.queryAccountLocked
				.get(address)
				.getLockedCoinWithDuration(poolShareCurrency, lockableDurations[lockableDurations.length - 1]);
		} else {
			return;
		}
	})();
	const [isOpenUpgradeLockedLPDialog, setIsOpenUpgradeLockedLPDialog] = useState(false);

	const showSuperfluidDelegations = superfluidDelegations && superfluidDelegations.length > 0;

	const showUpgradeLpLockView =
		superfluidDelegations &&
		superfluidDelegations.length === 0 &&
		upgradableLPLockIds &&
		upgradableLPLockIds.lockIds.length > 0;

	return (
		<React.Fragment>
			{showSuperfluidDelegations || showUpgradeLpLockView ? (
				<TitleText isMobileView={isMobileView} pb={isMobileView ? 10 : 24}>
					Superfluid Staking
				</TitleText>
			) : null}
			{showSuperfluidDelegations ? (
				<div className="mt-5 bg-sfs p-0.5 rounded-2xl">
					<div className="p-4.5 pt-0.5 md:pt-4.5 bg-card rounded-2xl">
						<div className="hidden md:flex justify-between items-center pb-4 border-b border-white-faint font-body font-semibold">
							<span>My Superfluid Validator</span>
							<span>My Superfluid Delegation</span>
						</div>
						{superfluidDelegatedValidators.map(validator => {
							const validatorThumbnail = queryActiveValidators.getValidatorThumbnail(validator.operator_address);

							return (
								<div key={validator.operator_address} className="pt-4 flex justify-between items-center">
									<div className="rounded-full border border-enabledGold w-12 h-12 md:w-15 md:h-15 p-1 md:p-1.5 flex justify-center items-center flex-shrink-0">
										<img
											src={validatorThumbnail || '/public/assets/icons/profile.svg'}
											alt="validator thumbnail"
											className={`rounded-full ${validatorThumbnail ? 'w-full h-full' : 'w-7 h-7 md:w-9 md:h-9'}`}
										/>
									</div>
									<div className="ml-4 md:ml-5 w-full">
										<div className="flex items-center justify-between text-sm md:text-lg font-semibold leading-6">
											<span>{validator.description.moniker}</span>
											<span>{`~${queries.rebus.querySuperfluidOsmoEquivalent
												.calculateOsmoEquivalent(totalDelegations)
												.trim(true)
												.maxDecimals(3)
												.shrink(true)
												.toString()}`}</span>
										</div>
										<div className="mt-1 flex items-center justify-between text-iconDefault text-xs md:text-base">
											<span>
												Commission -{' '}
												{DecUtils.trim(
													new Dec(validator.commission.commission_rates.rate)
														.mul(DecUtils.getTenExponentN(2))
														.toString(1)
												)}
												%
											</span>
											<span>{`~${superfluidAPYWithPoolAPY
												.maxDecimals(0)
												.trim(true)
												.toString()}% APR`}</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			) : null}
			{showUpgradeLpLockView ? (
				<React.Fragment>
					{upgradableLPLockIds ? (
						<UpgradeLockedLPToSuperfluidDialog
							amount={upgradableLPLockIds.amount}
							lockIds={upgradableLPLockIds.lockIds}
							isOpen={isOpenUpgradeLockedLPDialog}
							close={() => setIsOpenUpgradeLockedLPDialog(false)}
						/>
					) : null}
					<div className="mt-5 bg-card p-5 rounded-2xl flex items-center justify-between font-body">
						<div>
							<div className="text-base font-semibold text-white-high">Superfluid Staking Inactive</div>
							<div className="mt-2 text-sm font-medium text-iconDefault">
								You have a superfluid eligible bonded liquidity.
								<br />
								Choose a Superfluid Staking validator to earn additional rewards.
							</div>
						</div>
						<button
							className="bg-sfs rounded-lg py-2 px-8 text-white-high font-semibold text-sm shadow-elevation-04dp"
							type="button"
							onClick={e => {
								e.preventDefault();

								setIsOpenUpgradeLockedLPDialog(true);
							}}>
							Go Superfluid
						</button>
					</div>
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
});
