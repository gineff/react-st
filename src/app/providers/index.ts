import compose from './compose';
import { withRouter } from './withRouter.provider';

export const withProviders = compose(withRouter);
