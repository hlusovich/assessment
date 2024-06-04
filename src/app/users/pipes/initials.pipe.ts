import {Pipe, PipeTransform} from "@angular/core";


@Pipe({name: 'initials', pure: true, standalone: true})
export class InitialsPipe implements PipeTransform {
    public transform(name: string): string {
        const names = name.split(' ');
        return names[0][0] + (names[1]?.[0] ?? '');
    }
}