class Registry {
	public host:string;
	public port:number;	
	public user:string;
	public password:string;
	
	constructor(host:string, port:number, user:string, password:string){
		this.host = host;
		this.port = port;
		this.user = user;
		this.password = password;
	}
}

export = Registry;