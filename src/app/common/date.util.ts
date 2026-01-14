export class DateUtils {
  /** Ritorna la data di oggi in formato YYYY-MM-DD (compatibile con input type="date") */
  static today(): string {
    const today = new Date();
    return this.toDateInputValue(today);
  }

  /** Converte una Date in YYYY-MM-DD */
  static toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
