export class CreateDocumentDto {
  name!: string;
  type!: string;
  category!: string;
  size!: string;
  agent?: string;
}