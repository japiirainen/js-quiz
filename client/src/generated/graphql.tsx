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

export type UpdateUserInput = {
  _id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getSolution?: Maybe<Solution>;
  getProblemById: Problem;
  getProblemByIndex?: Maybe<ByIndexRes>;
  getAllProblems: Array<Maybe<Problem>>;
  problemGroup: ProblemGroup;
  findProblemsInGroup?: Maybe<Array<Maybe<Problem>>>;
};


export type QueryGetSolutionArgs = {
  input?: Maybe<GetSolutionInput>;
};


export type QueryGetProblemByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryGetProblemByIndexArgs = {
  index: Scalars['Int'];
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
  updateUser: User;
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


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
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
  user?: Maybe<User>;
};

export type Solution = {
  __typename?: 'Solution';
  userId: Scalars['ID'];
  problemId: Scalars['ID'];
  solution: Scalars['String'];
};

export type GetSolutionInput = {
  userId?: Maybe<Scalars['ID']>;
  problemId?: Maybe<Scalars['ID']>;
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

export type PlaceHolderInputOutput = {
  __typename?: 'PlaceHolderInputOutput';
  input?: Maybe<Scalars['String']>;
  output?: Maybe<Scalars['String']>;
};

export type PlaceHolderInputOutputInput = {
  input?: Maybe<Scalars['String']>;
  output?: Maybe<Scalars['String']>;
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
  category: Scalars['String'];
  placeHolderInputOutput: PlaceHolderInputOutput;
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
  category: Scalars['String'];
  placeHolderInputOutput: PlaceHolderInputOutputInput;
};

export type TestCaseInput = {
  _id: Scalars['ID'];
  testCase: Scalars['String'];
};

export type ByIndexRes = {
  __typename?: 'byIndexRes';
  currProblem: Problem;
  prevProblem?: Maybe<Problem>;
  nextProblem?: Maybe<Problem>;
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
  & Pick<Problem, '_id' | 'name' | 'description' | 'difficulty' | 'correctSolution' | 'placeHolder' | 'placeHolderExpectation' | 'index'>
  & { placeHolderInputOutput: (
    { __typename?: 'PlaceHolderInputOutput' }
    & Pick<PlaceHolderInputOutput, 'input' | 'output'>
  ) }
);

export type RegUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'completedProblems'>
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
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegUserFragment
    )> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  input?: Maybe<UpdateUserInput>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & RegUserFragment
  ) }
);

export type GetAllProblemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProblemsQuery = (
  { __typename?: 'Query' }
  & { getAllProblems: Array<Maybe<(
    { __typename?: 'Problem' }
    & Pick<Problem, '_id' | 'name' | 'description' | 'difficulty' | 'index' | 'problemGroup' | 'correctSolution'>
  )>> }
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

export type GetProblemByIndexQueryVariables = Exact<{
  index: Scalars['Int'];
}>;


export type GetProblemByIndexQuery = (
  { __typename?: 'Query' }
  & { getProblemByIndex?: Maybe<(
    { __typename?: 'byIndexRes' }
    & { currProblem: (
      { __typename?: 'Problem' }
      & RegProblemFragment
    ), prevProblem?: Maybe<(
      { __typename?: 'Problem' }
      & RegProblemFragment
    )>, nextProblem?: Maybe<(
      { __typename?: 'Problem' }
      & RegProblemFragment
    )> }
  )> }
);

export type GetProblemsInGroupQueryVariables = Exact<{
  groupName: Scalars['String'];
}>;


export type GetProblemsInGroupQuery = (
  { __typename?: 'Query' }
  & { findProblemsInGroup?: Maybe<Array<Maybe<(
    { __typename?: 'Problem' }
    & RegProblemFragment
  )>>> }
);

export type GetSolutionQueryVariables = Exact<{
  input?: Maybe<GetSolutionInput>;
}>;


export type GetSolutionQuery = (
  { __typename?: 'Query' }
  & { getSolution?: Maybe<(
    { __typename?: 'Solution' }
    & Pick<Solution, 'solution'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
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
  index
  placeHolderInputOutput {
    input
    output
  }
}
    `;
export const RegUserFragmentDoc = gql`
    fragment RegUser on User {
  _id
  username
  completedProblems
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
    user {
      ...RegUser
    }
  }
}
    ${RegUserFragmentDoc}`;

export function useSubmitResultMutation() {
  return Urql.useMutation<SubmitResultMutation, SubmitResultMutationVariables>(SubmitResultDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: updateUserInput) {
  updateUser(input: $input) {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const GetAllProblemsDocument = gql`
    query GetAllProblems {
  getAllProblems {
    _id
    name
    description
    difficulty
    index
    problemGroup
    correctSolution
  }
}
    `;

export function useGetAllProblemsQuery(options: Omit<Urql.UseQueryArgs<GetAllProblemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllProblemsQuery>({ query: GetAllProblemsDocument, ...options });
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
export const GetProblemByIndexDocument = gql`
    query GetProblemByIndex($index: Int!) {
  getProblemByIndex(index: $index) {
    currProblem {
      ...RegProblem
    }
    prevProblem {
      ...RegProblem
    }
    nextProblem {
      ...RegProblem
    }
  }
}
    ${RegProblemFragmentDoc}`;

export function useGetProblemByIndexQuery(options: Omit<Urql.UseQueryArgs<GetProblemByIndexQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProblemByIndexQuery>({ query: GetProblemByIndexDocument, ...options });
};
export const GetProblemsInGroupDocument = gql`
    query GetProblemsInGroup($groupName: String!) {
  findProblemsInGroup(groupName: $groupName) {
    ...RegProblem
  }
}
    ${RegProblemFragmentDoc}`;

export function useGetProblemsInGroupQuery(options: Omit<Urql.UseQueryArgs<GetProblemsInGroupQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProblemsInGroupQuery>({ query: GetProblemsInGroupDocument, ...options });
};
export const GetSolutionDocument = gql`
    query GetSolution($input: getSolutionInput) {
  getSolution(input: $input) {
    solution
  }
}
    `;

export function useGetSolutionQuery(options: Omit<Urql.UseQueryArgs<GetSolutionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSolutionQuery>({ query: GetSolutionDocument, ...options });
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