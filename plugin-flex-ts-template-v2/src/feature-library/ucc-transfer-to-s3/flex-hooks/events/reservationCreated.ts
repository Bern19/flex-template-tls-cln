import * as Flex from '@twilio/flex-ui';

import { WorkerEvent, FlexJsClient } from '../../../../types/feature-loader';
import logger from '../../../../utils/logger';
import { Reservation } from 'types/task-router';

export const clientName = FlexJsClient.workerClient;
export const eventName = WorkerEvent.reservationCreated;
export const jsClientHook = (flex: typeof Flex, _manager: Flex.Manager, reservation: Reservation) => {
  logger.info(`[ucc-transfer-to-s3] Reservation Created: ${reservation.sid}`);
  console.log('reservation+++++', reservation);
};
