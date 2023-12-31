import { ARWEAVE_GATEWAYS } from '../utils';
import { GraphQLError as ActualGraphQLError } from 'graphql';

export type QueryGQLOptions = {
  gateway: string;
  filters: Record<string, unknown>;
};

export type QueryTransactionsGQLOptions = QueryGQLOptions & { cursor?: string };

export type QueryGQLResult = {
  status: number;
  data: GraphQLData | null;
  errors: GraphQLError[] | readonly ActualGraphQLError[] | null;
};

export type QueryTransactionsGQLResult = {
  status: number;
  data: GQLEdge[];
  errors: GraphQLError[] | readonly ActualGraphQLError[] | null;
  cursor: string;
  hasNextPage: boolean;
};

export interface GQLNode {
  id: string;
  anchor: string;
  signature: string;
  recipient: string;
  owner: {
    address: string;
    key: string;
  };
  fee: {
    winston: string;
    ar: string;
  };
  quantity: {
    winston: string;
    ar: string;
  };
  data: {
    size: number;
    type: string;
  };
  tags: Array<{
    name: string;
    value: string;
  }>;
  block: {
    id: string;
    timestamp: number;
    height: number;
    previous: string;
  };
  parent: {
    id: string;
  };
}

export interface GQLEdge {
  cursor: string;
  node: GQLNode;
}

export interface GQLTransactionsResult {
  pageInfo: {
    hasNextPage: boolean;
  };
  edges: GQLEdge[];
}

export interface GQLResult {
  data: GraphQLData;
  errors?: Array<GraphQLError>;
}

export type GraphQLData = {
  transaction: GQLNode;
  transactions: GQLTransactionsResult;
};

export type GraphQLError = {
  message: string;
  extensions: {
    code: string;
  };
};

export type Gateway = (typeof ARWEAVE_GATEWAYS)[number];
