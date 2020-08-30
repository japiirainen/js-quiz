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
  completedProblems?: Maybe<Array<Maybe<Scalars['ID']>>>;
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
  getProblemById: Problem;
  allProblems: Array<Maybe<Problem>>;
  problemGroup: ProblemGroup;
  findProblemsInGroup?: Maybe<Array<Maybe<Problem>>>;
};


export type QueryGetProblemByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryProblemGroupArgs = {
  _id: Scalars['ID'];
};


export type QueryFindProblemsInGroupArgs = {
  groupName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  changePassword: User;
  logout?: Maybe<Scalars['Boolean']>;
  submitResult?: Maybe<Result>;
  newProblem: Problem;
  addTestCase?: Maybe<Problem>;
  newProblemGroup: ProblemGroup;
  addProblemToGroup?: Maybe<ProblemGroup>;
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


export type MutationSubmitResultArgs = {
  input: ProblemResultInput;
};


export type MutationNewProblemArgs = {
  input?: Maybe<ProblemInput>;
};


export type MutationAddTestCaseArgs = {
  input?: Maybe<TestCaseInput>;
};


export type MutationNewProblemGroupArgs = {
  input?: Maybe<ProblemGroupInput>;
};


export type MutationAddProblemToGroupArgs = {
  input?: Maybe<AddProblem>;
};

export type ProblemResult = {
  __typename?: 'ProblemResult';
  userId: Scalars['ID'];
  problemId: Scalars['ID'];
  result?: Maybe<Result>;
};

export type Error = {
  __typename?: 'Error';
  message?: Maybe<Scalars['String']>;
  actual?: Maybe<Scalars['String']>;
  expected?: Maybe<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  solution: Scalars['String'];
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<Error>>>;
};

export type ProblemResultInput = {
  userId?: Maybe<Scalars['ID']>;
  problemId: Scalars['ID'];
  solution: Scalars['String'];
};

export enum Difficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD'
}

export type TestCase = {
  __typename?: 'TestCase';
  case?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Problem = {
  __typename?: 'Problem';
  _id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  difficulty: Difficulty;
  index: Scalars['Int'];
  problemGroup?: Maybe<Scalars['ID']>;
  testCases?: Maybe<TestCase>;
  correctSolution: Scalars['String'];
  placeHolder: Scalars['String'];
  placeHolderExpectation: Scalars['String'];
};

export type ProblemInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  difficulty: Difficulty;
  index: Scalars['Int'];
  problemGroup?: Maybe<Scalars['ID']>;
  testCases?: Maybe<Array<Maybe<Scalars['String']>>>;
  correctSolution: Scalars['String'];
  placeHolder: Scalars['String'];
  placeHolderExpectation: Scalars['String'];
};

export type TestCaseInput = {
  _id: Scalars['ID'];
  testCase: Scalars['String'];
};

export type ProblemGroup = {
  __typename?: 'ProblemGroup';
  _id: Scalars['ID'];
  name: Scalars['String'];
  problems: Array<Scalars['ID']>;
};

export type ProblemGroupInput = {
  name: Scalars['String'];
};

export type AddProblem = {
  groupId: Scalars['ID'];
  problemId: Scalars['ID'];
};

export type RegProblemFragment = (
  { __typename?: 'Problem' }
  & Pick<Problem, '_id' | 'name' | 'description' | 'difficulty' | 'correctSolution' | 'placeHolder' | 'placeHolderExpectation'>
);

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

export type SubmitResultMutationVariables = Exact<{
  input: ProblemResultInput;
}>;


export type SubmitResultMutation = (
  { __typename?: 'Mutation' }
  & { submitResult?: Maybe<(
    { __typename?: 'Result' }
    & Pick<Result, 'solution' | 'success'>
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'message' | 'actual' | 'expected'>
    )>>> }
  )> }
);

export type GetProblemByIdQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type GetProblemByIdQuery = (
  { __typename?: 'Query' }
  & { getProblemById: (
    { __typename?: 'Problem' }
    & RegProblemFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'completedProblems'>
    & RegUserFragment
  )> }
);

export const RegProblemFragmentDoc = gql`
    fragment RegProblem on Problem {
  _id
  name
  description
  difficulty
  correctSolution
  placeHolder
  placeHolderExpectation
}
    `;
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
export const SubmitResultDocument = gql`
    mutation SubmitResult($input: ProblemResultInput!) {
  submitResult(input: $input) {
    solution
    success
    errors {
      message
      actual
      expected
    }
  }
}
    `;

export function useSubmitResultMutation() {
  return Urql.useMutation<SubmitResultMutation, SubmitResultMutationVariables>(SubmitResultDocument);
};
export const GetProblemByIdDocument = gql`
    query GetProblemById($_id: ID!) {
  getProblemById(_id: $_id) {
    ...RegProblem
  }
}
    ${RegProblemFragmentDoc}`;

export function useGetProblemByIdQuery(options: Omit<Urql.UseQueryArgs<GetProblemByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProblemByIdQuery>({ query: GetProblemByIdDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegUser
    completedProblems
  }
}
    ${RegUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};