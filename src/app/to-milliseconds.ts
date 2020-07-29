import { ToMillisecondsParams } from './to-milliseconds-params';

export function toMilliseconds({ hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }: ToMillisecondsParams): number {
    return (((hours * 60 + minutes) * 60 + seconds) * 1000) + milliseconds;
}
