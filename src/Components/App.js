import SubwayInput from "./SubwayInput.js";
import SubwayResult from "./SubwayResult.js";

import { stations, sections } from "../data/index.js";
import { minDistanceStore, minTimeStore } from "../data/subwayStore.js";

import { ID } from "../utils/constants/dom.js";

class App {
  constructor($target) {
    this.$target = $target;

    this.initState();
    this.mountDOMs();
    this.mountComponents();
  }

  initState() {
    this.stations = stations;
    this.sections = sections;
    this.minDistanceStore = minDistanceStore;
    this.minTimeStore = minTimeStore;
  }

  mountDOMs() {
    this.$inputContainer = this.$target.querySelector(`#${ID.INPUT_CONTAINER}`);
    this.$resultContainer = this.$target.querySelector(
      `#${ID.RESULT_CONTAINER}`,
    );
  }

  mountComponents() {
    new SubwayInput(this.$inputContainer, {
      stations: this.stations.map(station => station.name),
      sections: this.sections,
      minDistanceStore: this.minDistanceStore,
      minTimeStore: this.minTimeStore,
      renderTotalInfo: this.renderTotalInfo.bind(this),
    });

    this.subwayResult = new SubwayResult(this.$resultContainer);
  }

  renderTotalInfo(sections, path) {
    let totalTime = 0;
    let totalDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const _departure = path[i];
      const _arrival = path[i + 1];

      const section = sections.find(
        ({ departure, arrival }) =>
          departure === _departure && arrival === _arrival,
      );

      totalTime += section.time;
      totalDistance += section.distance;
    }

    this.subwayResult.render({ totalTime, totalDistance, path });
  }
}

export default App;
