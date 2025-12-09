const http = require("http");

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.write("Welcome to the Home Page");
        return res.end();
    }

    if (req.method === "GET" && req.url === "/info") {
        res.write("This is the information page");
        return res.end();
    }

    if (req.method === "POST" && req.url === "/submit") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const jsonData = JSON.parse(body);
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(jsonData));
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid JSON");
            }
        });
    }
});

server.listen(3000, () => {
    console.log("Server running at port 3000");
});
