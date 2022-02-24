import { TSecureUser } from "../../services/user/user.types";

export const isOwnProfile = ({
  userContext,
  authenticatedUser,
}: {
  userContext: TSecureUser | null;
  authenticatedUser: TSecureUser | null;
}): boolean => {
  if (
    userContext &&
    authenticatedUser &&
    userContext._id === authenticatedUser._id
  )
    return true;
  return false;
};
