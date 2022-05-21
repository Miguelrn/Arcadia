import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  workers: Array<Worker>;
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
  login: LoginResponse;
  register: Scalars['Boolean'];
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


export type MutationLoginArgs = {
  password: Scalars['String'];
  usercode: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  usercode: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  companies: Array<Company>;
  joblessWorkers: Array<Worker>;
  user?: Maybe<Array<User>>;
  users: Array<User>;
  workers: Array<Worker>;
};


export type QueryUserArgs = {
  userId: Scalars['Float'];
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

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usercode: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', id: string, company: string, industry: string, catch_phrase: string, logo: string, type: string, phone: string, others: any, workers: Array<{ __typename?: 'Worker', id: string, username: string }> }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, usercode: string, password: string, name: string, disabled: boolean }> };


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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
    }
    type
    phone
    others
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
      }
export function useCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;