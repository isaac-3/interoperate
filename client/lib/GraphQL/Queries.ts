import { ItemQueries } from './typeActions/ItemActions';
import { PannelQueries } from './typeActions/PannelActions';
import { ProjectQueries } from './typeActions/ProjectActions';
import { UserQueries } from './typeActions/UserActions';

const QUERIES = {
  ...UserQueries,
  ...ProjectQueries,
  ...PannelQueries,
  ...ItemQueries,
};

export const {
  GET_USER,
  GET_USERS,
  GET_PROJECT,
  GET_PROJECTS,
  GET_PROJECT_PANNELS,
  GET_PANNEL_ITEMS,
  GET_ITEM,
} = QUERIES;
