import dayjs from 'dayjs'

export const enum EDateFormat {
    DATE_ONLY = 'YYYY-MM-DD',
    DATE_WITH_TIME = 'YYYY-MM-DD HH:mm:ss',
}

export const formatToDateTime = (
    date?: Date,
    format: EDateFormat = EDateFormat.DATE_WITH_TIME,
) => {
    return dayjs(date).format(format)
}

export const dateUtil = dayjs
