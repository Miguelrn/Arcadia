import React, { ElementType, useContext } from 'react';
import { UserContext } from '../UserContext';
import Login from '../views/Login';
// eslint-disable-next-line camelcase
import jwt_decode, { JwtPayload } from 'jwt-decode';

// import { EuiLoadingSpinner } from '@elastic/eui'
// import { useProtectedRoute } from 'src/hooks/auth/useProtectedRoute'
// import PagePermissions from '../Permissions/PagePermissions'

type ProtectedRouteProps = {
	component: ElementType;
	small?: boolean;
};

export default function ProtectedRoute({ component: Component, ...props }: ProtectedRouteProps) {
	// TODO: sacar las credenciales y comprobar que son validas, en caso de serlo guardar en context el id del user que se saca del payload
	const { accessToken } = useContext(UserContext);

	if (!accessToken) return <Login />;

	const decoded = jwt_decode<JwtPayload>(accessToken);
	const expDate = decoded.exp;
	if (expDate && new Date() > new Date(expDate * 1000)) return <Login />;

	const element = <Component path {...props} />;

	return element;
}
