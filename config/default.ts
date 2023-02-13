export default {
  port: 1337,
  dbUri: "mongodb://localhost:27017/express-api",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCFDhZS+0U3kQlJs0nG0t1L2SWS
  db8/04IBgbZ9/ddGYexCXe8hU9hPwxFtWqeMXUPJ2LD77/Nvb+lBH7LrCFxndDS+
  PRm3hZE9pavmOyDaJyQcvWQznmYWb273RMex3a6FEneqZ4o5CLuS0CtQ6I+IAegS
  CclyjXcnjgM6dzWdQwIDAQAB
  -----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIICXQIBAAKBgQCFDhZS+0U3kQlJs0nG0t1L2SWSdb8/04IBgbZ9/ddGYexCXe8h
  U9hPwxFtWqeMXUPJ2LD77/Nvb+lBH7LrCFxndDS+PRm3hZE9pavmOyDaJyQcvWQz
  nmYWb273RMex3a6FEneqZ4o5CLuS0CtQ6I+IAegSCclyjXcnjgM6dzWdQwIDAQAB
  AoGAAQ7InKZEuZlckoprVrpMahLy2oQ3HgHHcc2fLsc60+NpZmmqwgARoyiw1ca3
  uETxigQ/+/C/Za5lE1B2MqohWepBXH2kZ37iMjN4Xeogz2fOyC3WGVB4GAav36X4
  m2+7ETwxNN1Rt7Ma4O+r9UvEpa6tNq0zxkIEqmk2SWT0EskCQQDCXmqG92jCMgmO
  xd4++FgbWb6segJTH+WolAzc0Ba2FdqE6rJBXv31oJOqd47NozpB9h1mTh5ZDCD0
  4+Qsd+n/AkEArz6e42QVId1xLrI/wdJB3YKijZWaqG669ReuC3co/hMIRpPSDkwk
  jyLWlcjnF4LuRCxBFj0w7bMLkmRSPjokvQJBAK6Xyw7jbJmMAuPZv1JHGDWxPsKF
  clMiwtPT8V3kGZKEPN7KR0bLQkqCbEJi1MbJCYq4vh3orAAHEg+IKaz8JhcCQQCE
  U8XIsNcgNkVz3Fc2dR0VNcKnJNOe4dY8oj/jGnySti5mlNJlx2tHxifA/O47G7vt
  MHmJYHVk1/Eh/qz3nhIFAkBiuHIStLUNG/ookBE0QnIYLh5AFUO8PjaoX3T9uBXX
  +oScmLJkLt+3BoefAYiApYRdhPHhncTKpAZJI5syYxw7
  -----END RSA PRIVATE KEY-----`,
};