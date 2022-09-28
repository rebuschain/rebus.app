import styled from '@emotion/styled';
import { Currency } from '@keplr-wallet/types';
import { CoinPretty, Dec, DecUtils, Int } from '@keplr-wallet/unit';
import { PricePretty } from '@keplr-wallet/unit/build/price-pretty';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text } from 'src/components/texts';
import { colorWhiteHigh } from 'src/emotion-styles/colors';
import { cssAlignRightInput, cssNumberTextInput } from 'src/emotion-styles/forms';
import { cssFontPoppins } from 'src/emotion-styles/texts';
import { useStore } from 'src/stores';
import useWindowSize from 'src/hooks/use-window-size';

interface Props {
	amount: string;
	currency: Currency;
	onChange: (input: string) => void;
}

export const TokenAmountInput = observer(({ amount, currency, onChange }: Props) => {
	const { priceStore } = useStore();
	const { isMobileView } = useWindowSize();

	const coinPretty = (() => {
		if (amount) {
			try {
				const result = new CoinPretty(currency, new Dec(amount).mul(DecUtils.getPrecisionDec(currency.coinDecimals)));
				if (result.toDec().gte(new Dec(0))) {
					return result;
				}
			} catch {
				return new CoinPretty(currency, new Dec(0));
			}
		}

		return new CoinPretty(currency, new Dec(0));
	})();

	const price =
		priceStore.calculatePrice(coinPretty) ?? new PricePretty(priceStore.getFiatCurrency('usd')!, new Int(0));

	return (
		<TokenAmountInputContainer>
			<AmountInput
				type="number"
				onChange={e => onChange(e.currentTarget.value)}
				value={amount !== '0' ? amount : ''}
				placeholder="0"
			/>
			<Text
				weight="semiBold"
				size="sm"
				isMobileView={isMobileView}
				emphasis={!amount || amount === '0' ? 'low' : 'high'}>
				≈ {price.toString()}
			</Text>
		</TokenAmountInputContainer>
	);
});

const TokenAmountInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	max-width: 250px;
`;

const AmountInput = styled.input`
	${cssFontPoppins};
	${cssAlignRightInput};
	${cssNumberTextInput};
	width: 100%;
	font-size: 20px;
	color: ${colorWhiteHigh};
	font-weight: 600;
	line-height: 1.3;

	@media (min-width: 768px) {
		font-size: 24px;
	}
`;
