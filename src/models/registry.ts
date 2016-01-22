class Registry {
	public name:string;
	public host:string;
	public port:number;	
	public user:string;
	public password:string;
	
	constructor(name:string, host:string, port:number, user?:string, password?:string){
		this.name = name;
		this.host = host;
		this.port = port;
		this.user = user;
		this.password = password;
	}
}

export = Registry;