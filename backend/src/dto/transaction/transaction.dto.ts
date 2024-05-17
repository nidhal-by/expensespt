export class TransactionDto {
  readonly amount: number;
  readonly date: string;
  readonly category: string;
  readonly description: string;
  readonly type: string;
  readonly tags: Array<string>;
}
