import {IEvent, IChoice, StatChanges} from "./core";

export default class BoomerGregorEvent implements IEvent {
    prompt(): string {
        return "Gregor tells the class to start studying for 110 early!";
    }

    imgPath(): string {
        return "";
    }

    choices(): IChoice[] {
        return [
            new TrustNaturalRecursion(),
            new OkBoomer()
        ];
    }
}

class TrustNaturalRecursion implements IChoice {
    answer(): string {
        return "Trust the natural recursion";
    }

    followUps(): IEvent[] {
        return [];
    }

    statChanges(): StatChanges {
        return new StatChanges(10, 0.5, -15);
    }
}

class OkBoomer implements IChoice {
    answer(): string {
        return "Ok boomer";
    }

    followUps(): IEvent[] {
        return [];
    }

    statChanges(): StatChanges {
        return new StatChanges(60, -0.02, -8);
    }
}