import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
	DateTime: any;
	/** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
	JSONObject: any;
};

export type Company = {
	__typename?: 'Company';
	catch_phrase: Scalars['String'];
	company: Scalars['String'];
	created_at: Scalars['DateTime'];
	disabled: Scalars['Boolean'];
	id: Scalars['ID'];
	industry: Scalars['String'];
	logo: Scalars['String'];
	others: Scalars['JSONObject'];
	phone: Scalars['String'];
	type: Scalars['String'];
	updated_at: Scalars['DateTime'];
	workers?: Maybe<Array<Worker>>;
};

export type LoginResponse = {
	__typename?: 'LoginResponse';
	accessToken: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	asignCompany: Scalars['Boolean'];
	createCompany: Company;
	createUser: User;
	createWorker: Worker;
	deleteJob: Scalars['Boolean'];
	disableCompany: Scalars['Boolean'];
	disableWorker: Scalars['Boolean'];
	login: LoginResponse;
	register: Scalars['Boolean'];
	updateCompany: Scalars['Boolean'];
	updateWorker: Scalars['Boolean'];
};

export type MutationAsignCompanyArgs = {
	companyId: Scalars['Float'];
	userId: Scalars['Float'];
};

export type MutationCreateUserArgs = {
	name: Scalars['String'];
	password: Scalars['String'];
	usercode: Scalars['String'];
};

export type MutationDeleteJobArgs = {
	companyId: Scalars['Float'];
	workerId: Scalars['Float'];
};

export type MutationDisableCompanyArgs = {
	companyId: Scalars['Float'];
};

export type MutationDisableWorkerArgs = {
	workerId: Scalars['Float'];
};

export type MutationLoginArgs = {
	password: Scalars['String'];
	usercode: Scalars['String'];
};

export type MutationRegisterArgs = {
	password: Scalars['String'];
	usercode: Scalars['String'];
};

export type MutationUpdateCompanyArgs = {
	catch_phrase: Scalars['String'];
	companyId: Scalars['Float'];
	companyName: Scalars['String'];
	industry: Scalars['String'];
	logo: Scalars['String'];
	others: Scalars['String'];
	phone: Scalars['String'];
	type: Scalars['String'];
};

export type MutationUpdateWorkerArgs = {
	avatar: Scalars['String'];
	birthdate: Scalars['String'];
	email: Scalars['String'];
	gender: Scalars['String'];
	name: Scalars['String'];
	others: Scalars['String'];
	phone: Scalars['String'];
	surname: Scalars['String'];
	username: Scalars['String'];
	workerId: Scalars['Float'];
};

export type Query = {
	__typename?: 'Query';
	companies: Array<Company>;
	companyById?: Maybe<Company>;
	joblessWorkers: Array<Worker>;
	user?: Maybe<Array<User>>;
	users: Array<User>;
	workerById?: Maybe<Worker>;
	workers: Array<Worker>;
};

export type QueryCompanyByIdArgs = {
	companyId: Scalars['Float'];
};

export type QueryUserArgs = {
	userId: Scalars['Float'];
};

export type QueryWorkerByIdArgs = {
	workerId: Scalars['Float'];
};

export type User = {
	__typename?: 'User';
	created_at: Scalars['DateTime'];
	disabled: Scalars['Boolean'];
	id: Scalars['ID'];
	name: Scalars['String'];
	password: Scalars['String'];
	updated_at: Scalars['DateTime'];
	usercode: Scalars['String'];
};

export type Worker = {
	__typename?: 'Worker';
	avatar: Scalars['String'];
	birthdate: Scalars['DateTime'];
	company?: Maybe<Company>;
	created_at: Scalars['DateTime'];
	disabled: Scalars['Boolean'];
	email: Scalars['String'];
	gender: Scalars['String'];
	id: Scalars['ID'];
	name: Scalars['String'];
	others: Scalars['JSONObject'];
	phone: Scalars['String'];
	surname: Scalars['String'];
	updated_at: Scalars['DateTime'];
	username: Scalars['String'];
};

export type AsignCompanyMutationVariables = Exact<{
	companyId: Scalars['Float'];
	userId: Scalars['Float'];
}>;

export type AsignCompanyMutation = {
	__typename?: 'Mutation';
	asignCompany: boolean;
};

export type CreateCompanyMutationVariables = Exact<{ [key: string]: never }>;

export type CreateCompanyMutation = {
	__typename?: 'Mutation';
	createCompany: {
		__typename?: 'Company';
		id: string;
		company: string;
		industry: string;
		catch_phrase: string;
		logo: string;
		type: string;
	};
};

export type CreateWorkerMutationVariables = Exact<{ [key: string]: never }>;

export type CreateWorkerMutation = {
	__typename?: 'Mutation';
	createWorker: {
		__typename?: 'Worker';
		id: string;
		username: string;
		name: string;
		surname: string;
		email: string;
		avatar: string;
		gender: string;
		phone: string;
		birthdate: any;
		others: any;
		disabled: boolean;
		created_at: any;
		updated_at: any;
	};
};

export type DeleteJobMutationVariables = Exact<{
	companyId: Scalars['Float'];
	workerId: Scalars['Float'];
}>;

export type DeleteJobMutation = { __typename?: 'Mutation'; deleteJob: boolean };

export type DisableCompanyMutationVariables = Exact<{
	companyId: Scalars['Float'];
}>;

export type DisableCompanyMutation = {
	__typename?: 'Mutation';
	disableCompany: boolean;
};

export type DisableWorkerMutationVariables = Exact<{
	workerId: Scalars['Float'];
}>;

export type DisableWorkerMutation = {
	__typename?: 'Mutation';
	disableWorker: boolean;
};

export type LoginMutationVariables = Exact<{
	password: Scalars['String'];
	usercode: Scalars['String'];
}>;

export type LoginMutation = {
	__typename?: 'Mutation';
	login: { __typename?: 'LoginResponse'; accessToken: string };
};

export type UpdateWorkerMutationVariables = Exact<{
	others: Scalars['String'];
	birthdate: Scalars['String'];
	phone: Scalars['String'];
	gender: Scalars['String'];
	avatar: Scalars['String'];
	email: Scalars['String'];
	surname: Scalars['String'];
	name: Scalars['String'];
	username: Scalars['String'];
	workerId: Scalars['Float'];
}>;

export type UpdateWorkerMutation = {
	__typename?: 'Mutation';
	updateWorker: boolean;
};

export type UpdateCompanyMutationVariables = Exact<{
	others: Scalars['String'];
	phone: Scalars['String'];
	type: Scalars['String'];
	logo: Scalars['String'];
	catchPhrase: Scalars['String'];
	industry: Scalars['String'];
	companyName: Scalars['String'];
	companyId: Scalars['Float'];
}>;

export type UpdateCompanyMutation = {
	__typename?: 'Mutation';
	updateCompany: boolean;
};

export type CompaniesQueryVariables = Exact<{ [key: string]: never }>;

export type CompaniesQuery = {
	__typename?: 'Query';
	companies: Array<{
		__typename?: 'Company';
		id: string;
		company: string;
		industry: string;
		catch_phrase: string;
		logo: string;
		type: string;
		phone: string;
		others: any;
		disabled: boolean;
		created_at: any;
		updated_at: any;
		workers?: Array<{
			__typename?: 'Worker';
			id: string;
			username: string;
			name: string;
			surname: string;
			email: string;
			avatar: string;
			gender: string;
			phone: string;
			birthdate: any;
			others: any;
			disabled: boolean;
			created_at: any;
			updated_at: any;
		}> | null;
	}>;
};

export type CompanyByIdQueryVariables = Exact<{
	companyId: Scalars['Float'];
}>;

export type CompanyByIdQuery = {
	__typename?: 'Query';
	companyById?: {
		__typename?: 'Company';
		id: string;
		company: string;
		industry: string;
		catch_phrase: string;
		logo: string;
		type: string;
		phone: string;
		others: any;
		disabled: boolean;
		created_at: any;
		updated_at: any;
	} | null;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
	__typename?: 'Query';
	users: Array<{
		__typename?: 'User';
		id: string;
		usercode: string;
		password: string;
		name: string;
		disabled: boolean;
	}>;
};

export type WorkerByIdQueryVariables = Exact<{
	workerId: Scalars['Float'];
}>;

export type WorkerByIdQuery = {
	__typename?: 'Query';
	workerById?: {
		__typename?: 'Worker';
		id: string;
		username: string;
		name: string;
		surname: string;
		email: string;
		avatar: string;
		gender: string;
		phone: string;
		birthdate: any;
		others: any;
		disabled: boolean;
		created_at: any;
		updated_at: any;
		company?: {
			__typename?: 'Company';
			id: string;
			company: string;
			industry: string;
			catch_phrase: string;
			logo: string;
			type: string;
			phone: string;
			others: any;
			disabled: boolean;
			created_at: any;
			updated_at: any;
			workers?: Array<{
				__typename?: 'Worker';
				id: string;
				username: string;
				name: string;
				surname: string;
				email: string;
				avatar: string;
				gender: string;
				phone: string;
				birthdate: any;
				others: any;
				disabled: boolean;
				created_at: any;
				updated_at: any;
			}> | null;
		} | null;
	} | null;
};

export type WorkersQueryVariables = Exact<{ [key: string]: never }>;

export type WorkersQuery = {
	__typename?: 'Query';
	workers: Array<{
		__typename?: 'Worker';
		id: string;
		username: string;
		name: string;
		surname: string;
		email: string;
		avatar: string;
		gender: string;
		phone: string;
		birthdate: any;
		others: any;
		disabled: boolean;
		created_at: any;
		updated_at: any;
		company?: {
			__typename?: 'Company';
			id: string;
			company: string;
			industry: string;
			catch_phrase: string;
			logo: string;
			type: string;
			phone: string;
			others: any;
			disabled: boolean;
			created_at: any;
			updated_at: any;
		} | null;
	}>;
};

export const AsignCompanyDocument = gql`
	mutation AsignCompany($companyId: Float!, $userId: Float!) {
		asignCompany(companyId: $companyId, userId: $userId)
	}
`;
export type AsignCompanyMutationFn = Apollo.MutationFunction<AsignCompanyMutation, AsignCompanyMutationVariables>;

/**
 * __useAsignCompanyMutation__
 *
 * To run a mutation, you first call `useAsignCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAsignCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [asignCompanyMutation, { data, loading, error }] = useAsignCompanyMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAsignCompanyMutation(
	baseOptions?: Apollo.MutationHookOptions<AsignCompanyMutation, AsignCompanyMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<AsignCompanyMutation, AsignCompanyMutationVariables>(AsignCompanyDocument, options);
}
export type AsignCompanyMutationHookResult = ReturnType<typeof useAsignCompanyMutation>;
export type AsignCompanyMutationResult = Apollo.MutationResult<AsignCompanyMutation>;
export type AsignCompanyMutationOptions = Apollo.BaseMutationOptions<
	AsignCompanyMutation,
	AsignCompanyMutationVariables
>;
export const CreateCompanyDocument = gql`
	mutation CreateCompany {
		createCompany {
			id
			company
			industry
			catch_phrase
			logo
			type
		}
	}
`;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCompanyMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
}
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<
	CreateCompanyMutation,
	CreateCompanyMutationVariables
>;
export const CreateWorkerDocument = gql`
	mutation CreateWorker {
		createWorker {
			id
			username
			name
			surname
			email
			avatar
			gender
			phone
			birthdate
			others
			disabled
			created_at
			updated_at
		}
	}
`;
export type CreateWorkerMutationFn = Apollo.MutationFunction<CreateWorkerMutation, CreateWorkerMutationVariables>;

/**
 * __useCreateWorkerMutation__
 *
 * To run a mutation, you first call `useCreateWorkerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkerMutation, { data, loading, error }] = useCreateWorkerMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateWorkerMutation(
	baseOptions?: Apollo.MutationHookOptions<CreateWorkerMutation, CreateWorkerMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<CreateWorkerMutation, CreateWorkerMutationVariables>(CreateWorkerDocument, options);
}
export type CreateWorkerMutationHookResult = ReturnType<typeof useCreateWorkerMutation>;
export type CreateWorkerMutationResult = Apollo.MutationResult<CreateWorkerMutation>;
export type CreateWorkerMutationOptions = Apollo.BaseMutationOptions<
	CreateWorkerMutation,
	CreateWorkerMutationVariables
>;
export const DeleteJobDocument = gql`
	mutation DeleteJob($companyId: Float!, $workerId: Float!) {
		deleteJob(companyId: $companyId, workerId: $workerId)
	}
`;
export type DeleteJobMutationFn = Apollo.MutationFunction<DeleteJobMutation, DeleteJobMutationVariables>;

/**
 * __useDeleteJobMutation__
 *
 * To run a mutation, you first call `useDeleteJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJobMutation, { data, loading, error }] = useDeleteJobMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      workerId: // value for 'workerId'
 *   },
 * });
 */
