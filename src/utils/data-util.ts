export class DataUtil {

    /**
     * Adiciona a quantidade de dias passada em dias para a data
     * 
     * @param date 
     * @param days 
     */
    addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }
}