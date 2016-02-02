#### Registry Add Help  
Adds a registry to your registry config.  
<b>Note: You must add a registry to your config before trying to retrieve data from it</b>  
```
  Usage: registry add [options] <name> <hostname> <port> <user> <password>

  Adds registry creds to config

  Options:
    -h, --help                 output usage information
    -u, --user <user>          Registry user
    -p, --password <password>  Registry Password
```  

#### Registry Remove Help  
Removes the specified registry from your local config.  
```
  Usage: registry rm [options] <name>

  Removes registry from config

  Options:
    -h, --help  output usage information
```  

#### Registry List Help  
This method can be used to list all of the registries you have configured.  
```
  Usage: registry ls [options]

  List registries

  Options:
    -h, --help  output usage information
```  