export function useDeleteJobMutation(
	baseOptions?: Apollo.MutationHookOptions<DeleteJobMutation, DeleteJobMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<DeleteJobMutation, DeleteJobMutationVariables>(DeleteJobDocument, options);
}
export type DeleteJobMutationHookResult = ReturnType<typeof useDeleteJobMutation>;
export type DeleteJobMutationResult = Apollo.MutationResult<DeleteJobMutation>;
export type DeleteJobMutationOptions = Apollo.BaseMutationOptions<DeleteJobMutation, DeleteJobMutationVariables>;
export const DisableCompanyDocument = gql`
	mutation DisableCompany($companyId: Float!) {
		disableCompany(companyId: $companyId)
	}
`;
export type DisableCompanyMutationFn = Apollo.MutationFunction<DisableCompanyMutation, DisableCompanyMutationVariables>;

/**
 * __useDisableCompanyMutation__
 *
 * To run a mutation, you first call `useDisableCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableCompanyMutation, { data, loading, error }] = useDisableCompanyMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDisableCompanyMutation(
	baseOptions?: Apollo.MutationHookOptions<DisableCompanyMutation, DisableCompanyMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<DisableCompanyMutation, DisableCompanyMutationVariables>(DisableCompanyDocument, options);
}
export type DisableCompanyMutationHookResult = ReturnType<typeof useDisableCompanyMutation>;
export type DisableCompanyMutationResult = Apollo.MutationResult<DisableCompanyMutation>;
export type DisableCompanyMutationOptions = Apollo.BaseMutationOptions<
	DisableCompanyMutation,
	DisableCompanyMutationVariables
>;
export const DisableWorkerDocument = gql`
	mutation DisableWorker($workerId: Float!) {
		disableWorker(workerId: $workerId)
	}
`;
export type DisableWorkerMutationFn = Apollo.MutationFunction<DisableWorkerMutation, DisableWorkerMutationVariables>;

/**
 * __useDisableWorkerMutation__
 *
 * To run a mutation, you first call `useDisableWorkerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableWorkerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableWorkerMutation, { data, loading, error }] = useDisableWorkerMutation({
 *   variables: {
 *      workerId: // value for 'workerId'
 *   },
 * });
 */
