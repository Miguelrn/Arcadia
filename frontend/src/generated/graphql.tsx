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

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, usercode: string, password: string, name: string, disabled: boolean }> };


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