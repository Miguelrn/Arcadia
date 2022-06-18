import React, { ElementType, useContext } from 'react';
import { UserContext } from '../UserContext';
import Login from '../views/Login';
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

	let decoded = jwt_decode<JwtPayload>(accessToken);
	let exp_date = decoded.exp;
	if (exp_date && new Date() > new Date(exp_date * 1000)) return <Login />;

	const element = <Component path {...props} />;

	return element;
}
