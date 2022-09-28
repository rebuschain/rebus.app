import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { wrapBaseDialog } from './base';
import cn from 'clsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import { useBasicAmountConfig } from '../hooks/tx/basic-amount-config';
import { Img } from 'src/components/common/img';
import { IconCheckBox } from 'src/icons';
import { TableBodyRow, TableData, TableHeadRow } from 'src/components/tables';
import { Text } from 'src/components/texts';
import { Staking } from '@keplr-wallet/stores';
import { CoinPretty, Dec, DecUtils } from '@keplr-wallet/unit';
import { IAmountConfig, InsufficientAmountError, useAmountConfig } from '@keplr-wallet/hooks';

export const LockLpTokenDialog = wrapBaseDialog(
	observer(
		({ poolId, close, isSuperfluidEnabled }: { poolId: string; close: () => void; isSuperfluidEnabled: boolean }) => {
			const { chainStore, queriesStore, accountStore, priceStore, walletStore } = useStore();

			const account = accountStore.getAccount(chainStore.current.chainId);
			const queries = queriesStore.get(chainStore.current.chainId);
			const address = walletStore.isLoaded ? walletStore.address : account.bech32Address;
			const lockableDurations = queries.rebus.queryLockableDurations.lockableDurations;

			const hasNotExistSuperfluidLock = useMemo(() => {
				const superfluidDelegations = queries.rebus.querySuperfluidDelegations
					.getQuerySuperfluidDelegations(address)
					.getDelegations(queries.rebus.queryGammPoolShare.getShareCurrency(poolId));

				return !superfluidDelegations || superfluidDelegations.length === 0;
			}, [address, poolId, queries.rebus.queryGammPoolShare, queries.rebus.querySuperfluidDelegations]);

			const amountConfig = useBasicAmountConfig(
				chainStore,
				chainStore.current.chainId,
				address,
				queries.rebus.queryGammPoolShare.getShareCurrency(poolId),
				queries.queryBalances
			);

			const [selectedDurationIndex, setSelectedDurationIndex] = useState(2);
			const [isCheckedSuperfluid, setIsCheckedSuperfluid] = useState(false);
			const [isValidatorSelectStage, setIsValidatorSelectStage] = useState(false);
			const isShowingSuperfluidCheckbox =
				selectedDurationIndex === lockableDurations.length - 1 && isSuperfluidEnabled && hasNotExistSuperfluidLock;
			useEffect(() => {
				if (isShowingSuperfluidCheckbox) {
					setIsCheckedSuperfluid(true);
				} else {
					setIsCheckedSuperfluid(false);
				}
			}, [isShowingSuperfluidCheckbox]);

			return (
				<div className="text-white-high w-full h-full">
					{!isValidatorSelectStage ? (
						<React.Fragment>
							{' '}
							<h5 className="text-lg md:text-xl mb-5 md:mb-9">Bond LP tokens</h5>
							<div className="mb-2.5 md:mb-7.5">
								<p>Unbonding period</p>
							</div>
							<ul className="flex flex-col gap-2.5 mb-5 md:flex-row md:gap-6 md:mb-6">
								{lockableDurations.map((duration, i) => {
									let apy = `${queries.rebus.queryIncentivizedPools
										.computeAPY(poolId, duration, priceStore, priceStore.getFiatCurrency('usd')!)
										.toString()}%`;

									if (lockableDurations.length - 1 === i && isSuperfluidEnabled) {
										const superfluidAPY = queries.cosmos.queryInflation.inflation.mul(
											queries.rebus.querySuperfluidOsmoEquivalent.estimatePoolAPROsmoEquivalentMultiplier(poolId)
										);

										apy += ` + ${superfluidAPY
											.maxDecimals(0)
											.trim(true)
											.toString()}%`;
									}

									return (
										<LockupItem
											key={i.toString()}
											duration={duration.humanize()}
											setSelected={() => {
												setSelectedDurationIndex(i);
											}}
											selected={i === selectedDurationIndex}
											apy={apy}
											isSuperfluidEnabled={lockableDurations.length - 1 === i && isSuperfluidEnabled}
										/>
									);
								})}
							</ul>
							{isShowingSuperfluidCheckbox && (
								<div className="mb-6">
									<label
										htmlFor="checkbox"
										className="text-sm md:text-base flex justify-end items-center mr-2 cursor-pointer font-semibold"
										onClick={() => setIsCheckedSuperfluid(!isCheckedSuperfluid)}>
										{isCheckedSuperfluid ? (
											<div className="mr-2.5">
												<IconCheckBox />
											</div>
										) : (
											<div className="w-6 h-6 border-2 border-white-high mr-2.5 rounded" />
										)}
										<span className="mr-2">Superfluid Stake</span>
										<div className="w-6 h-6">
											<Img src={'/public/assets/icons/superfluid-osmo.svg'} />
										</div>
									</label>
								</div>
							)}
							<div className="w-full pt-3 pb-3.5 pl-3 pr-2.5 border border-white-faint rounded-2xl mb-8">
								<p className="mb-3">Amount to bond</p>
								<p className="text-sm mb-3.5">
									Available LP token:{' '}
									<span className="text-primary-50">
										{queries.queryBalances
											.getQueryBech32Address(address)
											.getBalanceFromCurrency(amountConfig.sendCurrency)
											.trim(true)
											.toString()}
									</span>
								</p>
								<div className="relative w-full rounded-lg bg-background">
									<input
										type="number"
										className="text-white-high text-left font-title p-2 pr-12.5 w-full"
										onChange={e => {
											e.preventDefault();

											amountConfig.setAmount(e.currentTarget.value);
										}}
										value={amountConfig.amount}
									/>
									<button
										className="flex items-center justify-center bg-primary-200 rounded-md absolute top-2 right-2 py-1.5 px-1"
										onClick={e => {
											e.preventDefault();

											amountConfig.toggleIsMax();
										}}>
										<p className="text-xs leading-none font-normal">MAX</p>
									</button>
								</div>
							</div>
							<div className="w-full flex items-center justify-center">
								<button
									className="w-full md:w-2/3 h-12 md:h-15 bg-primary-200 rounded-2xl flex justify-center items-center hover:opacity-75 cursor-pointer disabled:opacity-50"
									disabled={!account.isReadyToSendMsgs || amountConfig.getError() != null}
									onClick={async e => {
										e.preventDefault();

										if (account.isReadyToSendMsgs) {
											if (isCheckedSuperfluid) {
												setIsValidatorSelectStage(true);
											} else {
												const duration = lockableDurations[selectedDurationIndex];
												try {
													await account.rebus.sendLockTokensMsg(
														duration.asSeconds(),
														[
															{
																currency: amountConfig.sendCurrency,
																amount: amountConfig.amount,
															},
														],
														'',
														() => {
															close();
														}
													);
												} catch (e) {
													console.log(e);
												}
											}
										}
									}}>
									{account.isSendingMsg === 'lockTokens' ||
									account.isSendingMsg === 'lockAndSuperfluidDelegate' ||
									account.isSendingMsg === 'superfluidDelegate' ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											viewBox="0 0 24 24">
											<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
											<path
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												className="opacity-75"
											/>
										</svg>
									) : (
										<p className="text-white-high font-semibold text-base md:text-lg">
											{isSuperfluidEnabled && isCheckedSuperfluid ? 'Next' : 'Bond'}
										</p>
									)}
								</button>
							</div>
						</React.Fragment>
					) : (
						<LockLpTokenValidatorSelectStageViewInDialog
							header={
								<React.Fragment>
									<img
										src="/public/assets/icons/left.svg"
										className="w-7 h-7 mr-0 cursor-pointer"
										onClick={() => setIsValidatorSelectStage(false)}
									/>
									<h5 className="ml-9 text-lg md:text-xl">
										Select <span className="hidden md:inline">{'Superfluid '}</span>Validator
									</h5>
								</React.Fragment>
							}
							amountConfig={amountConfig}
							onSumbit={async (selectedValidatorAddress: string) => {
								try {
									await account.rebus.sendLockAndSuperfluidDelegateMsg(
										[
											{
												currency: amountConfig.sendCurrency,
												amount: amountConfig.amount,
											},
										],
										selectedValidatorAddress,
										'',
										() => {
											close();
										}
									);
								} catch (e) {
									console.log(e);
								}
							}}
						/>
					)}
				</div>
			);
		}
	)
);

