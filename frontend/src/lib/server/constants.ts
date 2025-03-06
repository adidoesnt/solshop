import { env } from "$env/dynamic/private";

export const {
	SOLACE_USERNAME = 'solshop',
	SOLACE_PASSWORD = 'solshop',
	SOLACE_HOST = 'tcp://localhost:55554',
	SOLACE_VPN_NAME = 'default',
} = env;