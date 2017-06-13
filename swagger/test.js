var _ = require('underscore')._

var users = {
    aa: {name: ['mmm', 'xxxx'], age: 40},
    cc: {bb: {name: ['larry', 'ss'], age: 50}},
    sc: {bb: {nmes: ['larry', 'ss'], age: 50}},
    xx: {}
};
// console.log(users[1]);
console.log(
    _.chain(users)
    .filter(function(item){ return (_.has(item, 'bb') || _.has(item, 'name'));})

    //.filter(function(item._wrapped){ return (_.has(item, 'bb') || _.has(item, 'name'));})
  );

    // console.log(
    //     _.chain(users)
    //     .contains(_.values(users), 'name')
    // );
