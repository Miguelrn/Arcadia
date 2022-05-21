import React, { ElementType } from 'react'
import Login from '../views/Login'
// import { EuiLoadingSpinner } from '@elastic/eui'
// import { useProtectedRoute } from 'src/hooks/auth/useProtectedRoute'
// import PagePermissions from '../Permissions/PagePermissions'

type ProtectedRouteProps = {
  component: ElementType
}

export default function ProtectedRoute({component: Component, ...props}: ProtectedRouteProps) {
    // TODO: sacar las credenciales y comprobar que son validas, en caso de serlo guardar en context el id del user que se saca del payload

    if (!true) {
        return (
        <>
            <Login />
        </>
        )
    }

    const element = <Component path {...props} />

    return element
}
