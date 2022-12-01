import { IStackRoutesList } from '~/routes/app.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IStackRoutesList {}
  }
}
