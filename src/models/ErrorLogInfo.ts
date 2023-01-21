import type { EErrorType } from '@/enums/EErrorType'

export type ErrorLogInfo = {
    type: EErrorType;
    message: string;
    name?: string;
    detail?: string;
    file?: string
}

export type ErrorLogInfoWithAdditionalData = ErrorLogInfo & {
    date: string
    url: string;
}
