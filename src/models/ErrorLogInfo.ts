import { EErrorType } from '@/enums/EErrorType'

type ErrorLogInfo = {
    type: EErrorType;
    name?: string;
    message: string;
    detail: string;
    url: string;
    time?: string;
    file?: string
}

export default ErrorLogInfo