export function useDisableWorkerMutation(
	baseOptions?: Apollo.MutationHookOptions<DisableWorkerMutation, DisableWorkerMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<DisableWorkerMutation, DisableWorkerMutationVariables>(DisableWorkerDocument, options);
}
export type DisableWorkerMutationHookResult = ReturnType<typeof useDisableWorkerMutation>;
export type DisableWorkerMutationResult = Apollo.MutationResult<DisableWorkerMutation>;
export type DisableWorkerMutationOptions = Apollo.BaseMutationOptions<
	DisableWorkerMutation,
	DisableWorkerMutationVariables
>;
export const LoginDocument = gql`
	mutation Login($password: String!, $usercode: String!) {
		login(password: $password, usercode: $usercode) {
			accessToken
		}
	}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      usercode: // value for 'usercode'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateWorkerDocument = gql`
	mutation UpdateWorker(
		$others: String!
		$birthdate: String!
		$phone: String!
		$gender: String!
		$avatar: String!
		$email: String!
		$surname: String!
		$name: String!
		$username: String!
		$workerId: Float!
	) {
		updateWorker(
			others: $others
			birthdate: $birthdate
			phone: $phone
			gender: $gender
			avatar: $avatar
			email: $email
			surname: $surname
			name: $name
			username: $username
			workerId: $workerId
		)
	}
