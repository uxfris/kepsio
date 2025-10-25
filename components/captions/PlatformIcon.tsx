import { SocialIcon } from "react-social-icons";

interface PlatformIconProps {
  platform: string;
  size?: number;
}

export function PlatformIcon({ platform, size = 16 }: PlatformIconProps) {
  switch (platform) {
    case "instagram":
      return (
        <SocialIcon network="instagram" style={{ width: size, height: size }} />
      );
    case "linkedin":
      return (
        <SocialIcon network="linkedin" style={{ width: size, height: size }} />
      );
    case "x":
      return <SocialIcon network="x" style={{ width: size, height: size }} />;
    default:
      return (
        <SocialIcon network="instagram" style={{ width: size, height: size }} />
      );
  }
}
