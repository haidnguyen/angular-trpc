import { HTTPHeaders } from '@trpc/client';
import {
  AnyMutationProcedure,
  AnyProcedure,
  AnyQueryProcedure,
  AnyRouter,
  ProcedureArgs,
  ProcedureRouterRecord,
} from '@trpc/server';
import { inferTransformedProcedureOutput } from '@trpc/server/shared';
import { Observable } from 'rxjs';

export type ObservableProcedure<TProcedure extends AnyProcedure> = (
  ...args: ProcedureArgs<TProcedure['_def']>
) => Observable<inferTransformedProcedureOutput<TProcedure>>;

export type QueryOrMutateObservableProcedure<TProcedure extends AnyProcedure> = TProcedure extends AnyQueryProcedure
  ? { query: ObservableProcedure<TProcedure> }
  : TProcedure extends AnyMutationProcedure
  ? { mutate: ObservableProcedure<TProcedure> }
  : never;

export type ObservableProcedureRecord<TProcedure extends ProcedureRouterRecord> = {
  [TKey in keyof TProcedure]: TProcedure[TKey] extends AnyRouter
  ? ObservableProcedureRecord<TProcedure[TKey]['_def']['record']>
  : TProcedure[TKey] extends AnyProcedure
  ? QueryOrMutateObservableProcedure<TProcedure[TKey]>
  : never;
};

export interface TRPCBaseConfig {
  url: string;
}

interface CredentialConfig {
  type: 'CredentialConfig';
  credentials: RequestCredentials;
}

interface HeaderConfig {
  type: 'HeaderConfig';
  headers: () => HTTPHeaders;
}

export type TRPCConfiguration = CredentialConfig | HeaderConfig;

type ConfigurationFn<TConfig extends TRPCConfiguration> = (config: Omit<TConfig, 'type'>) => TConfig;

export function isCredentialConfig(config: TRPCConfiguration): config is CredentialConfig {
  return config.type === 'CredentialConfig';
}

export function isHeaderConfig(config: TRPCConfiguration): config is HeaderConfig {
  return config.type === 'HeaderConfig';
}

export const withCredentials: ConfigurationFn<CredentialConfig> = config => ({
  type: 'CredentialConfig',
  credentials: config.credentials,
});

export const withHeaders: ConfigurationFn<HeaderConfig> = config => ({
  type: 'HeaderConfig',
  headers: config.headers,
});