export const UpgradeLockedLPToSuperfluidDialog = wrapBaseDialog(
	observer(({ amount, lockIds, close }: { amount: CoinPretty; lockIds: string[]; close: () => void }) => {
		const { chainStore, queriesStore, accountStore, walletStore } = useStore();

		const account = accountStore.getAccount(chainStore.current.chainId);
		const queries = queriesStore.get(chainStore.current.chainId);
		const address = walletStore.isLoaded ? walletStore.address : account.bech32Address;
		const amountConfig = useAmountConfig(chainStore, chainStore.current.chainId, address, queries.queryBalances);

		useEffect(() => {
			amountConfig.setAmount(amount.toDec().toString());
			amountConfig.setSendCurrency(amount.currency);
		}, [amount, amountConfig]);

		return (
			<div className="text-white-high w-full h-full">
				{/* This is trick for avoiding the focus trap error on modal. */}
				<div
					style={{
						position: 'absolute',
						opacity: 0,
						width: 0,
						height: 0,
					}}>
					<input style={{ width: 0 }} />
				</div>
				<LockLpTokenValidatorSelectStageViewInDialog
					header={
						<React.Fragment>
							<h5 className="text-lg md:text-xl">
								Select <span className="hidden md:inline">{'Superfluid '}</span>Validator
							</h5>
						</React.Fragment>
					}
					amountConfig={amountConfig}
					checkAmountConfigError={(amountConfig: IAmountConfig) => {
						const error = amountConfig.getError();
						if (error && error instanceof InsufficientAmountError) {
							return false;
						}
						return error != null;
					}}
					onSumbit={async (selectedValidatorAddress: string) => {
						try {
							await account.rebus.sendSuperfluidDelegate(lockIds, selectedValidatorAddress, '', () => {
								close();
							});
						} catch (e) {
							console.log(e);
						}
					}}
				/>
			</div>
		);
	})
);

