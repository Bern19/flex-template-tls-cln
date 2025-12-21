import { getFeatureFlags } from '../../utils/configuration';
import UccCustomHoldMusicConfig from './types/ServiceConfiguration';

const {
  enabled = false,
  url,
} = (getFeatureFlags()?.features?.ucc_custom_hold_music as UccCustomHoldMusicConfig) || {};


export const isFeatureEnabled = () => {
  return enabled;
};

export const getUrl = () => {
  return url;
};
