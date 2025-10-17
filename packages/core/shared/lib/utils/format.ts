import type { TFunction } from 'i18next'

export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDateWithTime = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getFullYear().toString().slice(2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

export const formatDateLabel = (dateString: string, t: TFunction): string => {
  const date = new Date(dateString)
  const year = date.getFullYear().toString().slice(2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}${t('common.date_format.year', '.')} ${month}${t('common.date_format.month', '.')} ${day}${t('common.date_format.day', '.')}`
}

export const formatDateLabelWithTime = (
  dateString: string,
  t: TFunction,
): string => {
  const date = new Date(dateString)
  return `${formatDateLabel(dateString, t)} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}
