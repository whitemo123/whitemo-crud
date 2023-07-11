import * as components from './lib/components';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MSearch: typeof components.Search;
  }
}
export {};
