export interface Page<T> {
  content: T[];
  number: number;          // pagina corrente (0-based)
  size: number;            // size della pagina
  totalElements: number;   // totale record
  totalPages: number;
  first: boolean;
  last: boolean;
}
