import solace from "solclientjs";
import {
  SOLACE_HOST,
  SOLACE_USERNAME,
  SOLACE_PASSWORD,
  SOLACE_VPN_NAME,
} from "../constants";

export let session: solace.Session | null = null;

export const connectToSolace = (): Promise<solace.Session> => {
  return new Promise((resolve, reject) => {
    if (session) resolve(session);

    const sessionProps: solace.SessionProperties = {
      url: SOLACE_HOST,
      userName: SOLACE_USERNAME,
      password: SOLACE_PASSWORD,
      vpnName: SOLACE_VPN_NAME,
    };

    console.log("Connecting to Solace...", sessionProps);

    session = solace.SolclientFactory.init().createSession(sessionProps);

    session.on(solace.SessionEventCode.UP_NOTICE, () => {
      console.log("Connected to Solace");
      resolve(session!);
    });

    session.on(solace.SessionEventCode.CONNECT_FAILED_ERROR, (err) => {
      console.error("Failed to connect to Solace", err);
      reject(err);
    });

    session.connect();
  });
};