`;
export type UpdateWorkerMutationFn = Apollo.MutationFunction<UpdateWorkerMutation, UpdateWorkerMutationVariables>;

/**
 * __useUpdateWorkerMutation__
 *
 * To run a mutation, you first call `useUpdateWorkerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkerMutation, { data, loading, error }] = useUpdateWorkerMutation({
 *   variables: {
 *      others: // value for 'others'
 *      birthdate: // value for 'birthdate'
 *      phone: // value for 'phone'
 *      gender: // value for 'gender'
 *      avatar: // value for 'avatar'
 *      email: // value for 'email'
 *      surname: // value for 'surname'
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      workerId: // value for 'workerId'
 *   },
 * });
 */
export function useUpdateWorkerMutation(
	baseOptions?: Apollo.MutationHookOptions<UpdateWorkerMutation, UpdateWorkerMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<UpdateWorkerMutation, UpdateWorkerMutationVariables>(UpdateWorkerDocument, options);
}
export type UpdateWorkerMutationHookResult = ReturnType<typeof useUpdateWorkerMutation>;
export type UpdateWorkerMutationResult = Apollo.MutationResult<UpdateWorkerMutation>;
export type UpdateWorkerMutationOptions = Apollo.BaseMutationOptions<
	UpdateWorkerMutation,
	UpdateWorkerMutationVariables
