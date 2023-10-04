export interface ParamsModalConfirm {
  title: string | null;
  content: any | null;
  onAction: (() => void) | null;
  url?: string | null;
  buttonText: string | null;
}
