function getThis(){
    return this;
  }
  console.log(getThis());


  for (var i=0; i<3; i++){
    setTimeout(() => {
        console.log(i)
    }, 1000);
  }

  function foo() {console.log(this);}
  foo.call(null);


  var a=1, b =function a(x) {
    x&&a(--x);
  };
  console.log(a)

  function foo(){
    return {bar:1};

  }
  console.log(typeof foo().bar)

  (
    function(a){
        arguments[0] = 10;
        return a;
    }

  )(5);

  "use strict";
  function getThis(){
    return this;
  }
  console.log(getThis());

  printMessage();
  function printMessage(){
    console.log('Hello');
  }

  const foo = bar();
  const number=2
  function bar(){return number;}

  function foo(a,b){
    return a*b;
  }
  const bar = foo.bind(null,2);
  bar(2);

  console.log (message);
  var message='Hello';

  var name='John';
  function printName(){
    console.log(name)
    var name='Peter';
    console.log(name);
  }

  printName();

  "use strict";
  const details={
    message: 'Hello',

  }
  function getMessage(){
    return this.message;
  }

  console.log(getMessage.call(details));

  var name ='John';
  var user={
    name: "Peter",
    printMessage(){
        console.log(`Hello,${this.name}!`);
    }
  };

  var printMessage=user.printMessage;
  printMessage();