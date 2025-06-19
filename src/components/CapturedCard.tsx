import type { Piece } from "../chessRules";
import Dropfinder from "./Dropfinder";
import Ezmail from "./Ezmail";
import Cryptokraker from "./CryptoKraker";
import Profile from "./Profile";

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
    default:
      return null;
  }
}
