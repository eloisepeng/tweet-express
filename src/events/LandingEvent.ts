import { GamePlayMode, IEvent, IChoice, StatChanges } from "./core";

export default class PickFacultyEvent implements IEvent {

    prompt(): string {
        return "This is going to be the best 4 years of my life!";
    }

    imgPath(): string {
        return "";
    }

    choices(): IChoice[] {
        return [
            new Start()
        ];
    }

    hasBottomBoxBorder(): boolean {
        return true;
    }

    gamePlayMode(): GamePlayMode {
      return GamePlayMode.AcceptanceLetter;
    }
}

class Start implements IChoice {
    answer(): string {
        return "Accept Offer";
    }

    followUps(): IEvent[] {
        return [];
    }

    statChanges(): StatChanges {
        return new StatChanges(0, 0, 0);
    }
}