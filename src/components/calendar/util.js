// @ts-ignore
import moment from "moment/min/moment-with-locales";

export function getMonth(month = moment().month()) {
    const year = moment().year();
    const firstDayOfMonth = moment(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfMonth;
    const daysMatrix = new Array(6).fill([]).map((array, idx) => {
        let header = currentMonthCount;
        if (idx === 0) {
            return new Array(7).fill(null).map(() => {
                header++;
                return moment(new Date(year, month, header));
            });
        } else {
            return new Array(7).fill(null).map(() => {
                currentMonthCount++;
                return moment(new Date(year, month, currentMonthCount));
            });
        }
    });
    return daysMatrix;
}

export function getWeek(week = moment().week()) {
    let n = 0;
    let firstDayOfWeek = moment().week(week).subtract(moment().week(week).day() + 1, 'days');
    const hoursMatrix = new Array(49).fill([]).map((array, idx) => {
        return new Array(7).fill(null).map((arr, i) => {
            if (idx === 0) {
                let day = firstDayOfWeek.add(1, 'd');
                return day.format("DD/MM/YYYY");
            } else {
                let hora = n;
                hora = hora.toString();
                if (hora.length < 2) {
                    hora = "0" + hora;
                }
                if (i === 6 && idx % 2 === 0) {
                    n++;
                }
                if (idx % 2 === 1) {
                    return hora + ":00";
                } else {
                    return hora + ":30";
                }
            }
        })
    });

    return hoursMatrix;
}