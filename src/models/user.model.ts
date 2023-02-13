import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// He used UserDocument in tutorial.
export interface UserType extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

// Mongoose used to define this before mongoose 6. For backwards compatibility we will now just redefine it ourselves.
// export interface HookNextFunction {
//   // eslint-disable-next-line @typescript-eslint/no-explicit any
//   (error?: Error): any
// }

const userSchema = new mongoose.Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserType;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> { // add this: UserType, to parameters
  const user = this as UserType;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

const UserModel = mongoose.model<UserType>("User", userSchema);
export default UserModel;