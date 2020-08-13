//some code to decide which db to use

import RestServerApi from "./RestServerApi";
import LocalJsonServerApi from "./LocalJsonServerApi";
// import RestServerApi from "./RestServerApi";

const instance = new LocalJsonServerApi();

export default instance;