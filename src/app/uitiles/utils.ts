import { Observable } from "rxjs";

export function toBase64(file: File){
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  })
}

export function parseWebAPIErrors(response: any): string[] {
  const result: string[] = [];
  if (response.error){
      if (typeof response.error === 'string'){
          result.push(response.error);
          alert(response)
      } else{
          const mapErrors = response.error.errors;
          const entries = Object.entries(mapErrors);
          entries.forEach((arr: any[]) => {
              const field = arr[0];
              arr[1].forEach((errorMessage: any) => {
                  result.push(`${field}: ${errorMessage}`);
              })
          })
      }
  }

  return result;
}

export function formatDateFormData(date: Date){
  date = new Date(date);
  const format = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
  });

  const [
      {value: month},,
      {value: day},,
      {value: year}
  ] = format.formatToParts(date);

  // yyyy-MM-dd
  return `${year}-${month}-${day}`;
}

export function fillArrayWithinRange(start: number, end: number): Observable<number[]> {
  const numbers: number[] = [];

  return Observable.create((observer: { next: (arg0: number[]) => void; complete: () => void; })  => {
    for (let i = start; i <= end; i++) {
      numbers.push(i);
      observer.next(numbers);
    }

    observer.complete();
  });
}
