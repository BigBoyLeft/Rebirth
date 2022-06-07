import UtilEvents from "@shared/enums/utils"

let timeout: any;

export default class Spinner {
  static async create(
    duration: number,
    tect: string,
    type: number
  ) {
    BusyspinnerOff();

    if (!type) {
      type = 0;
    }

    BeginTextCommandBusyspinnerOn("STRING");
    AddTextComponentSubstringPlayerName(tect);
    EndTextCommandBusyspinnerOn(type);

    return {
        stop: () => {
            BusyspinnerOff();
        }
    };
  }
}

onNet(UtilEvents.SPINNER, Spinner.create);
onNet(UtilEvents.CLEAR_SPINNER, BusyspinnerOff);