export interface IHookConfig {
	type: any;
	method: (req: any, res: any) => void;
}

export interface IRouteConfig {
	method: string;
	path: string;
	handler: (req: any, reply: any) => any;
	config?: any;
	auth?: any;
	validate?: any;
}
