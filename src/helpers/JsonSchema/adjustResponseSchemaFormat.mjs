
export const adjustResponseSchemaFormat = obj => {
  // Schema is valid, but OpenAI doesn't allow certain response formats
  if(typeof obj !== 'object') return;
  if(obj === null) return;
  if(Array.isArray(obj)) {
    obj.forEach(adjustResponseSchemaFormat);
    return;
  }
  let keys = Object.keys(obj);

  if('type' in obj) {
    switch(obj.type) {
      case 'object':
        let propKeys = [];
        if('properties' in obj) {
          propKeys = Object.keys(obj.properties).sort();
        }
        if(!('additionalProperties' in obj)) {
          // console.log('adding additionalProperties = false');
          obj.additionalProperties = false;
        } else if(obj.additionalProperties !== false) {
          // console.log('changing additionalProperties to false');
          obj.additionalProperties = false;
        }
        if('required' in obj) {
          if(propKeys.join(',') !== obj.required.sort().join(',')) {
            // console.log('updating required keys with', propKeys.filter(key => !obj.required.includes(key)));
            obj.required = propKeys;
          }
        } else {
          // console.log('adding required keys', propKeys);
          obj.required = propKeys;
        }
        break;
      case 'array':
        if('uniqueItems' in obj) delete obj.uniqueItems;
        break;
    }
  }
  if('oneOf' in obj) {
    keys = keys.filter(key => key !== 'oneOf');
    // console.log(Array.isArray(obj.oneOf), obj);
    if(Array.isArray(obj.oneOf)) {
      const nonNull = obj.oneOf.find(
        o => 
          typeof o === 'object' 
        && 'type' in o 
        && o.type !== 'null'
      );
      // console.log('nonNull', nonNull);
      if(typeof nonNull === 'object' && nonNull !== null)
        Object.assign(obj, nonNull);
    }
    delete obj.oneOf;
    adjustResponseSchemaFormat(obj);
  } else {
    keys.forEach(key => adjustResponseSchemaFormat(obj[key]));
  }
}