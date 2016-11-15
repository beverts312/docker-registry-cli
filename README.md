**This is no longer maintained**


## CLI Reference  
#### Registry Help  
```
 Usage: registry [options] [command]


  Commands:

    catalog [options]                                         Lists all images in the registry
    tags [options] <image>                                    Lists all tags for an image
    manifest [options] <name> <tag>                           Gets image manifest
    compare [options] <image> <tag>                           Compares image in multiple repositories
    ls                                                        List registries
    add [options] <name> <hostname> <port> <user> <password>  Adds registry creds to config
    rm <name>                                                 Removes registry from config

  Options:

    -h, --help  output usage information
```  