>;
export const UpdateCompanyDocument = gql`
	mutation UpdateCompany(
		$others: String!
		$phone: String!
		$type: String!
		$logo: String!
		$catchPhrase: String!
		$industry: String!
		$companyName: String!
		$companyId: Float!
	) {
		updateCompany(
			others: $others
			phone: $phone
			type: $type
			logo: $logo
			catch_phrase: $catchPhrase
			industry: $industry
			companyName: $companyName
			companyId: $companyId
		)
	}
`;
export type UpdateCompanyMutationFn = Apollo.MutationFunction<UpdateCompanyMutation, UpdateCompanyMutationVariables>;

/**
 * __useUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMutation, { data, loading, error }] = useUpdateCompanyMutation({
 *   variables: {
 *      others: // value for 'others'
 *      phone: // value for 'phone'
 *      type: // value for 'type'
 *      logo: // value for 'logo'
 *      catchPhrase: // value for 'catchPhrase'
 *      industry: // value for 'industry'
 *      companyName: // value for 'companyName'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useUpdateCompanyMutation(
	baseOptions?: Apollo.MutationHookOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument, options);
}
export type UpdateCompanyMutationHookResult = ReturnType<typeof useUpdateCompanyMutation>;
export type UpdateCompanyMutationResult = Apollo.MutationResult<UpdateCompanyMutation>;
export type UpdateCompanyMutationOptions = Apollo.BaseMutationOptions<
	UpdateCompanyMutation,
	UpdateCompanyMutationVariables
>;
export const CompaniesDocument = gql`
	query Companies {
		companies {
			id
			company
			industry
			catch_phrase
			logo
			workers {
				id
				username
				name
				surname
				email
				avatar
				gender
				phone
				birthdate
				others
				disabled
				created_at
				updated_at
			}
			type
			phone
			others
			disabled
			created_at
			updated_at
		}
	}
`;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
}
export function useCompaniesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
}
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
export const CompanyByIdDocument = gql`
	query CompanyById($companyId: Float!) {
		companyById(companyId: $companyId) {
			id
			company
			industry
			catch_phrase
			logo
			type
			phone
			others
			disabled
			created_at
			updated_at
		}
	}
`;

/**
 * __useCompanyByIdQuery__
 *
 * To run a query within a React component, call `useCompanyByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyByIdQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useCompanyByIdQuery(baseOptions: Apollo.QueryHookOptions<CompanyByIdQuery, CompanyByIdQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<CompanyByIdQuery, CompanyByIdQueryVariables>(CompanyByIdDocument, options);
}
export function useCompanyByIdLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<CompanyByIdQuery, CompanyByIdQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<CompanyByIdQuery, CompanyByIdQueryVariables>(CompanyByIdDocument, options);
}
export type CompanyByIdQueryHookResult = ReturnType<typeof useCompanyByIdQuery>;
export type CompanyByIdLazyQueryHookResult = ReturnType<typeof useCompanyByIdLazyQuery>;
export type CompanyByIdQueryResult = Apollo.QueryResult<CompanyByIdQuery, CompanyByIdQueryVariables>;
export const UsersDocument = gql`
	query Users {
		users {
			id
			usercode
			password
			name
			disabled
		}
	}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const WorkerByIdDocument = gql`
	query workerById($workerId: Float!) {
		workerById(workerId: $workerId) {
			id
			username
			name
			surname
			email
			avatar
			gender
			phone
			birthdate
			others
			disabled
			created_at
			updated_at
			company {
				id
				company
				industry
				catch_phrase
				logo
				type
				phone
				others
				disabled
				created_at
				updated_at
				workers {
					id
					username
					name
					surname
					email
					avatar
					gender
					phone
					birthdate
					others
					disabled
					created_at
					updated_at
				}
			}
		}
	}
`;

/**
 * __useWorkerByIdQuery__
 *
 * To run a query within a React component, call `useWorkerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkerByIdQuery({
 *   variables: {
 *      workerId: // value for 'workerId'
 *   },
 * });
 */
