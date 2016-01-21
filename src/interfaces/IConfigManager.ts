'use strict';
import Registry = require('../models/Registry');

interface IConfigManager {
    getRegistries():Registry[];
    addRegistry(registry:Registry, callback:(err:Error)=>void);
    removeRegistry(name:string, callback:(err:Error)=>void);
    setDefaultRegistry(name:string, callback:(err:Error)=>void);
    getDefaultRegistry(callback:(err:Error, registry:string)=>void);
}

export = IConfigManager;