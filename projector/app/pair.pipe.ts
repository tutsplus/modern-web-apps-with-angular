import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pair'
})
export class PairPipe implements PipeTransform {
    transform(value: any[]): any[] {
        if (!value) return null;

        let arr = [];
        let i = 0;

        while(value[i]) {
            let item = [];

            item.push(value[i++]);
            if (value[i])
                item.push(value[i++]);

            arr.push(item);
        }
        return arr;
    }
}
