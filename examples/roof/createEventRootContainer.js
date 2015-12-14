if (typeof window !== 'undefined' && window.Roof !== undefined) {
  module.exports = window.Roof;
} else {
  var reactDataBinding = require('react-data-binding');
  var Roof = {};

  Roof.Store = reactDataBinding.Store;
  Roof.createContainer = reactDataBinding.createContainer;
  Roof.createRootContainer = reactDataBinding.createRootContainer;

  function bindActionCreator(actionCreator, options) {
    return function (payload) {
      return actionCreator(payload, options);
    }
  }

  function bindActionCreators(obj, store) {
    var options = {
      getState: store.getState,
      setState: store.setState,
      batch: store.batch,
    };
    return Object.keys(obj).reduce(function (result, key) {
      result[key] = bindActionCreator(obj[key], options);
      return result;
    }, {});
  }

  Roof.createActionContainer = function (selector, actions) {
    return Roof.createContainer(selector, {
      mapStoreProps: function (store) {
        return Object.keys(actions).reduce(function (result, key) {
          result[key] = bindActionCreators(actions[key], store);
          return result;
        }, {});
      }
    });
  };

  if (typeof window !== 'undefined') {
    window.Roof = Roof;
  }
  module.exports = Roof;
}
