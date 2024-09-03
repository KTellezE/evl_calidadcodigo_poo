export class Book {
  constructor(
    public id: number,
    public title: string | undefined,
    public author: string | undefined,
    public year: string | undefined,
    public editorial: string | undefined
    ) {}
}
