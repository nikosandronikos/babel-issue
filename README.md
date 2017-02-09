# Babel bug?

I use the following pattern for mixins:
```
const Mixin = superclass => class extends superclass {
   // Mixin code goes here.
}

// Mix it in to something
class A extends MixinName(Object) {
	// Definition of A goes here.
}
```

This results in the `A` object having no methods on it's prototype when run through `babel-preset-es2015`.

## Testing
With this repository:

```
npm install
npm run build
node js/main.js
```

This demonstrates the correct output.

Now run the version built by Babel:
```
node build/main.js
```

I see:
```
TypeError: a.getName is not a function
```

## The issue?
The ES5 version of `MixinName` that is built by Babel looks like:
```
var MixinName = function MixinName(superclass) {
        return function (_superclass) {
        		// The following line seems to be the problem
                _inherits(_class, _superclass);

                function _class() {
                        _classCallCheck(this, _class);

                        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

                        _this.name = 'Zorg';
                        return _this;
                }

                _createClass(_class, [{
                        key: 'getName',
                        value: function getName() {
                                return this.name;
                        }
                }]);

                return _class;
        }(superclass);
};

```

I _think_ the `_inherits()` call should be:
```
_inherits(MixinName, _superclass);
```
rather than
```
_inherits(_class, _superclass);
```
Making this change gives the correct output.