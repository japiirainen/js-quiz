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
  progress?: Maybe<UserProgress>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum Level {
  Beginner = 'BEGINNER',
  Medium = 'MEDIUM',
  Master = 'MASTER'
}

export type UserProgress = {
  __typename?: 'UserProgress';
  level: Level;
  points: Scalars['Int'];
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

export type UpdateUserProgressInput = {
  _id: Scalars['ID'];
  points: Scalars['Int'];
  problemId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getSolution?: Maybe<Solution>;
  getProblemById: Problem;
  getProblemByIndex?: Maybe<ByIndexRes>;
  getAllProblems: Array<Maybe<Problem>>;
  getPopularProblems: Array<Maybe<PopProblem>>;
  getMostFailedProblems: Array<Maybe<FailProblem>>;
  getRandomProblem: PopProblem;
  problemGroup: ProblemGroup;
  findProblemsInGroup?: Maybe<Array<Maybe<Problem>>>;
  getManyGroupsOfProblems: ManyGroupRes;
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


export type QueryGetManyGroupsOfProblemsArgs = {
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  changePassword: User;
  logout?: Maybe<Scalars['Boolean']>;
  updateUser: User;
  updateUserProgress: User;
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


export type MutationUpdateUserProgressArgs = {
  input?: Maybe<UpdateUserProgressInput>;
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
  solution?: Maybe<Solution>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<Maybe<Error>>>;
  user?: Maybe<User>;
};

export type Solution = {
  __typename?: 'Solution';
  _id: Scalars['ID'];
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
  typeSignature?: Maybe<Scalars['String']>;
  input?: Maybe<Scalars['String']>;
  output?: Maybe<Scalars['String']>;
};

export type PopProblem = {
  __typename?: 'PopProblem';
  _id: Scalars['ID'];
  name: Scalars['String'];
  uri: Scalars['String'];
  index: Scalars['Int'];
  problemGroup: Scalars['String'];
  attempts: Scalars['String'];
};

export type FailProblem = {
  __typename?: 'FailProblem';
  _id: Scalars['ID'];
  name: Scalars['String'];
  uri: Scalars['String'];
  index: Scalars['Int'];
  problemGroup: Scalars['String'];
  attempts: Scalars['String'];
  successPrc: Scalars['String'];
};

export type PlaceHolderInputOutputInput = {
  typeSignature?: Maybe<Scalars['String']>;
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
  isCompleted?: Maybe<Scalars['Boolean']>;
  attempts?: Maybe<Scalars['Int']>;
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

export type ManyGroupRes = {
  __typename?: 'manyGroupRes';
  g1?: Maybe<Array<Maybe<Problem>>>;
  g2?: Maybe<Array<Maybe<Problem>>>;
  g3?: Maybe<Array<Maybe<Problem>>>;
  g4?: Maybe<Array<Maybe<Problem>>>;
  g5?: Maybe<Array<Maybe<Problem>>>;
};

export type FailProblemFragment = (
  { __typename?: 'FailProblem' }
  & Pick<FailProblem, 'name' | '_id' | 'attempts' | 'problemGroup' | 'successPrc' | 'index'>
);

export type PopularProblemFragment = (
  { __typename?: 'PopProblem' }
  & Pick<PopProblem, 'name' | '_id' | 'attempts' | 'problemGroup' | 'index'>
);

export type RegProblemFragment = (
  { __typename?: 'Problem' }
  & Pick<Problem, '_id' | 'name' | 'description' | 'difficulty' | 'correctSolution' | 'placeHolder' | 'placeHolderExpectation' | 'index' | 'isCompleted'>
  & { placeHolderInputOutput: (
    { __typename?: 'PlaceHolderInputOutput' }
    & Pick<PlaceHolderInputOutput, 'typeSignature' | 'input' | 'output'>
  ) }
);

export type RegUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'completedProblems'>
  & { progress?: Maybe<(
    { __typename?: 'UserProgress' }
    & Pick<UserProgress, 'level' | 'points'>
  )> }
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
    & Pick<Result, 'success'>
    & { solution?: Maybe<(
      { __typename?: 'Solution' }
      & Pick<Solution, '_id' | 'solution'>
    )>, errors?: Maybe<Array<Maybe<(
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

export type UpdateUserProgressMutationVariables = Exact<{
  input?: Maybe<UpdateUserProgressInput>;
}>;


export type UpdateUserProgressMutation = (
  { __typename?: 'Mutation' }
  & { updateUserProgress: (
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

export type GetManyGroupsOfProblemsQueryVariables = Exact<{
  names?: Maybe<Array<Maybe<Scalars['String']>>>;
}>;


export type GetManyGroupsOfProblemsQuery = (
  { __typename?: 'Query' }
  & { getManyGroupsOfProblems: (
    { __typename?: 'manyGroupRes' }
    & { g1?: Maybe<Array<Maybe<(
      { __typename?: 'Problem' }
      & RegProblemFragment
    )>>>, g2?: Maybe<Array<Maybe<(
      { __typename?: 'Problem' }
      & RegProblemFragment
    )>>>, g3?: Maybe<Array<Maybe<(
      { __typename?: 'Problem' }
      & RegProblemFragment
    )>>>, g4?: Maybe<Array<Maybe<(
      { __typename?: 'Problem' }
      & RegProblemFragment
    )>>>, g5?: Maybe<Array<Maybe<(
      { __typename?: 'Problem' }
      & RegProblemFragment
    )>>> }
  ) }
);

export type GetMostFailedProblemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMostFailedProblemsQuery = (
  { __typename?: 'Query' }
  & { getMostFailedProblems: Array<Maybe<(
    { __typename?: 'FailProblem' }
    & FailProblemFragment
  )>> }
);

export type GetPopularProblemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPopularProblemsQuery = (
  { __typename?: 'Query' }
  & { getPopularProblems: Array<Maybe<(
    { __typename?: 'PopProblem' }
    & PopularProblemFragment
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

export type GetRandomProblemQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRandomProblemQuery = (
  { __typename?: 'Query' }
  & { getRandomProblem: (
    { __typename?: 'PopProblem' }
    & PopularProblemFragment
  ) }
);

export type GetSolutionQueryVariables = Exact<{
  input?: Maybe<GetSolutionInput>;
}>;


export type GetSolutionQuery = (
  { __typename?: 'Query' }
  & { getSolution?: Maybe<(
    { __typename?: 'Solution' }
    & Pick<Solution, '_id' | 'solution'>
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

export const FailProblemFragmentDoc = gql`
    fragment FailProblem on FailProblem {
  name
  _id
  attempts
  problemGroup
  successPrc
  index
}
    `;
export const PopularProblemFragmentDoc = gql`
    fragment PopularProblem on PopProblem {
  name
  _id
  attempts
  problemGroup
  index
}
    `;
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
    typeSignature
    input
    output
  }
  isCompleted
}
    `;
export const RegUserFragmentDoc = gql`
    fragment RegUser on User {
  _id
  username
  completedProblems
  progress {
    level
    points
  }
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
    solution {
      _id
      solution
    }
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
export const UpdateUserProgressDocument = gql`
    mutation UpdateUserProgress($input: updateUserProgressInput) {
  updateUserProgress(input: $input) {
    ...RegUser
  }
}
    ${RegUserFragmentDoc}`;

export function useUpdateUserProgressMutation() {
  return Urql.useMutation<UpdateUserProgressMutation, UpdateUserProgressMutationVariables>(UpdateUserProgressDocument);
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
export const GetManyGroupsOfProblemsDocument = gql`
    query GetManyGroupsOfProblems($names: [String]) {
  getManyGroupsOfProblems(names: $names) {
    g1 {
      ...RegProblem
    }
    g2 {
      ...RegProblem
    }
    g3 {
      ...RegProblem
    }
    g4 {
      ...RegProblem
    }
    g5 {
      ...RegProblem
    }
  }
}
    ${RegProblemFragmentDoc}`;

export function useGetManyGroupsOfProblemsQuery(options: Omit<Urql.UseQueryArgs<GetManyGroupsOfProblemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetManyGroupsOfProblemsQuery>({ query: GetManyGroupsOfProblemsDocument, ...options });
};
export const GetMostFailedProblemsDocument = gql`
    query GetMostFailedProblems {
  getMostFailedProblems {
    ...FailProblem
  }
}
    ${FailProblemFragmentDoc}`;

export function useGetMostFailedProblemsQuery(options: Omit<Urql.UseQueryArgs<GetMostFailedProblemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMostFailedProblemsQuery>({ query: GetMostFailedProblemsDocument, ...options });
};
export const GetPopularProblemsDocument = gql`
    query GetPopularProblems {
  getPopularProblems {
    ...PopularProblem
  }
}
    ${PopularProblemFragmentDoc}`;

export function useGetPopularProblemsQuery(options: Omit<Urql.UseQueryArgs<GetPopularProblemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPopularProblemsQuery>({ query: GetPopularProblemsDocument, ...options });
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
export const GetRandomProblemDocument = gql`
    query GetRandomProblem {
  getRandomProblem {
    ...PopularProblem
  }
}
    ${PopularProblemFragmentDoc}`;

export function useGetRandomProblemQuery(options: Omit<Urql.UseQueryArgs<GetRandomProblemQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRandomProblemQuery>({ query: GetRandomProblemDocument, ...options });
};
export const GetSolutionDocument = gql`
    query GetSolution($input: getSolutionInput) {
  getSolution(input: $input) {
    _id
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