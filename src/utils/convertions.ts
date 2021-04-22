import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function convertDurationToTimeString(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const finalResult = [ hours, minutes, seconds ]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')

  return finalResult;
}


export function convertDateToISOString(date: string) : string {
  const dateISO = format(parseISO(date), 'd MMM yy', {
    locale: ptBR,
  })

  return dateISO
}