import { ProviderComponent, ProviderReturnType } from './types';

/** функция compose для создания HOC компонента
 *  последовательно оборачивает компонент в провайдеры */

const compose = (
  ...funcs: ((Component: ProviderComponent) => ProviderReturnType)[]
) => {
  return (Component: ProviderComponent): ProviderReturnType => {
    return funcs.reduceRight((wrapped, f) => f(wrapped), Component);
  };
};

export default compose;
