import { Session, SessionProperties, SessionEventCode } from "solclientjs";
import { SolclientFactory } from "solclientjs";
import {
  SOLACE_HOST,
  SOLACE_USERNAME,
  SOLACE_PASSWORD,
  SOLACE_VPN_NAME,
} from "../../constants";
import Logger from "../../utils/logger";

const logger = new Logger("solace");
export let session: Session | null = null;

export const connectToSolace = (): Promise<Session> => {
  return new Promise((resolve, reject) => {
    if (session) resolve(session);

    const sessionProps: SessionProperties = {
      url: SOLACE_HOST,
      userName: SOLACE_USERNAME,
      password: SOLACE_PASSWORD,
      vpnName: SOLACE_VPN_NAME,
    };

    logger.info("Connecting to Solace...", sessionProps);

    session = SolclientFactory.init().createSession(sessionProps);

    session.on(SessionEventCode.UP_NOTICE, () => {
      logger.info("Connected to Solace");
      resolve(session!);
    });

    session.on(SessionEventCode.CONNECT_FAILED_ERROR, (err) => {
      logger.error("Failed to connect to Solace", err);
      reject(err);
    });

    session.connect();
  });
};
