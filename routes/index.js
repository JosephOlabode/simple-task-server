/*
/!*function ConvertToBinary(valueInBase10) {
    let currentVal = valueInBase10;
    let myArray = [];
    do{
        const remainder = currentVal % 2;
        myArray.push(remainder);
        currentVal = Math.floor(currentVal / 2);
    }while(currentVal > 0);

    console.log(valueInBase10 + ' to base 2 =');
    console.log(myArray.reverse());

}

ConvertToBinary(10);*!/


/!*function convertBinaryToDecimal(value) {
    let sum = 0;
    const currentValue = value.toString();
    for(let i = 0, j = currentValue.length-1; i < currentValue.length; i++, j--){
        const digit = parseInt(currentValue.charAt(i));
        const result = digit * Math.pow(2, j);
        sum = sum + result;
    }
    console.log(sum);
}

convertBinaryToDecimal(1010);*!/
/!*let newArr = [];
function countElementSet(arr){
    for(let i = 0; i < arr.length; i++){
        let count = 0;
        for(let j = 0; j< arr.length; j++){
            if(arr[i] === arr[j]){
                count++;
            }
        }
        newArr.push([arr[i], count]);
    }
    console.log(newArr);
}*!/
const lodash = require('lodash');
/!*const arr = [1,2,3,2,5,2,6,2,2];*!/
const arr = [{name: 'james', message: ''}, {name: 'joseph', message: '' }, {name: 'sam', message: ''}, {name: 'james', message: ''} , {name: 'joseph', message: ''}];
/!*const result = lodash.countBy(arr, 'name');

const final = Object.keys(result).map(key => ({key, value: result[key]}));
console.log(result);
console.log(final);*!/

lodash.remove(arr, (unreadMessage) => {
    return unreadMessage.name === 'joseph';
});
console.log(arr);

const http = require('http');
const url = require('url');
/!*http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html>');
    res.write('<head><title>Node.js</title></head>');
    res.write('<body>Hello Web</body>');
    res.write('</html>');
    res.end();
}).listen(9999);*!/
const route = {
    routes: {},
    for: function(method, path, handler) {
        this.routes[method + path] = handler;
    }
};

route.for('GET', '/start', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello');
    res.end();
});

route.for('GET', '/finish', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('GoodBye');
    res.end();
});

route.for('POST', '/echo', (req, res) => {
    let incoming = '';
    req.on('data', (chunk) => {
        incoming += chunk.toString();
    });

    req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(incoming);
        res.end();
    })
});

route.for('GET', '/echo', (req, res) => {
    let body =
        '<html lang="en">'+
        '<head><title>Node.js Echo</title></head>' +
        '<body>' +
        '<form method="POST">' +
        '<input type="text" name="msg"/>' +
        '<input type="submit" value="echo"/>'+
        '</form>'+
        '</body>'+
        '</html>';

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(body);
    res.end();
});



function onRequest(req, res){
    const pathname = url.parse(req.url).pathname;
    console.log('Request for ' + pathname + ' received');
    if(typeof route.routes[req.method + pathname] === 'function'){
        route.routes[req.method + pathname](req, res);
    } else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 not Found');
    }
}

http.createServer(onRequest).listen(9999, () => {
    console.log('Server has started');
});


*/
