export interface IAlertConfig{
  type: AlertType
  message: string
  visible: boolean
}
export type AlertType = 'error' | 'warn'