export function useWorkerByIdQuery(baseOptions: Apollo.QueryHookOptions<WorkerByIdQuery, WorkerByIdQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<WorkerByIdQuery, WorkerByIdQueryVariables>(WorkerByIdDocument, options);
}
export function useWorkerByIdLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<WorkerByIdQuery, WorkerByIdQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<WorkerByIdQuery, WorkerByIdQueryVariables>(WorkerByIdDocument, options);
}
export type WorkerByIdQueryHookResult = ReturnType<typeof useWorkerByIdQuery>;
export type WorkerByIdLazyQueryHookResult = ReturnType<typeof useWorkerByIdLazyQuery>;
export type WorkerByIdQueryResult = Apollo.QueryResult<WorkerByIdQuery, WorkerByIdQueryVariables>;
export const WorkersDocument = gql`
	query Workers {
		workers {
			id
			username
			name
			surname
			email
			avatar
			gender
			phone
			birthdate
			others
			company {
				id
				company
				industry
				catch_phrase
				logo
				type
				phone
				others
				disabled
				created_at
				updated_at
			}
			disabled
			created_at
			updated_at
		}
	}
`;

/**
 * __useWorkersQuery__
 *
 * To run a query within a React component, call `useWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkersQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorkersQuery(baseOptions?: Apollo.QueryHookOptions<WorkersQuery, WorkersQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<WorkersQuery, WorkersQueryVariables>(WorkersDocument, options);
}
export function useWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkersQuery, WorkersQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<WorkersQuery, WorkersQueryVariables>(WorkersDocument, options);
}
export type WorkersQueryHookResult = ReturnType<typeof useWorkersQuery>;
export type WorkersLazyQueryHookResult = ReturnType<typeof useWorkersLazyQuery>;
export type WorkersQueryResult = Apollo.QueryResult<WorkersQuery, WorkersQueryVariables>;
