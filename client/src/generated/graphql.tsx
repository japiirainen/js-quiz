import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ChangePasswordInput = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  changePassword: User;
  logout?: Maybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  input?: Maybe<RegisterInput>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationForgotPasswordArgs = {
  input?: Maybe<ForgotPasswordInput>;
};


export type MutationChangePasswordArgs = {
  input?: Maybe<ChangePasswordInput>;
};

export type RegUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username'>
);

export type ChangePasswordMutationVariables = Exact<{
  input?: Maybe<ChangePasswordInput>;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'User' }
    & RegUserFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  input?: Maybe<ForgotPasswordInput>;
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  input?: Maybe<LoginInput>;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & RegUserFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input?: Maybe<RegisterInput>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & RegUserFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegUserFragment
  )> }
);

export const RegUserFragmentDoc = gql`
    fragment RegUser on User {
  _id
  username
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: changePasswordInput) {
  changePassword(input: $input) {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($input: forgotPasswordInput) {
  forgotPassword(input: $input)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($input: loginInput) {
  login(input: $input) {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: registerInput) {
  register(input: $input) {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};