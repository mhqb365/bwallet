import TronWeb from "tronweb";
import TRON_NODE from "./tronnode.config";

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider(TRON_NODE);
const solidityNode = new HttpProvider(TRON_NODE);
const eventServer = new HttpProvider(TRON_NODE);
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

export default tronWeb;
