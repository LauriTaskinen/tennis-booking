export default interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified?: boolean;
}
