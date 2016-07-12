// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/e843172c97072bed859b2f3027c158f5b8846bd7/stats/stats.d.ts
declare class Stats {
    REVISION: number;
    dom: HTMLDivElement;

    /**
     * @param value 0:fps, 1: ms, 2: mb, 3+: custom
     */
    showPanel(value: number): void;
    begin(): void;
    end(): number;
    update(): void;
}

declare module "stats.js" {
    export = Stats;
}