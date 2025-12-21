import * as Flex from '@twilio/flex-ui';
import axios from 'axios';

import { getUrl, isFeatureEnabled } from '../../config';
import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import logger from '../../../../utils/logger';

export const actionEvent = FlexActionEvent.replace;
export const actionName = FlexAction.HoldCall;
export const actionHook = function callTwilioFunctionOnHoldCall(flex: typeof Flex, _manager: Flex.Manager) {
    flex.Actions.replaceAction(actionName, async (payload, original) => {
        try {
            return new Promise<void>((resolve, reject) => {
                resolve();
            }).then(() => {
                console.log("HOLDCALL", payload)
                if (!isFeatureEnabled()) {
                    console.log("DISABLED")
                    original(payload);
                    return;
                }

                // Only process voice calls
                if (!Flex.TaskHelper.isCallTask(payload.task)) {
                    console.log("NOT A CALL")
                    original(payload);
                    return;
                }

                const url = getUrl();
                if (!url) {
                    logger.warn('[ucc-custom-hold-music] URL is not configured');
                    original(payload);
                    return;
                }


                logger.info(`[ucc-custom-hold-music] Calling Twilio Function URL when call is held: ${url}`);

                original({
                    ...payload,
                    holdMusicUrl: url,
                    holdMusicMethod: "POST",
                });


            });
        } catch (error: any) {
            if (error.response) {
                logger.error(`[ucc-custom-hold-music] Failed to call Twilio Function: ${error.response.status} ${error.response.statusText}`);
            } else {
                logger.error('[ucc-custom-hold-music] Error calling Twilio Function', { error: error.message });
            }
        }

    });


};

