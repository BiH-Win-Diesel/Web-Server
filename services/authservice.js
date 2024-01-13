export function authenticate(username, password){
    if(username === 'john.doe@mailinator.com'){
        return {
            user: {
              id: 1,
              username: "john.doe@mailinator.com",
              email: "john.doe@mailinator.com",
              fullname: "John Doe",
              role: "SUPER",
              createdAt: "2021-05-30T06:45:19.000Z",
              name: "John Doe",
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          };
    }
}