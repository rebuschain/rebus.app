import env from '@beam-australia/react-env';

const publicPath = env('PUBLIC_PATH');

if (publicPath) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	__webpack_public_path__ = publicPath;
}

import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import React, { FunctionComponent, Suspense, lazy, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { Loader } from 'src/components/common/loader';
import { ROUTES } from './constants/routes';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import { ToastProvider } from './components/common/toasts';
import { NotFoundPage } from './pages/not-found';
import { StoreProvider } from './stores';
import './styles/globals.scss';
import './styles/index.scss';
import { Terms } from './terms';
import { IBCHistoryNotifier } from './provider';
import { AccountConnectionProvider } from 'src/hooks/account/context';
import styled from '@emotion/styled';

import { store } from './reducers/store';
import { RouteWrapper } from './components/layouts/route-wrapper';

import { lightTheme, darkTheme } from 'src/theme';
//import Slider from 'src/components/common/slider'; Import to test
import { useCookies } from 'react-cookie';

const LoaderStyled = styled(Loader)`
	width: 6rem;
	height: 6rem;
	@media (min-width: 768px) {
		width: 12.5rem;
		height: 12.5rem;
	}
`;

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);

const queryClient = new QueryClient();
const container = document.getElementById('app');
const root = createRoot(container!);

const IbcTransfer = lazy(() => import('./pages/ibc-transfer'));
const NftId = lazy(() => import('./pages/nft-id'));
const NftIdView = lazy(() => import('./pages/nft-id-view'));
const Tools = lazy(() => import('./pages/tools'));
const Assets = lazy(() => import('./pages/assets'));
const Stake = lazy(() => import('./pages/home'));
const Vote = lazy(() => import('./pages/proposals'));
const ProposalDetails = lazy(() => import('./pages/proposal-details'));
const WalletConnect = lazy(() => import('./pages/wallet-connect'));
const RedirectToAssets = () => <Navigate to={ROUTES.ASSETS} />;

const Router: FunctionComponent<React.PropsWithChildren<unknown>> = () => {
	const [cookies, setCookie] = useCookies(['theme']);
	const [theme, setTheme] = useState(cookies.theme || 'light');
	const isDark = theme === 'dark';

	const toggleTheme = () => {
		const newTheme = isDark ? 'light' : 'dark';
		setTheme(newTheme);
		setCookie('theme', newTheme, { path: '/' });
	};

	useEffect(() => {
		const savedTheme = cookies.theme;
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, [cookies.theme]);

	/* Include Slider to test, under <ToastContainer transition={Bounce} />  places it at the bottom of the screen
	<div>
		<Slider toggleTheme={toggleTheme} isDarkTheme={isDark ? true : false} />
	</div>
	*/

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<QueryClientProvider client={queryClient}>
						<Provider store={store}>
							<StoreProvider>
								<ToastProvider>
									<AccountConnectionProvider>
										<IBCHistoryNotifier />
										<Terms />
										<div className="h-screen z-0">
											<BrowserRouter>
												<RouteWrapper>
													<Suspense fallback={<LoaderStyled />}>
														<Routes>
															<Route path="/" element={<RedirectToAssets />} />
															<Route path={ROUTES.IBC_TRANSFER} element={<IbcTransfer />} />
															<Route path={ROUTES.NFT_ID} element={<NftId />} />
															<Route path={ROUTES.NFT_ID_EDIT} element={<NftId />} />
															<Route path={ROUTES.NFT_ID_VIEW} element={<NftIdView />} />
															<Route path={ROUTES.TOOLS} element={<Tools />} />
															<Route path={ROUTES.ASSETS} element={<Assets />} />
															<Route path={ROUTES.STAKE} element={<Stake />} />
															<Route path={ROUTES.VOTE} element={<Vote />} />
															<Route path={`${ROUTES.VOTE}/:proposalId`} element={<ProposalDetails />} />
															<Route path={ROUTES.WALLET_CONNECT} element={<WalletConnect />} />
															<Route path="*" element={<NotFoundPage />} />
														</Routes>
													</Suspense>
												</RouteWrapper>
											</BrowserRouter>
										</div>
										<ToastContainer transition={Bounce} />
									</AccountConnectionProvider>
								</ToastProvider>
							</StoreProvider>
						</Provider>
					</QueryClientProvider>
				</LocalizationProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

root.render(<Router />);
