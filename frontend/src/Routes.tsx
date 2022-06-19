import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import CircularProgress from '@mui/material/CircularProgress';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/react-hooks';

const Home = lazy(() => import('./views/Home'));
const Login = lazy(() => import('./views/Login'));
const WorldMap = lazy(() => import('./views/WorlMap'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Companies = lazy(() => import('./views/Companies'));
const Workers = lazy(() => import('./views/Workers'));

const httpLink = createHttpLink({
	uri: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/graphql`,
	credentials: 'include',
});

export default function AppRoutes() {
	const [accessToken, setAccessToken] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/refresh_token`, {
			method: 'POST',
			credentials: 'include',
		}).then(async res => {
			const token = await res.json();
			if (token.ok === true) setAccessToken(token.accesstoken);
			setLoading(false);
		});
	}, []);

	if (loading) return <CircularProgress />;

	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: accessToken ? `Bearer ${accessToken}` : '',
			},
		};
	});

	const client = new ApolloClient({
		uri: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/graphql`,
		cache: new InMemoryCache(),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: 'network-only',
			},
		},
		link: authLink.concat(httpLink),
	});

	return (
		<Router>
			<UserContext.Provider value={{ accessToken, setAccessToken }}>
				<ApolloProvider client={client}>
					<Routes>
						<Route
							path='/worldmap'
							element={
								<Suspense fallback={<CircularProgress />}>
									<ProtectedRoute component={WorldMap} />
								</Suspense>
							}
						/>
						<Route
							path='/companies'
							element={
								<Suspense fallback={<CircularProgress />}>
									<ProtectedRoute component={Companies} small={false} />
								</Suspense>
							}
						/>
						<Route
							path='/workers'
							element={
								<Suspense fallback={<CircularProgress />}>
									<ProtectedRoute component={Workers} />
								</Suspense>
							}
						/>
						<Route
							path='/login'
							element={
								<Suspense fallback={<CircularProgress />}>
									<Login />
								</Suspense>
							}
						/>
						<Route
							path='/'
							element={
								<Suspense fallback={<CircularProgress />}>
									<Home />
								</Suspense>
							}
						/>
					</Routes>
				</ApolloProvider>
			</UserContext.Provider>
		</Router>
	);
}
