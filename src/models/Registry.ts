class Registry {
	public hostname:string;
	public port:number;	
	public user:string;
	public password:string;
	
	constructor(host:string, port:number, user:string, password:string){
		this.hostname = host;
		this.port = port;
		this.user = user;
		this.password = password;
	}
}

export = Registry;