const http = require("http")

const server = http.createServer()

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
  {
    id: 3,
    name: "new user 1",
  },
  {
    id: 4,
    name: "new user 2",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 2, //결과가 1로 나와 기존 샘플 변경. 원래 1이였음
  },
  {
    id: 3,
    imageUrl: "내용 1",
    userId : 3,
    content: "sampleContent3"
  },
  {
    id: 4,
    imageUrl: "내용 2",
    userId : 4,
    content: "sampleContent4"
  },
];

const httpRequestListener = function(request, response) {
  const {url, method} = request

  if (method === "POST") {
  if(url === "/users/signup") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        // console.log("========body:", body)
        const user = JSON.parse(body);
        
        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        
      
        });

        response.writeHead(200, {'Content-Type' : 'application/json'})
        response.end(JSON.stringify({"message": "userCreated"})); //request.on("end") 안에 response가 들어가야 작동된다!        

      });

    } else if(url === "/users/posts") { //method === POST 는 같기 때문에 url만 확인한다!
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
      // console.log("========body:", body)
      const post = JSON.parse(body);

        posts.push({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,

        });

        response.writeHead(200, {'Content-Type' : 'application/json'})
        response.end(JSON.stringify({message: "postsCreated"}));

      })
    }
  } else if (method === 'GET') {
    if(url === "/users/postlists"){

    let body = "";

    request.on("data", (data)=>{
      body += data;
    });

    request.on("end", ()=> {
      const arr = [];
      // arr.push(list)

      for(let i = 0; i < users.length; i++) {
        for(let j = 0; j < posts.length; j++) {
          if(users[i]["id"] === posts[j]["userId"]){
            // const object = {
            //   userId: users[i].id
            //   ...
            //   ...
            // }
            // arr.push(object)
            const object = {
              userId : users[i].id,
              usersName : users[i].name,
              postingId : posts[j].id,
              postingTitle : posts[j].title,
              postingContent : posts[j].content,
              postingImageUrl : posts[j].imageUrl,
              postingContent : posts[j].content,
            }
            arr.push(object);

            }
            
          }
        }
        // console.log(arr)
        response.writeHead(200, {'Content-Type' : 'application/json'})
        response.end(JSON.stringify({data : arr}))
      }
  )
}
}}

server.on("request", httpRequestListener)

const IP = '127.0.0.1'
const PORT = 8000

server.listen(PORT, IP, function() {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`)
})