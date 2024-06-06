import React from 'react';
import { observer } from 'mobx-react-lite';
import TextField from 'src/components/insync/text-field';
import { delegateDialogActions } from 'src/reducers/slices';
import variables from 'src/utils/variables';
import { useActions } from 'src/hooks/use-actions';
import { useAppSelector } from 'src/hooks/use-app-select';
import { RootState } from 'src/reducers/store';
import { useStore } from 'src/stores';
import { CoinPretty, Dec } from '@keplr-wallet/unit';
import styled from '@emotion/styled';

const selector = (state: RootState) => {
	return {
		lang: state.language,
		tokens: state.stake.delegateDialog.tokens,
		name: state.stake.delegateDialog.name,
		selectedValidator: state.stake.delegateDialog.validatorAddress,
	};
};

const TokensTextField = observer(() => {
	const [onChange] = useActions([delegateDialogActions.setTokens]);
	const { lang, tokens, name, selectedValidator } = useAppSelector(selector);
	const value = tokens || 0;
	const valueDec = new Dec(value);

	const { accountStore, chainStore, queriesStore, walletStore } = useStore();
	const account = accountStore.getAccount(chainStore.current.chainId);
	const address = walletStore.isLoaded ? walletStore.rebusAddress : account.bech32Address;
	const queries = queriesStore.get(chainStore.current.chainId);

	const delegations = queries.rebus.queryDelegations.get(address).response?.data?.result;
	const balance = queries.queryBalances.getQueryBech32Address(address).stakable.balance;

	const accountQuery = queries.rebus.queryAccount.get(address);
	const delegatedVestingBalance = accountQuery.delegatedBalance;
	const vestingBalance = accountQuery.vestingBalance;

	let stakedTokens = new CoinPretty(chainStore.current.stakeCurrency, 0);
	delegations?.forEach(currentValue => {
		stakedTokens = stakedTokens.add(new Dec(currentValue.balance.amount));
	});

	if (selectedValidator && (name === 'Undelegate' || name === 'Redelegate')) {
		const filterList = delegations?.find(
			value => value.delegation && value.delegation.validator_address === selectedValidator
		);

		if (filterList && filterList.balance && filterList.balance.amount) {
			stakedTokens = new CoinPretty(chainStore.current.stakeCurrency, new Dec(filterList.balance.amount));
		}
	}

	const vestingTokens = vestingBalance.sub(delegatedVestingBalance);

	let error = false;

	if ((name === 'Delegate' || name === 'Stake') && vestingTokens.toDec().gt(new Dec(0))) {
		error = valueDec.gt(balance.add(vestingTokens).toDec());
	} else if (name === 'Delegate' || name === 'Stake') {
		error = valueDec.gt(balance.toDec());
	} else if (name === 'Undelegate' || name === 'Redelegate') {
		error = valueDec.gt(stakedTokens.toDec());
	}

	const balancePretty = balance
		.trim(true)
		.hideDenom(true)
		.maxDecimals(8)
		.toString();

	const stakedTokensPretty = stakedTokens
		.trim(true)
		.hideDenom(true)
		.maxDecimals(8)
		.toString();

	const vestingTokensPretty = vestingTokens
		.trim(true)
		.hideDenom(true)
		.maxDecimals(8)
		.toString();

	return (
		<>
			<TextField
				error={error}
				errorText="Invalid Amount"
				id="tokens-text-field"
				name="tokens"
				type="number"
				value={tokens === null ? '' : tokens.toString()}
				onChange={onChange}
			/>
			<div className="flex items-center mt-5">
				<Heading>Max Available tokens:</Heading>
				{name === 'Delegate' || name === 'Stake' ? (
					<Value className="value" onClick={() => onChange(balancePretty.replace(/,/g, ''))}>
						{balancePretty}
					</Value>
				) : (name === 'Undelegate' || name === 'Redelegate') && selectedValidator ? (
					<Value className="value" onClick={() => onChange(stakedTokensPretty.replace(/,/g, ''))}>
						{stakedTokensPretty}
					</Value>
				) : null}
			</div>
			{vestingTokens.toDec().gt(new Dec(0)) && (name === 'Delegate' || name === 'Stake') ? (
				<div className="flex items-center mt-5">
					<Heading>{variables[lang]['vesting_tokens']}:</Heading>
					<Value className="value" onClick={() => onChange(vestingTokensPretty.replace(/,/g, ''))}>
						{vestingTokensPretty}
					</Value>
				</div>
			) : null}
		</>
	);
});

const Heading = styled.p`
	font-family: 'Blinker', sans-serif;
	font-size: 14px;
	line-height: 17px;
	text-align: center;
	color: #696969;
	margin-right: 20px;
`;

const Value = styled.p`
	font-family: 'Blinker', sans-serif;
	font-size: 14px;
	line-height: 17px;
	color: #0085ff;
	cursor: pointer;
`;

export default TokensTextField;
