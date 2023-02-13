console.log(__dirname);

interface Foo {
  message: string;
}

const learn: Foo = {
  message: "learn, boy!"
}

console.log(
  {
    valid: false,
    expired: learn.message === "jwt expired",
    decoded: null,
  }
)