export const LockLpTokenValidatorSelectStageViewInDialog: FunctionComponent<{
	header: React.ReactElement;
	amountConfig: IAmountConfig;
	onSumbit: (selectedValidatorAddress: string) => Promise<void>;
	checkAmountConfigError?: (amountConfig: IAmountConfig) => boolean;
}> = observer(
	({
		header,
		amountConfig,
		onSumbit,
		checkAmountConfigError = (amountConfig: IAmountConfig) => {
			return amountConfig.getError() != null;
		},
	}) => {
		const { chainStore, queriesStore, accountStore, walletStore } = useStore();

		const account = accountStore.getAccount(chainStore.current.chainId);
		const queries = queriesStore.get(chainStore.current.chainId);
		const address = walletStore.isLoaded ? walletStore.address : account.bech32Address;

		const activeValidatorsResult = queries.cosmos.queryValidators.getQueryStatus(Staking.BondStatus.Bonded);
		const activeValidators = activeValidatorsResult.validators;
		const delegationsResult = queries.cosmos.queryDelegations.getQueryBech32Address(address);
		const delegations = delegationsResult.delegations;
		const delegatedValidators = useMemo(
			() =>
				activeValidators
					.filter(validator =>
						delegations.some(delegation => delegation.validator_address === validator.operator_address)
					)
					.sort((aVal, bVal) => {
						const aValName = aVal.description.moniker;
						const bValName = bVal.description.moniker;
						if (!aValName || !bValName) {
							return -1;
						}
						if (aValName.toLowerCase().trim() > bValName.toLowerCase().trim()) {
							return 1;
						}
						if (bValName.toLowerCase().trim() > aValName.toLowerCase().trim()) {
							return -1;
						}
						return 0;
					}),
			[activeValidators, delegations]
		);
		const extraValidators = useMemo(
			() =>
				activeValidators
					.filter(
						validator => !delegations.some(delegation => delegation.validator_address === validator.operator_address)
					)
					.sort((aVal, bVal) => {
						const aValName = aVal.description.moniker;
						const bValName = bVal.description.moniker;
						if (!aValName || !bValName) {
							return -1;
						}
						if (aValName.toLowerCase().trim() > bValName.toLowerCase().trim()) {
							return 1;
						}
						if (bValName.toLowerCase().trim() > aValName.toLowerCase().trim()) {
							return -1;
						}
						return 0;
					}),
			[activeValidators, delegations]
		);
		const [selectedValidatorAddress, setSelectedValidatorAddress] = useState('');
		const [searchingValidatorValue, setSearchingValidatorValue] = useState('');

		return (
			<React.Fragment>
				<div className="flex items-center mb-5 md:mb-9 -mt-1.5 md:mt-0">{header}</div>
				<div className="w-full mb-2.5 md:mb-4 text-sm md:text-base flex flex-col md:flex-row md:items-center md:justify-between">
					<p>Choose your superfluid validator</p>
					<div className="mt-4.5 md:mt-0 border border-secondary-200 py-2 px-3.5 w-full md:w-[180px] rounded-xl flex items-center">
						<img src="/public/assets/icons/search-outline.svg" />
						<input
							className="ml-3 text-xs w-full"
							value={searchingValidatorValue}
							onChange={e => setSearchingValidatorValue(e.target.value)}
							placeholder="Search by name"
						/>
					</div>
				</div>
				<div className="overflow-auto h-[282px]">
					<table className="w-full">
						<thead className="sticky top-0 z-10 bg-surface">
							<TableHeadRow className="!px-5 !py-0 !mt-0 !rounded-t-2xl">
								<TableData as="th" width={'80%'} className="!px-0 !py-3">
									<Text size="sm">Validator</Text>
								</TableData>
								<TableData as="th" width={'20%'} className="!px-0 !py-3 justify-end">
									<Text size="sm">Commission</Text>
								</TableData>
							</TableHeadRow>
						</thead>
						<tbody className="w-full">
							{delegatedValidators
								.concat(extraValidators)
								.filter(activeValidator => {
									if (searchingValidatorValue) {
										const matchingValidatorName = activeValidator.description.moniker?.toLowerCase().trim();
										return matchingValidatorName?.includes(searchingValidatorValue);
									} else {
										return true;
									}
								})
								.map(activeValidator => {
									const validatorThumbnail = activeValidatorsResult.getValidatorThumbnail(
										activeValidator.operator_address
									);
									const isDelegatedValidator = delegations.some(
										delegation => delegation.validator_address === activeValidator.operator_address
									);
									const isSelected = activeValidator.operator_address === selectedValidatorAddress;

									return (
										<TableBodyRow
											key={activeValidator.operator_address}
											className={`!px-[1px] !py-[1px] !h-full cursor-pointer ${
												isSelected ? 'bg-sfs border-none mb-0.25' : isDelegatedValidator ? 'bg-card' : 'bg-transparent'
											}`}
											onClick={() => setSelectedValidatorAddress(isSelected ? '' : activeValidator.operator_address)}>
											<TableData
												width={'80%'}
												className={`!pl-5 !pr-0 !py-2.5 ${
													isSelected ? 'bg-selected-validator' : isDelegatedValidator ? 'bg-card' : 'bg-surface'
												}`}>
												<div className="rounded-full border border-enabledGold mr-3 w-9 h-9 p-0.75 flex justify-center items-center">
													<img
														src={validatorThumbnail || '/public/assets/icons/profile.svg'}
														alt="validator thumbnail"
														className="rounded-full"
													/>
												</div>
												<div className="font-body md:text-base text-sm">{activeValidator.description.moniker}</div>
											</TableData>
											<TableData
												width={'20%'}
												className={`!pl-0 !pr-5 !py-4 justify-end ${
													isSelected ? 'bg-selected-validator' : isDelegatedValidator ? 'bg-card' : 'bg-surface'
												}`}>
												<div className="font-body md:text-base text-sm">
													{DecUtils.trim(
														new Dec(activeValidator.commission.commission_rates.rate)
															.mul(DecUtils.getTenExponentN(2))
															.toString(1)
													)}
													%
												</div>
											</TableData>
										</TableBodyRow>
									);
								})}
						</tbody>
					</table>
				</div>
				<div className="mt-10 py-3 px-5 border border-white-faint rounded-xl bg-card">
					<div className="flex justify-between">
						<div className="font-body text-sm md:text-base">Bond Amount</div>
						<div className="font-body text-sm md:text-base text-white-mid">
							{new CoinPretty(amountConfig.sendCurrency, amountConfig.getAmountPrimitive().amount)
								.maxDecimals(3)
								.trim(true)
								.toString()}
						</div>
					</div>
					<div className="mt-4 flex justify-between">
						<div className="font-body text-sm md:text-base">Estimated Superfluid Delegation</div>
						<div className="font-body text-sm md:text-base text-white-mid">{`~${queries.rebus.querySuperfluidOsmoEquivalent
							.calculateOsmoEquivalent(
								new CoinPretty(amountConfig.sendCurrency, amountConfig.getAmountPrimitive().amount)
							)
							.maxDecimals(3)
							.trim(true)
							.toString()}`}</div>
					</div>
				</div>
				<div className="flex w-full justify-center items-center">
					<button
						className="mt-7.5 w-full md:w-2/3 h-12 md:h-15 bg-primary-200 rounded-2xl flex justify-center items-center hover:opacity-75 cursor-pointer disabled:opacity-50"
						disabled={
							!account.isReadyToSendMsgs || selectedValidatorAddress === '' || checkAmountConfigError(amountConfig)
						}
						onClick={async e => {
							e.preventDefault();

							if (account.isReadyToSendMsgs && selectedValidatorAddress) {
								await onSumbit(selectedValidatorAddress);
							}
						}}>
						{account.isSendingMsg === 'lockTokens' ||
						account.isSendingMsg === 'lockAndSuperfluidDelegate' ||
						account.isSendingMsg === 'superfluidDelegate' ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								viewBox="0 0 24 24">
								<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
								<path
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									className="opacity-75"
								/>
							</svg>
						) : (
							<p className="text-white-high font-semibold text-base md:text-lg">{'Bond & Stake'}</p>
						)}
					</button>
				</div>
			</React.Fragment>
		);
	}
);

