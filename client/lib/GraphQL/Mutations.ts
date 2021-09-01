import { ItemMutations } from './typeActions/ItemActions';
import { PannelMutations } from './typeActions/PannelActions';
import { ProjectMutations } from './typeActions/ProjectActions';
import { UserMutations } from './typeActions/UserActions';

const MUTATIONS = {
  ...UserMutations,
  ...ProjectMutations,
  ...PannelMutations,
  ...ItemMutations,
};

export const {
  SIGN_UP,
  LOG_IN,
  ADD_PROJECT,
  DELETE_PANNEL,
  RENAME_PANNEL,
  ADD_PANNEL,
  ADD_ITEM,
} = MUTATIONS;
