const colors = [
    { variant: "Vermillion", hex: "#2E191B" },
    { variant: "Forest", hex: "#0B6623" },
    { variant: "Navy", hex: "#000080" },
    { variant: "Crimson", hex: "#DC143C" },
    { variant: "Sky Blue", hex: "#87CEEB" },
    { variant: "Lime", hex: "#00FF00" },
    { variant: "Gold", hex: "#FFD700" },
    { variant: "Lavender", hex: "#E6E6FA" },
    { variant: "Tangerine", hex: "#F28500" },
    { variant: "Magenta", hex: "#FF00FF" },
    { variant: "Cyan", hex: "#00FFFF" },
    { variant: "Olive", hex: "#808000" },
    { variant: "Teal", hex: "#008080" },
    { variant: "Maroon", hex: "#800000" },
    { variant: "Coral", hex: "#FF7F50" }
];
//import http
const http = require('http');
const fs = require('fs');
const queryString = require('querystring');

//Creamos servidor y lo asigno a una variable
const server = http.createServer((req, res) => {

    //Nos quedamos con la propiedad url del objeto req
    //Para obtener la URL del objeto request usaremos el operador de desestructuración de objetos
    const {url} = req;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (url.startsWith("/color?")) {
        //1. Separamos el path de la queryString
        const [path, queryString] = req.url.split('?');
        const qs = queryString.toUpperCase(queryString);
        console.log(qs);

        //1. Utilizar el método de array adecuado para buscar la variante del color en el array 'colors'
        const color = colors.find(color => color.variant == qs.variant);
        console.log(color);
        
        // 2. Si encuentra el color, devolverlo tal y cómo lo hacemos aquí res.end(`<p style ="color: ${hex}">${hex}</p>`)
        if (color) {
            res.end(`<p style="color: ${color.hex}">${color.hex}</p>`);
        }
        else { 
            // el color elegido no existe. Elegimos uno al azar e informarmos al usuario
        const indexRandomColor = Math.floor(Math.random()*colors.length);
        const randomColor = colors[indexRandomColor];
        res.write(`El color ${qs.variant} elegido no existe. Hemos obtenido un color al azaroso`);
        res.end(`<p style= "color: ${randomColor.hex}">${randomColor.hex}</p>`);
        }
        
        //3. Si no encuentra el color, mandarle uno al azar. Mandarle tamibén un mensaje diciendo que la variante de color elegida NO existe. Opcionalmente podéis enviarle el array de colores que puede usar.


    }

    // if (url == "/color") {
    //     //Iteración 3. Comprobar si me han pasado una queryString o no. En caso de que Sí: obtener el color en función del ?varian=vermillion.

    //     //Obtener un color aleatorio
    //     const indexRandomColor = Math.floor(Math.random()*colors.length);
    //     const randomColor = colors[indexRandomColor];

    //     //me quedo con la propiedad .hex del color
    //     const {hex} = randomColor;
    //     res.statusCode = 200 //esto es algo redundante porque 200 es el valor por defecto pero es para entender que es el código de que todo va ok
    //     res.end(`<p style= "color: ${hex}">${hex}</p>`)

    // } 
    else if (url == "/") { //tanto en el if como el else if, indicamos que va a hacer el servidor cuando la ruta sea una u otra.

        //Especificar que vamos a enviar un html
        //Tenemos que especificar que la codificación es utf-8

        res.write('<h1>Bienvenido al servidor de colores</h1>');
        res.write('<p>Haz una petición a /color para obtener un colot aleatorio</p>');
        res.end();

    } else {
        //el recurso/endpoint/ruta que intentas acceder no existe
        res.statusCode = 404;
        //le enviamos el fichero 404.html
        //Voy a leer el fichero con un método síncrono
        const htmlContent = fs.readFileSync("./404.html");
        res.end(htmlContent);
    }
});

//levantamos el servidor en el puerto 3000
server.listen(3000, 'localhost', () => {
    console.log('Server running in port 3000');
});