const LockupItem: FunctionComponent<{
	duration: string;
	selected: boolean;
	setSelected: () => void;
	apy: string;
	isSuperfluidEnabled: boolean;
}> = ({ duration, selected, setSelected, apy, isSuperfluidEnabled }) => {
	return (
		<li
			onClick={setSelected}
			className={cn(
				{
					'shadow-elevation-08dp': selected,
				},
				'rounded-2xl px-0.25 py-0.25 w-full cursor-pointer',
				isSuperfluidEnabled ? 'bg-sfs' : selected ? 'bg-enabledGold bg-opacity-30' : 'bg-white-faint hover:opacity-75'
			)}>
			<div
				className={cn('flex items-center rounded-2xl bg-surface h-full px-5 py-3.5 md:py-5 md:px-4', {
					'bg-sfs-20': isSuperfluidEnabled && selected,
				})}>
				<figure
					className={cn(
						'rounded-full w-4 h-4 mr-5 md:mr-4 flex-shrink-0',
						selected ? 'border-secondary-200 border-4 bg-white-high' : 'border-iconDefault border'
					)}
				/>
				<div className="w-full flex items-center justify-between md:flex-col md:items-baseline">
					<div className="flex gap-1.5 items-center">
						<h5 className="text-base md:text-xl">{duration}</h5>
						{isSuperfluidEnabled && (
							<div className="w-6 h-6">
								<Img src={'/public/assets/icons/superfluid-osmo.svg'} />
							</div>
						)}
					</div>
					<p className="md:mt-1 text-secondary-200 text-sm md:text-base">{apy}</p>
				</div>
			</div>
		</li>
	);
};
