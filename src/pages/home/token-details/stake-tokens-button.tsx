import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import variables from 'src/utils/variables';
import { useActions } from 'src/hooks/use-actions';
import { useAddress } from 'src/hooks/use-address';
import { delegateDialogActions, snackbarActions } from 'src/reducers/slices';
import { RootState } from 'src/reducers/store';
import { useAppSelector } from 'src/hooks/use-app-select';

const selector = (state: RootState) => {
	return {
		lang: state.language,
	};
};

const StakeTokensButton = observer(() => {
	const { lang } = useAppSelector(selector);
	const [handleOpen, showMessage] = useActions([
		delegateDialogActions.showDelegateDialog,
		snackbarActions.showSnackbar,
	]);
	const address = useAddress();

	const handleClick = () => {
		if (!address) {
			showMessage(variables[lang]['connect_account']);
			return;
		}

		handleOpen({ name: 'Stake' });
	};

	return (
		<Button className="btn gradient-blue whitespace-nowrap" variant="outlined" onClick={handleClick}>
			{variables[lang]['stake_tokens']}
		</Button>
	);
});

export default StakeTokensButton;
