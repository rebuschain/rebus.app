import { CoinPretty, Dec } from '@keplr-wallet/unit';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Img } from 'src/components/common/img';
import { ButtonFaint } from 'src/components/layouts/buttons';
import { Spinner } from 'src/components/spinners';
import { TableBodyRow, TableData, TableHeadRow } from 'src/components/tables';
import { SubTitleText, Text } from 'src/components/texts';
import useWindowSize from 'src/hooks/use-window-size';
import { useStore } from 'src/stores';

const tableWidths = ['25%', '25%', '25%', '25%'];
const tableWidthsOnMobileView = ['30%', '40%', '30%'];

interface Props {
	poolId: string;
	isSuperfluidEnabled: boolean;
}

export const MyBondingsTable = observer(function MyBondingsTable({ poolId, isSuperfluidEnabled }: Props) {
	const { chainStore, accountStore, queriesStore, priceStore, walletStore } = useStore();

	const { isMobileView } = useWindowSize();

	const account = accountStore.getAccount(chainStore.currentOsmosis.chainId);
	const address = walletStore.isLoaded ? walletStore.rebusAddress : account.bech32Address;
	const queries = queriesStore.get(chainStore.currentOsmosis.chainId);
	const poolShareCurrency = queries.rebus.queryGammPoolShare.getShareCurrency(poolId);
	const superfluidDelegations = queries.rebus.querySuperfluidDelegations
		.getQuerySuperfluidDelegations(address)
		.getDelegations(poolShareCurrency);

	const lockableDurations = queries.rebus.queryLockableDurations.lockableDurations;

	return (
		<div className="mt-10">
			<div className="px-5 md:px-0">
				<SubTitleText isMobileView={isMobileView}>My Bondings</SubTitleText>
			</div>
			<table className="w-full">
				<LockupTableHeader isMobileView={isMobileView} />
				<tbody className="w-full">
					{lockableDurations.map((lockableDuration, index) => {
						const lockedCoin = queries.rebus.queryAccountLocked
							.get(address)
							.getLockedCoinWithDuration(poolShareCurrency, lockableDuration);
						return (
							<LockupTableRow
								key={lockableDuration.humanize()}
								duration={lockableDuration.humanize()}
								lockup={lockedCoin}
								apy={`${queries.rebus.queryIncentivizedPools
									.computeAPY(poolId, lockableDuration, priceStore, priceStore.getFiatCurrency('usd')!)
									.toString()}%`}
								isMobileView={isMobileView}
								isSuperfluidEnabled={isSuperfluidEnabled}
								isSuperfluidDelegated={
									index === lockableDurations.length - 1 &&
									Array.isArray(superfluidDelegations) &&
									superfluidDelegations.length > 0
								}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
});

interface LockupTableHeaderProps {
	isMobileView: boolean;
}

const LockupTableHeader = observer(({ isMobileView }: LockupTableHeaderProps) => {
	return (
		<thead>
			<TableHeadRow>
				<TableData width={isMobileView ? tableWidthsOnMobileView[0] : tableWidths[0]}>
					<Text isMobileView={isMobileView}>Unbonding Duration</Text>
				</TableData>
				{!isMobileView && (
					<TableData width={tableWidths[1]}>
						<Text isMobileView={isMobileView}>Current APR</Text>
					</TableData>
				)}
				<TableData width={isMobileView ? tableWidthsOnMobileView[1] : tableWidths[2]}>
					<Text isMobileView={isMobileView}>Amount</Text>
				</TableData>
				<TableData width={isMobileView ? tableWidthsOnMobileView[2] : tableWidths[3]}>
					<Text isMobileView={isMobileView}>Action</Text>
				</TableData>
			</TableHeadRow>
		</thead>
	);
});

interface LockupTableRowProps {
	duration: string;
	apy: string;
	lockup: {
		amount: CoinPretty;
		lockIds: string[];
	};
	isMobileView: boolean;
	isSuperfluidEnabled: boolean;
	isSuperfluidDelegated: boolean;
}

const LockupTableRow = observer(function LockupTableRow({
	duration,
	apy,
	lockup,
	isMobileView,
	isSuperfluidEnabled,
	isSuperfluidDelegated,
}: LockupTableRowProps) {
	const { chainStore, accountStore, queriesStore } = useStore();

	const account = accountStore.getAccount(chainStore.currentOsmosis.chainId);
	const queries = queriesStore.get(chainStore.currentOsmosis.chainId);

	const [isUnlocking, setIsUnlocking] = useState(false);

	return (
		<TableBodyRow>
			<TableData width={isMobileView ? tableWidthsOnMobileView[0] : tableWidths[0]}>
				<div className="font-body text-sm md:text-base flex items-center">
					{duration}
					{isSuperfluidEnabled && isSuperfluidDelegated && (
						<div className="ml-3 w-5 h-5">
							<Img src={'/public/assets/icons/superfluid-osmo.svg'} />
						</div>
					)}
				</div>
			</TableData>
			{!isMobileView && (
				<TableData width={tableWidths[1]}>
					<Text emphasis="medium" isMobileView={isMobileView}>
						{apy}
					</Text>
				</TableData>
			)}
			<TableData width={isMobileView ? tableWidthsOnMobileView[1] : tableWidths[2]}>
				<Text emphasis="medium" isMobileView={isMobileView}>
					{lockup.amount
						.maxDecimals(6)
						.trim(true)
						.toString()}
				</Text>
			</TableData>
			<TableData width={isMobileView ? tableWidthsOnMobileView[2] : tableWidths[3]}>
				<ButtonFaint
					disabled={!account.isReadyToSendMsgs || lockup.amount.toDec().equals(new Dec(0))}
					onClick={async e => {
						e.preventDefault();

						if (account.isReadyToSendMsgs) {
							try {
								setIsUnlocking(true);

								if (!isSuperfluidEnabled) {
									// XXX: Due to the block gas limit, restrict the number of lock id to included in the one tx.
									await account.rebus.sendBeginUnlockingMsg(lockup.lockIds.slice(0, 10), '', () => {
										setIsUnlocking(false);
									});
								} else {
									// XXX: Due to the block gas limit, restrict the number of lock id to included in the one tx.
									const lockIds = lockup.lockIds.slice(0, 4);

									for (const lockId of lockIds) {
										await queries.rebus.querySyntheticLockupsByLockId.get(lockId).waitFreshResponse();
									}

									await account.rebus.sendBeginUnlockingMsgOrSuperfluidUnbondLockMsgIfSyntheticLock(
										lockup.lockIds.map(lockId => {
											return {
												lockId,
												isSyntheticLock: queries.rebus.querySyntheticLockupsByLockId.get(lockId).isSyntheticLock,
											};
										}),
										'',
										() => {
											setIsUnlocking(false);
										}
									);
								}
							} catch (e) {
								setIsUnlocking(false);
								console.log(e);
							}
						}
					}}>
					{isUnlocking ? (
						<Spinner />
					) : (
						<Text color="gold" isMobileView={isMobileView}>
							Unbond All
						</Text>
					)}
				</ButtonFaint>
			</TableData>
		</TableBodyRow>
	);
});
