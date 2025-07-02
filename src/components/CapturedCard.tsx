import type { Piece } from "../chessRules";
import Dropfinder from "./Dropfinder";
import Ezmail from "./Ezmail";
import Cryptokraker from "./Cryptokraker";
import Profile from "./Profile";
import Linkedin from "./Linkedin";
import Github from "./Github";
import Chess from "./Chess";

export function CapturedCard({ piece }: { piece: Piece }) {
  switch (piece.type) {
    case "ezmail":
      return <Ezmail />;
    case "dropfinder":
      return <Dropfinder />;
    case "profile":
      return <Profile />;
    case "cryptoKraker":
      return <Cryptokraker />;
    case "linkedin":
      return <Linkedin />;
    case "github":
      return <Github />;
    case "chess":
      return <Chess />;
    default:
      return null;
  }
}
