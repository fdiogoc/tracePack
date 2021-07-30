import AuthRepository from "./AuthRepository";
import PositionRepository from "./PositionRepository";
import PolygonRepository from "./PolygonRepository";

const repositories = {
  position: PositionRepository,
  polygon: PolygonRepository,
  auth: AuthRepository,
};
export default {
  get: (name) => repositories[name],
};